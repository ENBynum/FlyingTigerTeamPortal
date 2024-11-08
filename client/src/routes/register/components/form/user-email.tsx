import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserEmail(): JSX.Element {
    const form = useRegisterFormContext()

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-phone')?.focus()
        }
    }

    return <>
        <TextInput
            type={'email'}
            id={'register-email'}
            w={'100%'}
            label={'Email Address'}
            required
            key={form.key('email')}
            {...form.getInputProps('email')}
            error={form.errors.email}
            onKeyDownCapture={handleEnter}
        />
    </>
}