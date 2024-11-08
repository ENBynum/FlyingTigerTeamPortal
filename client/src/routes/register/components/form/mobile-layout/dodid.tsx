import { Grid } from '@mantine/core'

import { UserDODID, UserDODIDConfirm } from '../'



export default function DODID(): JSX.Element {
    return <>
        <Grid w={'100%'}>
            <Grid.Col span={6}><UserDODID /></Grid.Col>
            <Grid.Col span={6}><UserDODIDConfirm /></Grid.Col>
        </Grid>
    </>
}