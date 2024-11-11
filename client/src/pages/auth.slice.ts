import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { routes } from './routes'



interface AuthState {
    dodid?: string
    unit_level?: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
    dashboard_route?: string
}

interface AuthReturn {
    dodid: string
    unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}

const initialState: AuthState = {}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: function (state, action: PayloadAction<AuthReturn>): void {
            state.dodid = action.payload.dodid
            state.unit_level = action.payload.unit_level
            if (action.payload.unit_level === 'Soldier') {
                state.dashboard_route = routes.soldierDashboard.replace(':dodid', action.payload.dodid)
            } else {
                state.dashboard_route = routes.signIn
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