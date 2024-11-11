import { RSTRequest } from '../../../../types/rst'
import server from '../../../../utils/axios/axiosConfig'



interface ReturnData {
    requests: RSTRequest[]
}

interface ErrorResponse {
    error: string
}

export default async function FetchPendingRST(): Promise<ReturnData | ErrorResponse> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_SOLDIER_PENDING_RST_REQUEST)
        const requests: ReturnData = res.data
        return requests
    } catch (error: any) {
        return { error: error.response.data.detail || 'Failed to Fetch Pending RST Requests' }
    }
}