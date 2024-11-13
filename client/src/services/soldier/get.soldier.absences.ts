import { Absence } from '../../types/training.ts'
import server from '../axiosConfig.ts'



interface ErrorResponse {
	error: string
}


/**
 * Fetches all Soldier's Absence requests from the server
 *
 * @resolve {@link Absence} Array
 * @reject {@link ErrorResponse}
 */
export default async function GetSoldierAbsences(): Promise<Absence[] | ErrorResponse> {
	try {
		const res = await server.post(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_SOLDIER_TRAINING_ABSENCES_ROUTE
		)
		return res.data.absences
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Fetch Absence Requests' }
	}
}