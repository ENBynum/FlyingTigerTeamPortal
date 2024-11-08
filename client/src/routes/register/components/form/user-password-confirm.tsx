import { PasswordInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserPasswordConfirm(): JSX.Element {
    const form = useRegisterFormContext()

    return <>
        <PasswordInput
            type={'password'}
            id={'register-password-confirm'}
            w={'100%'}
            label={'Confirm Password'}
            required
            key={form.key('password_confirm')}
            {...form.getInputProps('password_confirm')}
            error={form.errors.password_confirm}
        />
    </>
}