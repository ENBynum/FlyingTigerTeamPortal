import server from '../../axios/axiosConfig.ts'
import JSONResponse from './response.ts'



export interface LoginRequestData {
	email: string
	password: string
}


export interface LoginAPIResponseData {
	dodid: string
	role: 'User' | 'Acting Squad Leader' | 'Squad Leader' | 'Section Sergeant' | 'Platoon Sergeant' | 'Admin'
	platoon: string
	squad: string
}


export default class LoginRequest {
	email: string
	password: string

	constructor({ email, password }: LoginRequestData) {
		this.email = email
		this.password = password
	}

	async submit(): Promise<JSONResponse> {
		try {
			const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_SIGN_IN_ROUTE, this.doc())
			return new JSONResponse({ data: res.data, status: res.status, error: undefined })
			// eslint-disable-next-line
		} catch (error: any) {
			return new JSONResponse({
				data: undefined,
				status: error.status,
				error: error.response.data.message || 'Failed to Authenticate'
			})
		}
	}

	doc(): LoginRequestData {
		return {
			email: this.email,
			password: this.password
		}
	}
}