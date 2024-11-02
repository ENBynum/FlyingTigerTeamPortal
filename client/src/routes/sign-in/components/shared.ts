import { createFormContext } from '@mantine/form'
import { LoginForm } from '../types.ts'



export const [LoginFormProvider, useLoginFormContext, useLoginForm] = createFormContext<LoginForm>()