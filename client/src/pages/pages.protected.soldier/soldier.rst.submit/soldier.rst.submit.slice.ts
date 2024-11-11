import { DateTime } from 'luxon'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AbsenceTypes } from '../../../types/rst'
import { Drill } from '../../../types/unit'
import { ABSENCE_TYPE_TOOLTIPS } from '../../../variables/rst'



interface SoldierRSTSubmitState {
    drillDates?: string[]
    absenceType?: AbsenceTypes
    absenceTypeTooltips?: string[]
    makeupRequired: boolean
    earliestMakeupDate?: Date
    latestMakeupDate?: Date
}

const initialState: SoldierRSTSubmitState = {
    makeupRequired: false
}

const SoldierRSTSubmitSlice = createSlice({
    name: 'soldier.rst.submit',
    initialState,
    reducers: {
        setDrillDates: function (state, action: PayloadAction<Drill[]>): void {
            console.log(action.payload)
            const enabled_values: number[] = []
            action.payload.map(function (value: Drill): void {
                enabled_values.push(DateTime.fromISO(value.start_date).valueOf())
                if (!enabled_values.includes(DateTime.fromISO(value.end_date).valueOf())) {
                    let days = 0
                    do {
                        days++
                        enabled_values.push(DateTime.fromISO(value.start_date).plus({ hours: days * 24 }).valueOf())
                    } while (!enabled_values.includes(DateTime.fromISO(value.end_date).toUTC().valueOf()))
                }
            })

            const enabled: string[] = []
            enabled_values.map(function (value) {
                enabled.push(DateTime.fromMillis(value).toFormat('yyyy-LL-dd'))
            })
            console.log(enabled)
            state.drillDates = enabled
        },
        setAbsenceType: function (state, action: PayloadAction<AbsenceTypes>): void {
            state.absenceType = action.payload
            ABSENCE_TYPE_TOOLTIPS.map(function (value) {
                if (value.type === action.payload) {
                    state.absenceTypeTooltips = value.tooltips
                }
            })
            state.makeupRequired = action.payload !== 'Excused/Absence Authorized'
        },
        setEarliestMakeupDate: function (state, action: PayloadAction<Date>): void {
            state.earliestMakeupDate = action.payload
        },
        setLatestMakeupDate: function (state, action: PayloadAction<Date>): void {
            state.latestMakeupDate = action.payload
        }
    }
})

export const { setDrillDates, setAbsenceType, setEarliestMakeupDate, setLatestMakeupDate } = SoldierRSTSubmitSlice.actions
export const SoldierRSTSubmitReducer = SoldierRSTSubmitSlice.reducer