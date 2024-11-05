import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoginAPIResponseData } from '../../utils/constructs/api/login-request.ts'
import User from '../../utils/constructs/models/user.ts'



export interface AuthState {
	user?: User
}


const initialState: AuthState = {
	user: undefined
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
		login: function (state, action: PayloadAction<LoginAPIResponseData>): void {
			state.user = new User()
			state.user.login(action.payload)
		},
		/**
		 * Logs out the user and resets the auth state back to its
		 * initial state.
		 */
		logout: function (state): void {
			state.user = undefined
		}
	}
})

export const { login, logout } = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
