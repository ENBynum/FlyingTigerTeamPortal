import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import DrillDateString from '../../../helpers/drill_date_string'
import { RSTRequest } from '../../../types/rst'
import { Drill } from '../../../types/unit'



interface DashboardState {
    nextTraining?: Drill
    nextTrainingDates: string
    allTraining?: Drill[]
    allTrainingDates?: string[]
    viewAllDrills: boolean
    pendingRST: RSTRequest[]
    pendingRSTCount?: number
    viewAllPendingRST: boolean
}

const initialState: DashboardState = {
    nextTrainingDates: '',
    viewAllDrills: false,
    pendingRST: [],
    pendingRSTCount: 0,
    viewAllPendingRST: false
}

const SoldierDashboardSlice = createSlice({
    name: 'soldier.dashboard',
    initialState,
    reducers: {
        setTraining: function (state, action: PayloadAction<Drill[]>): void {
            const training = action.payload.sort(function (a: Drill, b: Drill): number {
                return Number(a.start_date) - Number(b.start_date)
            })
            console.log(training)
            state.nextTraining = training[0]
            state.nextTrainingDates = DrillDateString(training[0])
            console.log(DrillDateString(training[0]))
            if (training.length > 1) {
                state.allTraining = training.slice(1)
                state.allTrainingDates = training.slice(1).reduce<string[]>(function (accum, curr) {
                    accum.push(DrillDateString(curr))
                    return accum
                }, [])
            }
        },
        toggleViewAllDrills: function (state): void {
            state.viewAllDrills = !state.viewAllDrills
        },
        setPendingRST: function (state, action: PayloadAction<RSTRequest[]>): void {
            state.pendingRST = action.payload.sort(function (a: RSTRequest, b: RSTRequest): number {
                return Number(a.absence_dates[0]) - Number(b.absence_dates[1])
            })
            state.pendingRSTCount = action.payload.length
        },
        toggleViewAllPending: function (state): void {
            state.viewAllPendingRST = !state.viewAllPendingRST
        }
    }
})

export const { setTraining, toggleViewAllDrills, setPendingRST, toggleViewAllPending } = SoldierDashboardSlice.actions
export const SoldierDashboardReducer = SoldierDashboardSlice.reducer