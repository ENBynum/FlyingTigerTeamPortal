import { useMobileOrientation } from 'react-device-detect'

import { Group, Stack } from '@mantine/core'

import { SignIn } from './form'
import Logo from './logo'



export default function SignInMobile(): JSX.Element {
    const { isPortrait, isLandscape } = useMobileOrientation()

    return <>
        {isPortrait && <Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'1rem'} p={'1rem'}>
            <Logo />
            <SignIn />
        </Stack>}
        {isLandscape && <Group w={'100%'} h={'100%'} justify={'space-evenly'} align={'space-evenly'} gap={'1rem'} p={'1rem'}>
            <Logo />
            <SignIn />
        </Group>}
    </>
}