import server from '../../../../services/axiosConfig.ts'
import { CompanyUnit } from '../../../../utils/types/units'
import { FetchCompanyListReturnData } from '../types'



export default async function FetchCompanyList(): Promise<FetchCompanyListReturnData> {
	try {
		const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_COMPANY_LIST)
		return { data: res.data as CompanyUnit[], status: res.status, error: undefined }
		// eslint-disable-next-line
	} catch (error: any) {
		console.log(error)
		return { data: undefined, status: error.status, error: error.response || 'Failed to Fetch Companies' }
	}
}