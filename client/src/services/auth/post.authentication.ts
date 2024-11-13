import server from '../axiosConfig.ts'



interface AuthRequest {
	email: string
	password: string
}


interface AuthData {
	dodid: string
	unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}


interface ErrorResponse {
	error: string
}


/**
 * Request authentication from server using credentials
 * @param {AuthRequest} data {@link AuthRequest}
 * @resolve {@link AuthData}
 * @reject {@link ErrorResponse}
 */
export async function PostAuthentication(data: AuthRequest): Promise<AuthData | ErrorResponse> {
	try {
		const res = await server.post(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_SIGN_IN_ROUTE,
			data
		)
		return res.data
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Sign In' }
	}
}