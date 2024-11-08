import { CompanyUnit, PlatoonUnit, SquadUnit } from '../../../../utils/types/units'



export interface FetchCompanyListReturnData {
    data?: CompanyUnit[]
    status: number
    error?: string
}

export interface FetchPlatoonListReturnData {
    data?: PlatoonUnit[]
    status: number
    error?: string
}

export interface FetchSquadListReturnData {
    data?: SquadUnit[]
    status: number
    error?: string
}