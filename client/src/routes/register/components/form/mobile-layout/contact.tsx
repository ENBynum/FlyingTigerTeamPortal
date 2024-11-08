import { useMobileOrientation } from 'react-device-detect'

import { Grid, Stack } from '@mantine/core'

import { UserEmail, UserPhone } from '../'



export default function Contact(): JSX.Element {
    const { isPortrait, isLandscape } = useMobileOrientation()

    return <>
        {isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
            <UserEmail />
            <UserPhone />
        </Stack>}
        {isLandscape && <Grid w={'100%'}>
            <Grid.Col span={6}><UserEmail /></Grid.Col>
            <Grid.Col span={6}><UserPhone /></Grid.Col>
        </Grid>}
    </>
}