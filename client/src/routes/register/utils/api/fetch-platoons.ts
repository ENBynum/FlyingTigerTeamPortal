import server from '../../../../utils/axios/axiosConfig'
import { PlatoonUnit } from '../../../../utils/types/units'
import { FetchPlatoonListReturnData } from '../types'



export default async function FetchPlatoonList(companyID: string): Promise<FetchPlatoonListReturnData> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_PLATOON_LIST + companyID)
        return { data: res.data as PlatoonUnit[], status: res.status, error: undefined }
        // eslint-disable-next-line
    } catch (error: any) {
        return { data: undefined, status: error.status, error: error.response.data.message || 'Failed to Fetch Platoons' }
    }
}