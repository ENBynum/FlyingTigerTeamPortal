import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserFirst(): JSX.Element {
    const form = useRegisterFormContext()

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-middle')?.focus()
        }
    }

    return <>
        <TextInput
            type={'text'}
            id={'register-first'}
            required
            w={'100%'}
            label={'First Name'}
            key={form.key('first')}
            {...form.getInputProps('first')}
            error={form.errors.first}
            onKeyDownCapture={handleEnter}
        />
    </>
}