import { useNavigate } from 'react-router-dom'

import { Anchor, Group, Text } from '@mantine/core'

import { routes } from '../../../../routes'



export default function RegisterRedirect(): JSX.Element {
    const navigate = useNavigate()

    return <>
        <Group w={'100%'} justify={'center'} gap={'0.5rem'}>
            <Text size={'sm'}>Need to register for an account?</Text>
            <Anchor size={'sm'} onClick={() => navigate(routes.register)}>Register Now!</Anchor>
        </Group>
    </>
}
