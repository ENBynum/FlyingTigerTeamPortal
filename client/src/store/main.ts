import { configureStore } from '@reduxjs/toolkit'

import { AuthReducer } from './slices/auth'
import { RegisterReducer } from './slices/register'
import { RSTReducer } from './slices/rst'
import { UserDashboardReducer } from './slices/user-dashboard'



export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		register: RegisterReducer,
		user_dashboard: UserDashboardReducer,
		rst: RSTReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch