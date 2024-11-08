import { useMobileOrientation } from 'react-device-detect'

import { Grid, Stack } from '@mantine/core'

import { UserFirst, UserLast, UserMiddle, UserNoMiddle, UserRank } from '../'



export default function PII(): JSX.Element {
    const { isPortrait, isLandscape } = useMobileOrientation()

    return <>
        {isPortrait && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
            <Grid w={'100%'}>
                <Grid.Col span={4}><UserRank /></Grid.Col>
                <Grid.Col span={8}><UserLast /></Grid.Col>
            </Grid>
            <Grid w={'100%'}>
                <Grid.Col span={6}><UserFirst /></Grid.Col>
                <Grid.Col span={6}><UserMiddle /></Grid.Col>
            </Grid>
            <UserNoMiddle />
        </Stack>}
        {isLandscape && <Stack w={'100%'} justify={'center'} align={'end'} gap={'0.5rem'}>
            <Grid w={'100%'}>
                <Grid.Col span={2}><UserRank /></Grid.Col>
                <Grid.Col span={4}><UserLast /></Grid.Col>
                <Grid.Col span={3}><UserFirst /></Grid.Col>
                <Grid.Col span={3}><UserMiddle /></Grid.Col>
            </Grid>
            <UserNoMiddle />
        </Stack>}
    </>
}