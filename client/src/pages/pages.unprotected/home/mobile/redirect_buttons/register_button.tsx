import { useNavigate } from 'react-router-dom'

import { Button } from '@mantine/core'

import { routes } from '../../../../routes'



export default function RegisterButton(): JSX.Element {
    const navigate = useNavigate()

    return <>
        <Button w={'90%'} size={'lg'} onClick={(): void => navigate(routes.register)}>
            Register
        </Button>
    </>
}