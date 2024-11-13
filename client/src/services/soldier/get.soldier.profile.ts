import Profile from '../../types/profile.ts'
import server from '../axiosConfig.ts'



interface ErrorResponse {
	error: string
}


/**
 * Fetches the Soldier's Profile from the server
 *
 * @resolve {@link Profile}
 * @reject {@link ErrorResponse}
 */
export default async function GetSoldierProfile(): Promise<Profile | ErrorResponse> {
	try {
		const res = await server.get(
			import.meta.env.VITE_SERVER_DOMAIN +
			import.meta.env.VITE_SERVER_SOLDIER_PROFILE_ROUTE
		)
		return res.data as Profile
		// eslint-disable-next-line
	} catch (error: any) {
		return { error: error.response.data.detail || 'Failed to Fetch Soldier Profile' }
	}
}