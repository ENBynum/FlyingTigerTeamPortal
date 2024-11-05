import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { SignInAPIResponseData } from '../../routes/sign-in/utils/sign-in-request-api.ts'



export interface AuthState {
	dodid?: string
	role?: string
	platoon?: string
	squad?: string
	dashboard_route?: string
}


const initialState: AuthState = {
	dodid: undefined,
	role: undefined,
	platoon: undefined,
	squad: undefined,
	dashboard_route: undefined
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		/**
		 * Logs in a user with the given login response data.
		 * The user is logged in and the auth state is updated to
		 * reflect the new user.
		 * @param action - The login response data.
		 */
		login: function (state, action: PayloadAction<SignInAPIResponseData>): void {
			state.dodid = action.payload.dodid
			state.role = action.payload.role
			state.platoon = action.payload.platoon
			state.squad = action.payload.squad
			if (action.payload.role === 'User') {
				state.dashboard_route = `/dashboard/user/${action.payload.dodid}`
			} else {
				state.dashboard_route = '/sign-in'
			}
		},
		/**
		 * Logs out the user and resets the auth state back to its
		 * initial state.
		 */
		logout: function (state): void {
			state.dodid = undefined
			state.role = undefined
			state.platoon = undefined
			state.squad = undefined
		}
	}
})

export const { login, logout } = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
