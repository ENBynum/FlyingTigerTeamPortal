import { configureStore } from '@reduxjs/toolkit'

import { AuthReducer } from './auth.slice'
import {
	SoldierDashboardReducer
} from './pages.protected.soldier/soldier.dashboard/soldier.dashboard.slice'
import {
	SoldierRSTSubmitReducer
} from './pages.protected.soldier/soldier.rst.submit/soldier.rst.submit.slice'



export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        soldierDashboard: SoldierDashboardReducer,
        soldierRSTSubmit: SoldierRSTSubmitReducer
    }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch