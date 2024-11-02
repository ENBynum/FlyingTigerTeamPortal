import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AbsenceTypeType } from '../../routes/__user-routes/request-rst/utils/types'



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
		setToolTip: (state, action: PayloadAction<string[]>) => {
			state.tooltip = action.payload
		},
		setAbsenceType: (state, action: PayloadAction<AbsenceTypeType>) => {
			state.absence_type = action.payload
			state.makeup_required = action.payload !== 'Excused/Absence Authorized'
		},
		setEarliestMakeUpDate: (state, action: PayloadAction<Date>) => {
			state.earliest_makeup_date = action.payload
		},
		setLatestMakeUpDate: (state, action: PayloadAction<Date>) => {
			state.latest_makeup_date = action.payload
		}
	}
})

export const { setToolTip, setAbsenceType, setEarliestMakeUpDate, setLatestMakeUpDate } = RSTSlice.actions
export const RSTReducer = RSTSlice.reducer
