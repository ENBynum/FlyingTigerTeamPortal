import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SignInAPIResponseData } from '../../routes/sign-in/utils/sign-in-request-api.ts'



export interface AuthState {
	dodid?: string
	unit_level?: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
	dashboard_route?: string
}


const initialState: AuthState = {
	dodid: undefined,
	unit_level: undefined,
	dashboard_route: undefined
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: function (state, action: PayloadAction<SignInAPIResponseData>): void {
			state.dodid = action.payload.dodid
			state.unit_level = action.payload.unit_level
			if (action.payload.unit_level === 'Soldier') {
				state.dashboard_route = `/dashboard/user/${action.payload.dodid}`
			} else {
				state.dashboard_route = '/sign-in'
			}
		},
		logout: function (state): void {
			state.dodid = undefined
			state.unit_level = undefined
			state.dashboard_route = undefined
		}
	}
})

export const { login, logout } = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
