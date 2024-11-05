import { createSlice, PayloadAction } from '@reduxjs/toolkit'



export interface UserDashboardState {
    pending_rst_requests: any[]
    pending_rst_request_count: number
}

const initialState: UserDashboardState = {
    pending_rst_requests: [],
    pending_rst_request_count: 0
}

const UserDashboardSlice = createSlice({
    name: 'user-dashboard',
    initialState,
    reducers: {
        setPendingRSTRequests: function (state, action: PayloadAction<any[]>) {
            state.pending_rst_requests = action.payload
            state.pending_rst_request_count = action.payload.length
        }
    }
})

export const { setPendingRSTRequests } = UserDashboardSlice.actions
export const UserDashboardReducer = UserDashboardSlice.reducer