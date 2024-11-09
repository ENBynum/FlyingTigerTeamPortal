import { Drill } from '../../../../utils/types/units'



export interface UnitTrainingDatesAPIReturnData {
    training: Drill[]
}

export interface FetchTrainingReturnData {
    next: Drill
    all: Drill[]
}