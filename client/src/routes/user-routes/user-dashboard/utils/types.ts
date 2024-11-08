export interface TrainingEvent {
    Id: string
    start_date: string
    end_date: string
}

export interface UnitTrainingAPIResponseData {
    training: TrainingEvent[]
}