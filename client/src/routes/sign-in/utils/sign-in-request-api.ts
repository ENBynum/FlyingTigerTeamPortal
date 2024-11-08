import server from '../../../utils/axios/axiosConfig'
import JSONResponse from '../../../utils/constructs/api/response'



export interface SignInRequestData {
	email: string
	password: string
}


export interface SignInAPIResponseData {
	dodid: string
	unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}


export default class SignInRequest {
	email: string
	password: string

	constructor({ email, password }: SignInRequestData) {
		this.email = email
		this.password = password
	}

	async submit(): Promise<JSONResponse> {
		try {
			const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_SIGN_IN_ROUTE, this.doc())
			return new JSONResponse({ data: res.data, status: res.status, error: undefined })
			// eslint-disable-next-line
		} catch (error: any) {
			console.log(error)
			return new JSONResponse({
				data: undefined,
				status: error.status,
				error: error || 'Failed to Authenticate'
			})
		}
	}

	doc(): SignInRequestData {
		return {
			email: this.email,
			password: this.password
		}
	}
}