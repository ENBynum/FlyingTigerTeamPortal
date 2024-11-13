export interface Name {
	full: string
	last: string
	first: string
	middle?: string
}


export default interface Profile {
	Id: string
	dodid: string
	rank: string
	name: Name
	email: string
	phone: string
	unit_level: 'Company' | 'Platoon' | 'Squad' | 'Soldier'
	unit: string
	subunit: string
}