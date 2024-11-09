import server from '../../../../utils/axios/axiosConfig'
import JSONResponse from '../../../../utils/constructs/api/response'
import { Name } from '../../../../utils/types/profile'
import { RegisterForm } from '../register-form'



export default class RegisterRequest {
    dodid: string
    rank: string
    name?: Name
    company: string
    platoon: string
    squad: string
    email: string
    phone: string
    password: string

    constructor({ dodid, rank, name, company, platoon, squad, email, phone, password }: RegisterForm) {
        this.dodid = dodid
        this.rank = rank
        this.name = name
        this.company = company
        this.platoon = platoon
        this.squad = squad
        this.email = email
        this.phone = phone
        this.password = password
    }

    async submit(): Promise<JSONResponse> {
        try {
            const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_REGISTER_ROUTE, this.doc())
            return new JSONResponse({ status: res.status })
            // eslint-disable-next-line
        } catch (error: any) {
            console.log(error)
            return new JSONResponse({ status: error.status, error: error.message || 'Failed to Create Account' })
        }
    }

    doc(): object {
        return {
            dodid: this.dodid,
            rank: this.rank,
            name: this.name,
            company: this.company,
            platoon: this.platoon,
            squad: this.squad,
            email: this.email,
            phone: this.phone,
            password: this.password
        }
    }
}