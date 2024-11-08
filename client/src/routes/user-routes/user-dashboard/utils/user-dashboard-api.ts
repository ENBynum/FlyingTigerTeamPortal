import server from '../../../../utils/axios/axiosConfig'
import JSONResponse from '../../../../utils/constructs/api/response'
import { TrainingEvent, UnitTrainingAPIResponseData } from './types'



export interface TrainingEventsAPIReturnData {
    next_training: TrainingEvent
    all_training: TrainingEvent[]
}

export default class UserDashboardAPI {
    constructor() { }

    async training_events(): Promise<JSONResponse> {
        try {
            const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_UNIT_TRAINING_DATES)
            const { training }: UnitTrainingAPIResponseData = res.data
            const sorted_training: TrainingEvent[] = training.sort(function (a: TrainingEvent, b: TrainingEvent): number {
                return Number(a.Id.split('.')[1]) - Number(b.Id.split('.')[1])
            })
            return new JSONResponse({ data: { next_training: sorted_training[0], all_training: sorted_training }, status: res.status, error: undefined })
            // eslint-disable-next-line
        } catch (error: any) {
            return new JSONResponse({ data: undefined, status: error.status, error: error.response.data.message || 'Failed to Populate Training Dates' })
        }
    }

    async pending_user_rst_requests(): Promise<JSONResponse> {
        try {
            const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_USER_PENDING_RST_REQUEST_ROUTE)
            return new JSONResponse({ data: res.data.requests, status: res.status, error: undefined })
            // eslint-disable-next-line
        } catch (error: any) {
            return new JSONResponse({ data: undefined, status: error.status, error: error.response.data.message || 'Failed to Populate Pending RST Requests' })
        }
    }

    async completed_user_rst_requests(): Promise<JSONResponse> {
        try {
            const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_USER_COMPLETED_RST_REQUEST_ROUTE)
            return new JSONResponse({ data: res.data.requests, status: res.status, error: undefined })
            // eslint-disable-next-line
        } catch (error: any) {
            return new JSONResponse({ data: undefined, status: error.status, error: error.response.data.message || 'Failed to Populate Completed RST Requests' })
        }
    }

    async past_user_rst_requests(): Promise<JSONResponse> {
        try {
            const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_USER_PAST_RST_REQUEST_ROUTE)
            return new JSONResponse({ data: res.data.requests, status: res.status, error: undefined })
            // eslint-disable-next-line
        } catch (error: any) {
            return new JSONResponse({ data: undefined, status: error.status, error: error.response.data.message || 'Failed to Populate Past RST Requests' })
        }
    }
}