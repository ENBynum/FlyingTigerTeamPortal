export interface JSONResponseData {
	data?: object
	status: number
	error?: string
}


export default class JSONResponse {
	data: object | undefined
	status: number
	error: string | undefined
	
	/**
	 * Initializes a new instance of the JSONResponse class.
	 *
	 * @param data - The data to be included in the response.
	 * @param status - The HTTP status code of the response.
	 * @param error - An optional error message if an error occurred.
	 */
	constructor({ data, status, error }: JSONResponseData) {
		this.data = data
		this.status = status
		this.error = error
	}

	/**
	 * Returns the properties of the JSONResponse object as a JSONResponseData
	 * object.
	 *
	 * @returns {JSONResponseData} The JSONResponseData object containing the
	 * properties of the JSONResponse object.
	 */
	doc(): JSONResponseData {
		return {
			data: this.data,
			status: this.status,
			error: this.error
		}
	}
}