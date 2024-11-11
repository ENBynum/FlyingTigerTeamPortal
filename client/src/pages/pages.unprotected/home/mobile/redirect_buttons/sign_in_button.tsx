import { useNavigate } from 'react-router-dom'

import { Button } from '@mantine/core'

import { routes } from '../../../../routes'



export default function SignInButton(): JSX.Element {
    const navigate = useNavigate()

    return <>
        <Button w={'90%'} size={'lg'} onClick={(): void => navigate(routes.signIn)}>
            Sign In
        </Button>
    </>
}