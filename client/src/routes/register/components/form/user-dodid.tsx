import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserDODID(): JSX.Element {
    const form = useRegisterFormContext()

    form.watch('dodid', ({ value }): void => {
        if (value.toString().length === 10) document.getElementById('register-dodid-confirm')?.focus()
    })

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-dodid-confirm')?.focus()
        }
    }

    return <>
        <TextInput
            type={'number'}
            id={'register-dodid'}
            required
            label={'DoD ID'}
            key={form.key('dodid')}
            {...form.getInputProps('dodid')}
            error={form.errors.dodid}
            onKeyDownCapture={handleEnter}
        />
    </>
}