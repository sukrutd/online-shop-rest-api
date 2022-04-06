import { Request, Response, NextFunction } from 'express';
import { reIssueAccessToken } from 'services/session.service';
import { verifyJwt } from 'utils/jwt.utils';
import get from 'lodash/get';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
	const refreshToken = get(req, 'headers.x-refresh', '');

	if (!accessToken) return next();

	const { decoded, expired } = verifyJwt(accessToken);

	if (decoded) res.locals.user = decoded;

	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });
		if (newAccessToken) {
			res.setHeader('x-access-token', newAccessToken);
			const result = verifyJwt(newAccessToken);
			res.locals.user = result.decoded;
		}
	}

	return next();
};

export default deserializeUser;
