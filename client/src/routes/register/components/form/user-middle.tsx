import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserMiddle(): JSX.Element {
    const form = useRegisterFormContext()

    form.watch('middle', ({ value, previousValue }): void => {
        if (value) {
            if (!previousValue) {
                if (value.length > 1) document.getElementById('register-email')?.focus()
            } else {
                if ((value.length - previousValue.length) > 1) document.getElementById('register-email')?.focus()
            }
        }

    })

    function handleEnter(event: { key: string; preventDefault: () => void }): void {
        if (event.key === 'Enter') {
            event.preventDefault()
            document.getElementById('register-email')?.focus()
        }
    }

    return <>
        <TextInput
            type={'text'}
            id={'register-middle'}
            required={!form.getValues().no_middle}
            disabled={form.getValues().no_middle}
            w={'100%'}
            label={'Middle Name'}
            key={form.key('middle')}
            {...form.getInputProps('middle')}
            error={form.errors.middle}
            onKeyDownCapture={handleEnter}
        />
    </>
}