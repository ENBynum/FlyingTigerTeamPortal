import { TextInput } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserPhone(): JSX.Element {
    const form = useRegisterFormContext()

    form.watch('phone', ({ value }): void => {
        if (value.toString().length === 10) document.getElementById('register-platoon')?.focus()
    })

    return <TextInput
        type={'tel'}
        id={'register-phone'}
        w={'100%'}
        label={'Phone Number'}
        required
        leftSection={'+1'}
        key={form.key('phone')}
        {...form.getInputProps('phone')}
        error={form.errors.phone}
    />
}