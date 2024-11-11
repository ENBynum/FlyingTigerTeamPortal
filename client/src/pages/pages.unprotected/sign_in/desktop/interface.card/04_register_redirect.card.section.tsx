import { Card, Center } from '@mantine/core'

import RegisterRedirect from '../../components/register.link'



export default function Redirect(): JSX.Element {
    return <>
        <Card.Section p={'lg'}>
            <Center w={'100%'}>
                <RegisterRedirect />
            </Center>
        </Card.Section>
    </>
}