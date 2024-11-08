import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CompanyUnit, PlatoonUnit, SquadUnit } from '../../../utils/types/units'
import { Ranks } from '../../../utils/variables/profile'



interface RankData {
	group: string
	items: string[]
}

interface SelectData {
	value: string
	label: string
}

export interface RegisterState {
	ranks: RankData[]
	companies: CompanyUnit[]
	company_selector_data: SelectData[]
	platoons: PlatoonUnit[]
	platoon_selector_data: SelectData[]
	squads: SquadUnit[]
	squad_selector_data: SelectData[]
}


const initialState: RegisterState = {
	ranks: Ranks,
	companies: [],
	company_selector_data: [],
	platoons: [],
	platoon_selector_data: [],
	squads: [],
	squad_selector_data: []
}

const RegisterSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setRanks: (state, action: PayloadAction<RankData[]>) => {
			state.ranks = action.payload
		},
		setCompanies: function (state, action: PayloadAction<CompanyUnit[]>): void {
			state.companies = action.payload
			const data: SelectData[] = []
			action.payload.map(function (value: CompanyUnit): void {
				data.push({ value: value.Id, label: value.name })
			})
			state.company_selector_data = data
		},
		setCompanySelectorData: function (state, action: PayloadAction<CompanyUnit[]>): void {
			const data: SelectData[] = []
			action.payload.map(function (value: CompanyUnit): void {
				data.push({ value: value.Id, label: value.name })
			})
			state.company_selector_data = data
		},
		setPlatoons: function (state, action: PayloadAction<PlatoonUnit[]>): void {
			state.platoons = action.payload
			const data: SelectData[] = []
			action.payload.map(function (value: PlatoonUnit): void {
				data.push({ value: value.Id, label: value.name })
			})
			state.platoon_selector_data = data
		},
		setPlatoonSelectorData: function (state, action: PayloadAction<PlatoonUnit[]>): void {
			const data: SelectData[] = []
			action.payload.map(function (value: PlatoonUnit): void {
				data.push({ value: value.Id, label: value.name })
			})
			state.platoon_selector_data = data
		},
		setSquads: function (state, action: PayloadAction<SquadUnit[]>): void {
			state.squads = action.payload
			const data: SelectData[] = []
			action.payload.map(function (value: SquadUnit): void {
				data.push({ value: value.Id, label: value.name })
			})
			state.squad_selector_data = data
		},
		setSquadSelectorData: function (state, action: PayloadAction<SquadUnit[]>): void {
			const data: SelectData[] = []
			action.payload.map(function (value: SquadUnit): void {
				data.push({ value: value.Id, label: value.name })
			})
			state.squad_selector_data = data
		},
	}
})

export const { setRanks, setCompanies, setCompanySelectorData, setPlatoons, setPlatoonSelectorData, setSquads, setSquadSelectorData } = RegisterSlice.actions
export const RegisterReducer = RegisterSlice.reducer
