import { createFormContext } from '@mantine/form'



export interface RegisterForm {
    dodid: string
    dodid_confirm?: string
    rank: string
    name?: {
        full?: string
        last?: string
        first?: string
        middle?: string
    }
    last?: string
    first?: string
    middle?: string
    no_middle?: boolean
    email: string
    phone: string
    company: string
    platoon: string
    squad: string
    password: string
    password_confirm?: string
}

export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] = createFormContext<RegisterForm>()