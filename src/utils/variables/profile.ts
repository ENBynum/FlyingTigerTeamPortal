export type EnlistedType = 'PVT' | 'PV2' | 'PFC' | 'SPC' | 'CPL' | 'SGT' | 'SSG' | 'SFC' | '1SG'
export type WarrantType = 'WO1' | 'CW2' | 'CW3' | 'CW4' | 'CW5'
export type CommissionedType = '2LT' | '1LT' | 'CPT'

export const EnlistedRanks = ['PVT', 'PV2', 'PFC', 'SPC', 'CPL', 'SGT', 'SSG', 'SFC', '1SG']
export const WarrantRanks = ['WO1', 'CW2', 'CW3', 'CW4', 'CW5']
export const CommissionedRanks = ['2LT', '1LT', 'CPT']
export const Ranks = [
	{ group: 'Enlisted', items: EnlistedRanks },
	{ group: 'Warrant', items: WarrantRanks },
	{ group: 'Commissioned', items: CommissionedRanks }
]

export const Platoons = [
	'Headquarters', 'Maintenance', 'Shops'
]

export const Squads = {
	Headquarters: ['Command', 'Admin', 'Supply'],
	Maintenance: ['1st Squad', '2nd Squad', '3rd Squad', '4th Squad'],
	Shops: ['Avionics', 'Airframe', 'Hydro', 'Powertrain']
}