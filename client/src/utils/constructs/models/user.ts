import server from '../../axios/axiosConfig.ts'
import { RankType } from '../../types/profile.ts'
import { LoginAPIResponseData } from '../api/login-request.ts'



interface Name {
	full: string
	last: string
	first: string
	middle?: string
}


interface Profile {
	dodid: string
	rank: RankType
	name: Name
	email: string
	phone: string
}


export default class User {
	dodid?: string
	role?: 'User' | 'Acting Squad Leader' | 'Squad Leader' | 'Section Sergeant' | 'Platoon Sergeant' | 'Admin'
	platoon?: string
	squad?: string

	constructor() {
		this.dodid = undefined
		this.role = undefined
		this.platoon = undefined
		this.role = undefined
	}

	login({ dodid, role, platoon, squad }: LoginAPIResponseData): string {
		this.dodid = dodid
		this.role = role
		this.platoon = platoon
		this.squad = squad

		if (role === 'User') {
			return `/user/dashboard/${dodid}`
		} else {
			return '/'
		}
	}

	signature() {
		let profile: Profile | undefined = undefined
		let user_signature: string = ''
		server.get('')
			.then(res => profile = res.data)
			// eslint-disable-next-line
			.catch((error: any) => console.log(error.message))

		if (!profile) {
			return
		} else {
			profile = profile as Profile
			user_signature = profile.name.middle ?
				`${profile.rank}.${profile.name.first}.${profile.name.middle}.${profile.name.last}.${this.dodid}.${new Date().toISOString()}`.toUpperCase() :
				`${profile.rank}.${profile.name.first}.${profile.name.last}.${this.dodid}.${new Date().toISOString()}`.toUpperCase()
		}

		return user_signature
	}

	logout() {
		this.dodid = undefined
		this.role = undefined
		this.platoon = undefined
		this.role = undefined
	}
}