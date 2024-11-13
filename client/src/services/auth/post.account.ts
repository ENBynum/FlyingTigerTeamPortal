import { RegisterForm } from '../../routes/register/utils/register-form.ts'
import server from '../axiosConfig.ts'



interface Response {
	message: string
}


interface ErrorResponse {
	error: string
}


/**
 * Request account creation with RegisterForm data
 * @param {RegisterForm} data {@link RegisterForm}
 * @resolve {@link Response}
 * @reject {@link ErrorResponse}
 */
export async function PostAccount(data: RegisterForm): Promise<Response | ErrorResponse> {
	try {
		await server.post(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_REGISTER_ROUTE,
			data
		)
		return { message: 'Account Successfully Created' }
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Create Account' }
	}
}