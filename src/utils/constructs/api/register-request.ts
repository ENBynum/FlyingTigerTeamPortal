import { RegisterForm } from '../../../routes/register/types.ts'
import server from '../../axios/axiosConfig.ts'
import JSONResponse, { JSONResponseData } from './response.ts'



interface Name {
	full?: string
	last?: string
	first?: string
	middle?: string
}


// export interface RegisterAPIResponseData {
//
// }


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
	
	submit(): JSONResponse {
		const response: JSONResponse = new JSONResponse()
		server.post('', this.doc())
			.then(res => {
				// const return_data: RegisterRequestData = res.data
				const data: JSONResponseData = { data: undefined, status: res.status, error: undefined }
				response.set(data)
			})
			// eslint-disable-next-line
			.catch((error: any) => {
				const data: JSONResponseData = {
					data: undefined,
					status: error.status,
					error: error.response.data.message
				}
				response.set(data)
			})
		
		return response
	}
	
	doc() {
		return {
			dodid: this.dodid,
			rank: this.rank,
			name: this.name,
			platoon: this.platoon,
			squad: this.squad,
			email: this.email,
			password: this.password
		}
	}
}