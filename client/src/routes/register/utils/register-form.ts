import { createFormContext } from '@mantine/form'
import { RegisterForm } from './types'



export const [RegisterFormProvider, useRegisterFormContext, useRegisterForm] = createFormContext<RegisterForm>()