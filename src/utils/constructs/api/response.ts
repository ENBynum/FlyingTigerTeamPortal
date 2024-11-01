export interface JSONResponseData {
	data?: object
	status: number
	error?: string
}


export default class JSONResponse {
	data: object | undefined
	status: number
	error: string | undefined

	constructor() {
		this.data = undefined
		this.status = 500
		this.error = undefined
	}

	set({ data, status, error }: JSONResponseData): void {
		this.data = data
		this.status = status || 500
		this.error = error
	}

	doc(): JSONResponseData {
		return {
			data: this.data,
			status: this.status,
			error: this.error
		}
	}
}