import { Drill } from '../../types/training.ts'
import server from '../axiosConfig.ts'



interface ErrorResponse {
	error: string
}


/**
 * Fetches upcoming Drills for Soldier's unit from the server
 *
 * @resolve {@link Drill} Array
 * @reject {@link ErrorResponse}
 */
export default async function GetSoldierTrainingDrills(): Promise<Drill[] | ErrorResponse> {
	try {
		const res = await server.get(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_SOLDIER_TRAINING_DRILLS_ROUTE
		)
		return res.data.training
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Fetch Drills' }
	}
}