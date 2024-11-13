import { Absence } from '../../types/training.ts'
import server from '../axiosConfig.ts'



interface ErrorResponse {
	error: string
}


/**
 * Fetches Soldier's Absence request by ID from the server
 * @param absenceID string
 * @resolve {@link Absence}
 * @reject {@link ErrorResponse}
 */
export default async function GetSoldierAbsencesByID(absenceID: string): Promise<Absence | ErrorResponse> {
	try {
		const res = await server.get(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_SOLDIER_TRAINING_ABSENCE_BY_ID_ROUTE +
			absenceID
		)
		return res.data
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Fetch Absence Request' }
	}
}