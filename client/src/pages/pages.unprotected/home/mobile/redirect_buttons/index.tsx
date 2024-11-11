import { useMobileOrientation } from 'react-device-detect'

import { Stack } from '@mantine/core'

import RegisterButton from './register_button'
import SignInButton from './sign_in_button'



export default function RedirectButtons(): JSX.Element {
    const { isPortrait } = useMobileOrientation()

    return <>
        <Stack
            w={isPortrait ? '100%' : 'calc((100% - 1rem) / 2)'}
            justify={'center'}
            align={'center'}
            gap={'2rem'}
            pt={'1rem'}
        >
            <SignInButton />
            <RegisterButton />
        </Stack>
    </>
}