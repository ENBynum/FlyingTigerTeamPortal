import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './slices/auth'
import { RegisterReducer } from './slices/register'
import { RSTReducer } from './slices/rst'



export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		register: RegisterReducer,
		rst: RSTReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch