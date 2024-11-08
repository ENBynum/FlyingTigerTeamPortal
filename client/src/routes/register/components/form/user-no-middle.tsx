import { Switch } from '@mantine/core'

import { useRegisterFormContext } from '../../utils/register-form'



export default function UserNoMiddle(): JSX.Element {
    const form = useRegisterFormContext()

    form.watch('no_middle', ({ value }): void => {
        if (value) form.setFieldValue('middle', '')
    })

    return <>
        <Switch
            defaultChecked={false}
            label={'No Middle Name?'}
            key={form.key('no_middle')}
            {...form.getInputProps('no_middle')}
        />
    </>
}