import { useMobileOrientation } from 'react-device-detect'

import { Group, Stack } from '@mantine/core'

import Logo from './logo'
import RedirectButtons from './redirect_buttons'



export default function HomeMobile(): JSX.Element {
    const { isPortrait, isLandscape } = useMobileOrientation()

    return <>
        {isPortrait && <Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'1rem'} p={'1rem'}>
            <Logo />
            <RedirectButtons />
        </Stack>}
        {isLandscape && <Group w={'100%'} h={'100%'} justify={'space-evenly'} align={'space-evenly'} gap={'1rem'} p={'1rem'}>
            <Logo />
            <RedirectButtons />
        </Group>}
    </>
}