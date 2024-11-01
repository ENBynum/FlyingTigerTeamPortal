import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './slices/auth.ts'
import { RegisterReducer } from './slices/register.ts'



export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		register: RegisterReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch