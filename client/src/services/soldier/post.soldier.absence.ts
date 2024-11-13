import { RSTForm } from '../../pages/pages.protected.soldier/soldier.rst.submit/soldier.rst.submit.form.ts'
import server from '../axiosConfig.ts'



interface Response {
	response: string
}


interface ErrorResponse {
	error: string
}


/**
 * Submits a soldier's absence request to the server
 * @param {RSTForm} data AbsenceForm data
 * @resolve {@link Response}
 * @reject {@link ErrorResponse}
 */
export default async function PostSoldierAbsence(data: RSTForm): Promise<Response | ErrorResponse> {
	try {
		await server.post(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_SOLDIER_TRAINING_ABSENCES_ROUTE,
			data
		)
		return { response: 'Absence Request Submitted' }
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Submit RST Request' }
	}
}