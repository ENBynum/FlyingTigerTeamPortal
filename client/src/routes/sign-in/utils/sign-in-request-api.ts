import server from '../../../utils/axios/axiosConfig'



export interface SignInRequestData {
	email: string
	password: string
}


export interface AuthReturn {
	dodid: string
	unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}


export default class SignInRequest {
	email: string
	password: string
	response?: { data?: AuthReturn, status: number, error?: string }

	constructor({ email, password }: SignInRequestData) {
		this.email = email
		this.password = password
	}

	async submit(): Promise<void> {
		try {
			const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_SIGN_IN_ROUTE, this.doc())
			this.response = { data: res.data, status: res.status }
			// eslint-disable-next-line
		} catch (error: any) {
			console.log(error)
			this.response = { status: error.status, error: error.response.data.detail || 'Failed to Sign In' }
		}
	}

	doc(): SignInRequestData {
		return {
			email: this.email,
			password: this.password
		}
	}
}