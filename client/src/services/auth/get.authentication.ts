import server from '../axiosConfig.ts'



interface AuthData {
	dodid: string
	unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}


interface ErrorResponse {
	error: string
}


/**
 * Request authentication from server using HTTPonly Cookies
 * @resolve {@link AuthData}
 * @reject {@link ErrorResponse}
 */
export default async function GetAuthentication(): Promise<AuthData | ErrorResponse> {
	try {
		const res = await server.get(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_AUTHENTICATE_ROUTE
		)
		return res.data
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Not Authenticated' }
	}
}