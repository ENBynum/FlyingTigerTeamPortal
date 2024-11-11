export interface RSTRequest {
    Id: string
    dodid: string
    unit: string
    subunit: string
    absence_dates: [string, string]
    absense_periods: number
    absense_type: 'Excused/Absence Authorized' | 'Excused/RST Authorized' | 'Excused/ET Authorized' | 'Exception of Unexcused Absence'
    absence_reason: string
    makeup_dates: [string, string]
    makeup_location: string
    makeup_trainer: string
    makeup_uniform: 'ACU' | 'PTs' | 'ASU'
    makeup_remarks?: string
    soldier_signature?: string
    soldier_signature_date?: string
    supervisor_recommendation?: 'Approved' | 'Denied'
    supervisor_signature?: string
    supervisor_signature_date?: string
    commander_decision?: 'Approved' | 'Denied'
    commander_signature?: string
    commander_signature_date?: string
}

export type AbsenceTypes = 'Excused/Absence Authorized' | 'Excused/RST Authorized' | 'Excused/ET Authorized' | 'Exception of Unexcused Absence'
export type MakeUpUniforms = 'ACU' | 'PT' | 'ASU'