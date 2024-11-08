import { Grid } from '@mantine/core'

import { UserPassword, UserPasswordConfirm } from '../'



export default function Password(): JSX.Element {
    return <>
        <Grid w={'100%'}>
            <Grid.Col span={6}><UserPassword /></Grid.Col>
            <Grid.Col span={6}><UserPasswordConfirm /></Grid.Col>
        </Grid>
    </>
}