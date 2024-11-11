import { Stack } from '@mantine/core'

import Email from '../../components/email.input'
import Password from '../../components/password.input'



export default function FormInputs(): JSX.Element {
    return <>
        <Stack w={'100%'} gap={'0.5rem'}>
            <Email />
            <Password />
        </Stack>
    </>
}