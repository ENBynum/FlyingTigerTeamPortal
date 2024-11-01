export interface RegisterForm {
	dodid: string | number
	dodid_confirm?: string | number
	rank: string
	name?: {
		last?: string
		first?: string
		middle?: string
	}
	last?: string
	first?: string
	middle?: string
	no_middle?: boolean
	email: string
	phone: string | number
	platoon: string
	squad: string
	password: string
	password_confirm?: string
}
