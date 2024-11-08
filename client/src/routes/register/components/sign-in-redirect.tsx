import { NavigateFunction, useNavigate } from 'react-router-dom'

import { Anchor, Group, Text } from '@mantine/core'



export default function SignInRedirect(): JSX.Element {
    const navigate: NavigateFunction = useNavigate()

    return <>
        <Group w={'100%'} justify={'center'} gap={'0.5rem'}>
            <Text size={'sm'}>Already have an account?</Text>
            <Anchor size={'sm'} onClick={() => navigate('/sign-in')}>Sign In!</Anchor>
        </Group>
    </>
}