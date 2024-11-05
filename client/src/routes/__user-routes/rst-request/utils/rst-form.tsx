import { createFormContext } from '@mantine/form'

import { AbsenceTypeType, MakeUpUniformType } from './types'



export interface RSTForm {
	absence_dates: [Date | null, Date | null]
	absence_periods?: number
	absence_type: AbsenceTypeType | ''
	absence_reason: string
	makeup_dates: [Date | null, Date | null]
	makeup_location: string
	makeup_trainer: string
	makeup_uniform: MakeUpUniformType | ''
	makeup_remarks: string
}


export const [RSTFormProvider, useRSTFormContext, useRSTForm] = createFormContext<RSTForm>()