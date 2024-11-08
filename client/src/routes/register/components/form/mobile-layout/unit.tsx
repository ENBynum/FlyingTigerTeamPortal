import { useMobileOrientation } from 'react-device-detect'

import { Grid, Stack } from '@mantine/core'

import { UserCompany, UserPlatoon, UserSquad } from '../'



export default function Unit(): JSX.Element {
    const { isPortrait, isLandscape } = useMobileOrientation()

    return <>
        {isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
            <UserCompany />
            <UserPlatoon />
            <UserSquad />
        </Stack>}
        {isLandscape && <Grid w={'100%'}>
            <Grid.Col span={4}>
                <UserCompany />
            </Grid.Col>
            <Grid.Col span={4}>
                <UserPlatoon />
            </Grid.Col>
            <Grid.Col span={4}>
                <UserSquad />
            </Grid.Col>
        </Grid>}
    </>
}