import { Drill } from '../../../../types/unit'
import server from '../../../../utils/axios/axiosConfig'



interface ReturnData {
    training: Drill[]
}

interface ErrorResponse {
    error: string
}

export async function FetchTraining(): Promise<ReturnData | ErrorResponse> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_UNIT_TRAINING_DATES)
        const training: ReturnData = res.data
        return training
    } catch (error: any) {
        console.log(error)
        return { error: error.response.data.detail || 'Failed to Fetch Training Dates' }
    }
}