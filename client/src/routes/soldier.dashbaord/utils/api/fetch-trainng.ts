import server from '../../../../utils/axios/axiosConfig'
import JSONResponse from '../../../../utils/constructs/api/response'
import { TrainingEvent } from '../../../user-routes/user-dashboard/utils/types'
import { UnitTrainingDatesAPIReturnData } from '../types'



export default async function FetchTrainingDates(): Promise<JSONResponse> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_UNIT_TRAINING_DATES)
        const { training }: UnitTrainingDatesAPIReturnData = res.data
        const sorted_training: TrainingEvent[] = training.sort(function (a: TrainingEvent, b: TrainingEvent): number {
            return Number(a.Id.split('.')[1]) - Number(b.Id.split('.')[1])
        })
        return new JSONResponse({ data: { next: sorted_training[0], all: sorted_training }, status: res.status, error: undefined })
        // eslint-disable-next-line
    } catch (error: any) {
        return new JSONResponse({ data: undefined, status: error.status, error: error.response.data.message || 'Failed to Populate Training Dates' })
    }
}