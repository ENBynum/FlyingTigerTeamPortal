import { Card, Stack } from '@mantine/core'

import Email from '../../components/email.input'
import Password from '../../components/password.input'



export default function Inputs(): JSX.Element {
    return <>
        <Card.Section p={'lg'}>
            <Stack w={'100%'} justify="center" align="center" gap={'xs'} px={'lg'}>
                <Email />
                <Password />
            </Stack>
        </Card.Section>
    </>
}