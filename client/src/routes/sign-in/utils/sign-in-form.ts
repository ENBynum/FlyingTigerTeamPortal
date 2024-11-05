import { createFormContext } from '@mantine/form'

import { SignInForm } from './types.ts'



export const [SignInFormProvider, useSignInFormContext, useSignInForm] = createFormContext<SignInForm>()