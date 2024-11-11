import { useMobileOrientation } from 'react-device-detect'

import { Stack } from '@mantine/core'

import PasswordReset from '../../components/password_reset.link'
import RegisterRedirect from '../../components/register.link'
import Submit from '../../components/submit.button'
import FormInputs from './inputs'



export function SignIn(): JSX.Element {
    const { isPortrait } = useMobileOrientation()

    return <>
        <Stack
            w={isPortrait ? '100%' : 'calc((100% - 1rem) / 2)'}
            justify={'center'}
            align={'center'}
            gap={'2rem'}
            pt={'1rem'}
        >
            <FormInputs />
            <Stack w={'100%'} align={'center'} gap={'1rem'}>
                <Submit width={'90%'} />
                <PasswordReset />
            </Stack>
            <RegisterRedirect />
        </Stack>
    </>
}