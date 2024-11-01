import { createFormContext } from '@mantine/form'
import { RegisterForm } from '../types.ts'



export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] = createFormContext<RegisterForm>()