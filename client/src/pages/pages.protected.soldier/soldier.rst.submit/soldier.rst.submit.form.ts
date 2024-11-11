import { createFormContext } from '@mantine/form'

import { AbsenceTypes, MakeUpUniforms } from '../../../types/rst'



export interface RSTForm {
    absence_dates: [Date | null, Date | null]
    absence_periods?: number
    absence_type: AbsenceTypes | ''
    absence_reason: string
    makeup_dates: [Date | null, Date | null]
    makeup_location: string
    makeup_trainer: string
    makeup_uniform: MakeUpUniforms | ''
    makeup_remarks: string
}


export const [RSTFormProvider, useRSTFormContext, useRSTForm] = createFormContext<RSTForm>()