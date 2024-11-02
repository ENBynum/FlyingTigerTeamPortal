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

	submit(): JSONResponse {
		const response: JSONResponse = new JSONResponse()
		// server.post('', this.doc())
		// 	.then(res => {
		// 		const return_data: LoginAPIResponseData = res.data
		// 		const data: JSONResponseData = { data: return_data, status: res.status, error: undefined }
		// 		response.set(data)
		// 	})
		// 	// eslint-disable-next-line
		// 	.catch((error: any) => {
		// 		const data: JSONResponseData = {
		// 			data: undefined,
		// 			status: error.status,
		// 			error: error.response.data.message
		// 		}
		// 		response.set(data)
		// 	})
		response.set({ data: undefined, status: 300, error: this.email })

		return response
	}

	doc(): LoginRequestData {
		return {
			email: this.email,
			password: this.password
		}
	}
}