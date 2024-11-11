import server from '../../../../utils/axios/axiosConfig'
import { TrainingEvent } from '../../../user-routes/user-dashboard/utils/types'
import { UnitTrainingDatesAPIReturnData } from '../types'



export interface FetchTrainingDatesReturn {
    data?: { next: TrainingEvent, all: TrainingEvent[] }
    status: number
    error?: string
}

export async function FetchTrainingDates(): Promise<FetchTrainingDatesReturn> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_UNIT_TRAINING_DATES)
        const { training }: UnitTrainingDatesAPIReturnData = res.data
        const sorted_training: TrainingEvent[] = training.sort(function (a: TrainingEvent, b: TrainingEvent): number {
            return Number(a.Id.split('.')[1]) - Number(b.Id.split('.')[1])
        })
        return { data: { next: sorted_training[0], all: sorted_training }, status: res.status, error: undefined }
        // eslint-disable-next-line
    } catch (error: any) {
        console.log(error)
        return { status: error.status, error: 'Failed to Populate Training Dates' }
    }
}