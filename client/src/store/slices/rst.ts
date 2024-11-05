import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
	AbsenceTypeType
} from '../../routes/user-routes/new-rst-request/utils/new-rst-request-types'



export interface RSTState {
	tooltip?: string[]
	absence_type?: AbsenceTypeType
	makeup_required: boolean
	earliest_makeup_date: Date | undefined
	latest_makeup_date: Date | undefined
}


const initialState: RSTState = {
	tooltip: undefined,
	absence_type: undefined,
	makeup_required: false,
	earliest_makeup_date: undefined,
	latest_makeup_date: undefined
}

const RSTSlice = createSlice({
	name: 'rst',
	initialState,
	reducers: {
		/**
		 * Sets the RST Request Type tooltips to the given array of strings.
		 * The tooltips are displayed below the RST Absence Type dropdown in the RST form.
		 * @param {string[]} action.payload - The tooltips to set.
		 */
		setToolTip: (state, action: PayloadAction<string[]>) => {
			state.tooltip = action.payload
		},
		/**
		 * Sets the RST Absence Type to the given string.
		 * Also sets the `makeup_required` field to true if the absence type is not 'Excused/Absence Authorized'.
		 * @param {AbsenceTypeType} action.payload - The absence type to set.
		 */
		setAbsenceType: (state, action: PayloadAction<AbsenceTypeType>) => {
			state.absence_type = action.payload
			state.makeup_required = action.payload !== 'Excused/Absence Authorized'
		},
		/**
		 * Sets the earliest possible makeup date to the given date.
		 * This field is displayed as the minimum date for the RST Make-Up Dates range picker.
		 * @param {Date} action.payload - The earliest possible makeup date.
		 */
		setEarliestMakeUpDate: (state, action: PayloadAction<Date>) => {
			state.earliest_makeup_date = action.payload
		},
		/**
		 * Sets the latest possible makeup date to the given date.
		 * This field is displayed as the maximum date for the RST Make-Up Dates range picker.
		 * @param {Date} action.payload - The latest possible makeup date.
		 */
		setLatestMakeUpDate: (state, action: PayloadAction<Date>) => {
			state.latest_makeup_date = action.payload
		}
	}
})

export const { setToolTip, setAbsenceType, setEarliestMakeUpDate, setLatestMakeUpDate } = RSTSlice.actions
export const RSTReducer = RSTSlice.reducer
