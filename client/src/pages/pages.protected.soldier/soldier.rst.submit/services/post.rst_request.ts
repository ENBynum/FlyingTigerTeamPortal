import server from '../../../../utils/axios/axiosConfig'
import { RSTForm } from '../soldier.rst.submit.form.ts'



interface ErrorResponse {
	error: string
}


export async function SubmitRequest(data: RSTForm): Promise<ErrorResponse | undefined> {
	try {
		await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_NEW_RST_REQUEST_ROUTE, data)
		return
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Submit RST Request' }
	}
}