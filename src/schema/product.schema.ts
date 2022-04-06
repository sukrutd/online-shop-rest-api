import { object, string, number, TypeOf } from 'zod';

const payload = {
	body: object({
		title: string({ required_error: 'Title is required.' }),
		description: string({ required_error: 'Description is required.' })
			.min(50, 'Description must be at least 50 characters long.')
			.max(500, 'Description cannot exceed 500 characters.'),
		price: number({ required_error: 'Price is required.' }),
		image: string({ required_error: 'Image is required.' })
	})
};

const params = {
	params: object({
		productId: string({ required_error: 'ProductId is required.' })
	})
};

export const createProductSchema = object({ ...payload });
export const updateProductSchema = object({ ...payload, ...params });
export const deleteProductSchema = object({ ...params });
export const getProductSchema = object({ ...params });

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
