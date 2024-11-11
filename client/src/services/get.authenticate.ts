import server from '../utils/axios/axiosConfig'



interface ReturnData {
    dodid: string
    unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}

interface ErrorResponse {
    error: string
}

export default async function Authenticate(): Promise<ReturnData | ErrorResponse> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_AUTHENTICATE_ROUTE)
        const auth: ReturnData = res.data
        return auth
    } catch (error: any) {
        return { error: error.response.data.detail || 'Not Authenticated' }
    }
}