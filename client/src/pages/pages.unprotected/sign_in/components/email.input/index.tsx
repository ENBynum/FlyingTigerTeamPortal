import { TextInput } from '@mantine/core'

import { useSignInFormContext } from '../../sign_in.form'



export default function Email(): JSX.Element {
    const form = useSignInFormContext()

    function handleEnter(event: any): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('sign-in-password')?.focus()
        }
    }

    return <>
        <TextInput
            id={'sign-in-email'}
            type={'email'}
            w={'100%'}
            label={'Email'}
            required
            key={form.key('email')}
            {...form.getInputProps('email')}
            onKeyDown={handleEnter}
        />
    </>
}