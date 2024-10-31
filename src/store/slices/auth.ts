import { createSlice, PayloadAction } from '@reduxjs/toolkit'



interface AuthState {
	user: string | undefined
}

const initialState: AuthState = {
	user: undefined
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			state.user = action.payload
		},
		logout: (state) => {
			state.user = undefined
		}
	}
})

export const { login, logout } = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
