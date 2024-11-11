import { PasswordInput } from '@mantine/core'

import { useSignInFormContext } from '../../sign_in.form'



export default function Password(): JSX.Element {
    const form = useSignInFormContext()

    return <>
        <PasswordInput
            id={'sign-in-password'}
            type={'password'}
            w={'100%'}
            label={'Password'}
            required
            key={form.key('password')}
            {...form.getInputProps('password')}
        />
    </>
}