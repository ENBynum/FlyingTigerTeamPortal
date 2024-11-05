import server from '../../../../utils/axios/axiosConfig'
import JSONResponse from '../../../../utils/constructs/api/response'
import { RSTForm } from './new-rst-request-form'
import { AbsenceTypeType, MakeUpUniformType } from './new-rst-request-types'



export default class RSTRequest {
	absence_dates: [Date, Date]
	absence_periods: number
	absence_type: AbsenceTypeType
	absence_reason: string
	makeup_dates: [Date, Date]
	makeup_location: string
	makeup_trainer: string
	makeup_uniform: MakeUpUniformType
	makeup_remarks?: string

	constructor({
		absence_dates,
		absence_periods,
		absence_type,
		absence_reason,
		makeup_dates,
		makeup_location,
		makeup_trainer,
		makeup_uniform,
		makeup_remarks
	}: RSTForm) {
		this.absence_dates = absence_dates as [Date, Date]
		this.absence_periods = absence_periods as number
		this.absence_type = absence_type as AbsenceTypeType
		this.absence_reason = absence_reason
		this.makeup_dates = makeup_dates as [Date, Date]
		this.makeup_location = makeup_location
		this.makeup_trainer = makeup_trainer
		this.makeup_uniform = makeup_uniform as MakeUpUniformType
		this.makeup_remarks = makeup_remarks
	}

	async submit(): Promise<JSONResponse> {
		try {
			const res = await server.post(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_NEW_RST_REQUEST_ROUTE, this.doc())
			return new JSONResponse({ data: undefined, status: res.status, error: undefined })
			// eslint-disable-next-line
		} catch (error: any) {
			return new JSONResponse({
				data: undefined,
				status: error.status,
				error: error.response.data.message || 'Failed to Submit Request'
			})
		}
	}

	doc() {
		return {
			absence_dates: this.absence_dates,
			absence_periods: this.absence_periods,
			absence_type: this.absence_type,
			absence_reason: this.absence_reason,
			makeup_dates: this.makeup_dates,
			makeup_location: this.makeup_location,
			makeup_trainer: this.makeup_trainer,
			makeup_uniform: this.makeup_uniform,
			makeup_remarks: this.makeup_remarks
		}
	}
}