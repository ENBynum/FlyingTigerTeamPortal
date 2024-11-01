import { createSlice } from '@reduxjs/toolkit'
import User from '../../utils/constructs/models/user.ts'



export interface AuthState {
	user: User
}


const initialState: AuthState = {
	user: new User()
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {}
})

// export const {} = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer
