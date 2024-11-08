import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserDODIDConfirm(): JSX.Element {
    const form = useRegisterFormContext()

    form.watch('dodid_confirm', ({ value }): void => {
        if (value?.toString().length === 10) document.getElementById('register-rank')?.focus()
    })

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-rank')?.focus()
        }
    }

    return <>
        <TextInput
            type={'number'}
            id={'register-dodid-confirm'}
            required
            label={'Confirm DoD ID'}
            key={form.key('dodid_confirm')}
            {...form.getInputProps('dodid_confirm')}
            error={form.errors.dodid_confirm}
            onKeyDownCapture={handleEnter}
        />
    </>
}