export interface Drill {
    Id: string
    start_date: string
    end_date: string
}

export interface ET {
    Id: string
    start_date: string
    end_date: string
}

export interface SquadUnit {
    Id: string
    name: string
    platoon: string
    soliders: string[]
}

export interface PlatoonUnit {
    Id: string
    name: string
    company: string
    squads: string[]
}

export interface CompanyUnit {
    Id: string
    name: string
    platoons: string[]
    battle_assemblies: string[]
}