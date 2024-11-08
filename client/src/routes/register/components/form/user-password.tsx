import { PasswordInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserPassword(): JSX.Element {
    const form = useRegisterFormContext()

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-password-confirm')?.focus()
        }
    }

    return <>
        <PasswordInput
            type={'password'}
            id={'register-password'}
            w={'100%'}
            label={'Password'}
            required
            key={form.key('password')}
            {...form.getInputProps('password')}
            error={form.errors.password}
            onKeyDownCapture={handleEnter}
        />
    </>
}