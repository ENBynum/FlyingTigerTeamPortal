import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Platoons, Ranks } from '../../utils/variables/profile.ts'



interface RankData {
	group: string
	items: string[]
}


export interface RegisterState {
	ranks: RankData[]
	platoons: string[]
	squads: string[]
}


const initialState: RegisterState = {
	ranks: Ranks,
	platoons: Platoons,
	squads: []
}

const RegisterSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {
		setRanks: (state, action: PayloadAction<RankData[]>) => {
			state.ranks = action.payload
		},
		setPlatoons: (state, action: PayloadAction<string[]>) => {
			state.platoons = action.payload
		},
		setSquads: (state, action: PayloadAction<string[]>) => {
			state.squads = action.payload
		}
	}
})

export const { setRanks, setPlatoons, setSquads } = RegisterSlice.actions
export const RegisterReducer = RegisterSlice.reducer
