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
		/**
		 * Sets the ranks to the given array of RankData objects.
		 * Each RankData object has a `group` property that is the
		 * name of the rank group (e.g. "Enlisted", "Warrant", or "Commissioned")
		 * and an `items` property that is an array of rank strings
		 * (e.g. ["PVT", "PV2", "PFC"]).
		 * @param {RankData[]} action.payload - The ranks to set.
		 */
		setRanks: (state, action: PayloadAction<RankData[]>) => {
			state.ranks = action.payload
		},
		/**
		 * Sets the platoons to the given array of platoon names.
		 * 
		 * @param {string[]} action.payload - The platoons to set.
		 */
		setPlatoons: (state, action: PayloadAction<string[]>) => {
			state.platoons = action.payload
		},
		/**
		 * Sets the squads to the given array of squad names.
		 * 
		 * @param {string[]} action.payload - The squads to set.
		 */
		setSquads: (state, action: PayloadAction<string[]>) => {
			state.squads = action.payload
		}
	}
})

export const { setRanks, setPlatoons, setSquads } = RegisterSlice.actions
export const RegisterReducer = RegisterSlice.reducer
