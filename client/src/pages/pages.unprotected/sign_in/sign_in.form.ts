import { createFormContext } from '@mantine/form'



export interface SignInForm {
    email: string
    password: string
}

export const [SignInFormProvider, useSignInFormContext, useSignInForm] = createFormContext<SignInForm>()