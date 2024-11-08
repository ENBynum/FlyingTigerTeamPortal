import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserLast(): JSX.Element {
    const form = useRegisterFormContext()

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-first')?.focus()
        }
    }

    return <>
        <TextInput
            type={'text'}
            id={'register-last'}
            required
            w={'100%'}
            label={'Last Name'}
            key={form.key('last')}
            {...form.getInputProps('last')}
            error={form.errors.last}
            onKeyDownCapture={handleEnter}
        />
    </>
}