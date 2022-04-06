import config from 'config';
import jwt from 'jsonwebtoken';

const secretKey = config.get<string>('secretKey');

export function signJwt(object: Object, options: jwt.SignOptions | undefined) {
	return jwt.sign(object, secretKey, { ...(options && options), algorithm: 'HS512' });
}

export function verifyJwt(token: string) {
	try {
		const decoded = jwt.verify(token, secretKey);
		return {
			valid: true,
			expired: false,
			decoded
		};
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === 'jwt expired',
			decoded: null
		};
	}
}
