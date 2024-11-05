import { RegisterForm } from '../../../routes/register/utils/types'
import server from '../../axios/axiosConfig'
import JSONResponse from './response'



interface Name {
	full?: string
	last?: string
	first?: string
	middle?: string
}

export default class RegisterRequest {
	dodid: string
	rank: string
	name?: Name
	platoon: string
	squad: string
	email: string
	phone: string
	password: string
	
	constructor({ dodid, rank, name, platoon, squad, email, phone, password }: RegisterForm) {
		this.dodid = dodid
		this.rank = rank
		this.name = name
		this.platoon = platoon
		this.squad = squad
		this.email = email
		this.phone = phone
		this.password = password
	}
	
	/**
	 * Submits the registration request to the server.
	 *
	 * This method sends a POST request to the server using the registration
	 * form data. If the request is successful, it returns a `JSONResponse`
	 * object with the response status. In case of an error, it returns a
	 * `JSONResponse` object with the error status and message.
	 *
	 * @returns {Promise<JSONResponse>} A promise that resolves to a JSONResponse
	 * object containing the server's response data or error information.
	 */
	async submit(): Promise<JSONResponse> {
		try {
			const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_REGISTER_ROUTE, this.doc())
			return new JSONResponse({ data: undefined, status: res.status, error: undefined })
			// eslint-disable-next-line
		} catch (error: any) {
			return new JSONResponse({
				data: undefined,
				status: error.status,
				error: error.response.data.message || 'Failed to Create Account'
			})
		}
	}
	
	/**
	 * Converts the RegisterRequest object to a JSON object.
	 * @returns {object} An object containing the registration form data.
	 */
	doc(): object {
		return {
			dodid: this.dodid,
			rank: this.rank,
			name: this.name,
			platoon: this.platoon,
			squad: this.squad,
			email: this.email,
			phone: this.phone,
			password: this.password
		}
	}
}