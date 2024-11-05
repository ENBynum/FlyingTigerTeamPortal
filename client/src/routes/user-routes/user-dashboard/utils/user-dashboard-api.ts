import server from '../../../../utils/axios/axiosConfig'
import JSONResponse from '../../../../utils/constructs/api/response'



export async function PendingUserRSTRequests(): Promise<JSONResponse> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_USER_PENDING_RST_REQUEST_ROUTE)
        return new JSONResponse({ data: res.data.requests, status: res.status, error: undefined })
        // eslint-disable-next-line
    } catch (error: any) {
        return new JSONResponse({ data: undefined, status: error.status, error: error.response.data.message || 'Failed to Populate Pending RST Requests' })
    }
}