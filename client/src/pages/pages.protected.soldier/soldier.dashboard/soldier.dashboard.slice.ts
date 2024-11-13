import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DateTime } from 'luxon'

import DrillDateString from '../../../helpers/drill_date_string'
import { RSTRequest } from '../../../types/rst'
import { Drill } from '../../../types/unit'



interface DashboardState {
	nextTraining?: Drill
	nextTrainingDates: string
	allTraining?: Drill[]
	allTrainingDates?: string[]
	viewAllDrills: boolean
	rstRequests: RSTRequest[]
	rstRequestCount?: number
	rstRequestDates: string[]
	viewAllRSTRequests: boolean
}


const initialState: DashboardState = {
	nextTrainingDates: '',
	viewAllDrills: false,
	rstRequests: [],
	rstRequestCount: 0,
	rstRequestDates: [],
	viewAllRSTRequests: false
}

const SoldierDashboardSlice = createSlice({
	name: 'soldier.dashboard',
	initialState,
	reducers: {
		setTraining: function (state, action: PayloadAction<Drill[]>): void {
			const training = action.payload.sort(function (a: Drill, b: Drill): number {
				return Number(a.start_date) - Number(b.start_date)
			})
			console.log(training)
			state.nextTraining = training[0]
			state.nextTrainingDates = DrillDateString(training[0])
			console.log(DrillDateString(training[0]))
			if (training.length > 1) {
				state.allTraining = training.slice(1)
				state.allTrainingDates = training.slice(1).reduce<string[]>(function (accum, curr) {
					accum.push(DrillDateString(curr))
					return accum
				}, [])
			}
		},
		toggleViewAllDrills: function (state): void {
			state.viewAllDrills = !state.viewAllDrills
		},
		setRSTRequests: function (state, action: PayloadAction<RSTRequest[]>): void {
			state.rstRequests = action.payload.sort(function (a: RSTRequest, b: RSTRequest): number {
				return Number(a.absence_dates[0]) - Number(b.absence_dates[1])
			})
			state.rstRequestCount = action.payload.length
			
			const enabled_values: number[] = []
			action.payload.map(function (value: RSTRequest): void {
				enabled_values.push(DateTime.fromISO(value.absence_dates[0]).valueOf())
				if (!enabled_values.includes(DateTime.fromISO(value.absence_dates[1]).valueOf())) {
					let days = 0
					do {
						days++
						enabled_values.push(DateTime.fromISO(value.absence_dates[0]).plus({ hours: days * 24 }).valueOf())
					} while (!enabled_values.includes(DateTime.fromISO(value.absence_dates[1]).toUTC().valueOf()))
				}
			})
			const enabled: string[] = []
			enabled_values.map(function (value) {
				enabled.push(DateTime.fromMillis(value).toFormat('yyyy-LL-dd'))
			})
			state.rstRequestDates = enabled
		},
		toggleViewAllRSTRequests: function (state): void {
			state.viewAllRSTRequests = !state.viewAllRSTRequests
		}
	}
})

export const {
	setTraining,
	toggleViewAllDrills,
	setRSTRequests,
	toggleViewAllRSTRequests
} = SoldierDashboardSlice.actions
export const SoldierDashboardReducer = SoldierDashboardSlice.reducer