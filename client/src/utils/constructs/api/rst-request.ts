import { RSTForm } from '../../../routes/__user-routes/request-rst/utils/rst-form'
import { AbsenceTypeType, MakeUpUniformType } from '../../../routes/__user-routes/request-rst/utils/types'
import server from '../../axios/axiosConfig'
import JSONResponse, { JSONResponseData } from './response'



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
		this.absence_dates = absence_dates
		this.absence_periods = absence_periods
		this.absence_type = absence_type as AbsenceTypeType
		this.absence_reason = absence_reason
		this.makeup_dates = makeup_dates
		this.makeup_location = makeup_location
		this.makeup_trainer = makeup_trainer
		this.makeup_uniform = makeup_uniform as MakeUpUniformType
		this.makeup_remarks = makeup_remarks
	}
	
	submit(): JSONResponse {
		const response: JSONResponse = new JSONResponse()
		server.post('', this.doc())
			.then(res => {
				// const return_data: RSTRequestAPIReturnData = res.data
				const data: JSONResponseData = { data: undefined, status: res.status, error: undefined }
				response.set(data)
			})
			// eslint-disable-next-line
			.catch((error: any) => {
				const data: JSONResponseData = {
					data: undefined,
					status: error.status,
					error: error.response.data.message
				}
				response.set(data)
			})
		
		return response
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