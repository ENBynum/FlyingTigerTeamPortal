import server from '../../../../utils/axios/axiosConfig'



interface AuthRequest {
    email: string
    password: string
}

interface ReturnData {
    dodid: string
    unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}

interface ErrorResponse {
    error: string
}

export async function RequestSignIn(data: AuthRequest): Promise<ReturnData | ErrorResponse> {
    try {
        const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_SIGN_IN_ROUTE, data)
        const auth = res.data as ReturnData
        return auth
    } catch (error: any) {
        return { error: error.response.data.detail || 'Failed to Sign In' }
    }
}