import { configureStore } from '@reduxjs/toolkit'

import { RegisterReducer } from '../routes/register/utils/register-slice'
import { UserDashboardReducer } from '../routes/soldier.dashbaord/utils/soldier.dashboard.slice'
import { AuthReducer } from './slices/auth'
import { RSTReducer } from './slices/rst'



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