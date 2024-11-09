import { DateTime } from 'luxon'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Drill } from '../../../utils/types/units'
import { FetchTrainingReturnData } from './types'



export interface UserDashboardState {
    next_drill?: Drill
    next_drill_dates?: string
    all_drills?: Drill[]
    all_drill_dates?: string[]
    pending_rst_requests: any[]
    pending_rst_request_count: number
    completed_rst_requests: any[]
    completed_rst_request_count: number
    past_rst_requests: any[]
    past_rst_request_count: number
}

const initialState: UserDashboardState = {
    next_drill: undefined,
    next_drill_dates: undefined,
    pending_rst_requests: [],
    pending_rst_request_count: 0,
    completed_rst_requests: [],
    completed_rst_request_count: 0,
    past_rst_requests: [],
    past_rst_request_count: 0,
}

function GetDrillDate(data: Drill) {
    const start = DateTime.fromFormat(data.start_date, 'D')
    const end = DateTime.fromFormat(data.end_date, 'D')
    if (start.month === end.month) {
        return `${start.day} - ${end.day} ${start.monthLong} ${end.year}`
    } else {
        return `${start.day} ${start.monthShort} - ${end.day} ${end.monthShort} ${end.year}`
    }
}

const UserDashboardSlice = createSlice({
    name: 'user-dashboard',
    initialState,
    reducers: {
        setDrills: function (state, action: PayloadAction<FetchTrainingReturnData | undefined>) {
            state.next_drill = action.payload?.next
            state.all_drills = action.payload?.all
            if (action.payload) {
                state.next_drill_dates = GetDrillDate(action.payload.next)

                const all_dates: string[] = []
                action.payload.all.map(function (value: Drill) {
                    all_dates.push(GetDrillDate(value))
                })
                state.all_drill_dates = all_dates
            }
        },
        setPendingRSTRequests: function (state, action: PayloadAction<any[]>) {
            state.pending_rst_requests = action.payload
            state.pending_rst_request_count = action.payload.length
        },
        setCompletedRSTRequests: function (state, action: PayloadAction<any[]>) {
            state.completed_rst_requests = action.payload
            state.completed_rst_request_count = action.payload.length
        },
        setPastRSTRequests: function (state, action: PayloadAction<any[]>) {
            state.past_rst_requests = action.payload
            state.past_rst_request_count = action.payload.length
        },
    }
})

export const { setDrills, setPendingRSTRequests, setCompletedRSTRequests, setPastRSTRequests } = UserDashboardSlice.actions
export const UserDashboardReducer = UserDashboardSlice.reducer