import server from '../../../../services/axiosConfig.ts'
import { SquadUnit } from '../../../../utils/types/units'
import { FetchSquadListReturnData } from '../types'



export default async function FetchSquadList(platoonID: string): Promise<FetchSquadListReturnData> {
	try {
		const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_SQUAD_LIST + platoonID)
		return { data: res.data as SquadUnit[], status: res.status, error: undefined }
		// eslint-disable-next-line
	} catch (error: any) {
		return { data: undefined, status: error.status, error: error.response.data.message || 'Failed to Fetch Squads' }
	}
}