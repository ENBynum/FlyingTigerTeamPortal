import { useSelector } from 'react-redux'

import { Card, Grid, Group, Pill, ScrollArea, Stack, Text } from '@mantine/core'

import RSTDateString from '../../../../../helpers/rst_date_string'
import { RSTRequest } from '../../../../../types/rst'
import { AppState } from '../../../../app.store'



function Request(req: RSTRequest): JSX.Element {
    const date = RSTDateString(req, 'absence_dates')
    const status = req.supervisor_signature ? 'w/ Commander' : 'w/ Supervisor'

    return <>
        <Grid w={'100%'}>
            <Grid.Col span={8}>
                <Text size={'lg'}>{date}</Text>
            </Grid.Col>
            <Grid.Col span={4}>
                <Group w={'100%'} h={'100%'} justify='center' align='center'>
                    <Pill withRemoveButton={false}>{status}</Pill>
                </Group>
            </Grid.Col>
        </Grid>
    </>
}


export default function AllPending(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)

    return <>
        <Card.Section p={'md'} withBorder>
            <ScrollArea mah={'10rem'} w={'100%'} type={'scroll'} scrollHideDelay={0} scrollbars={'y'}>
                <Stack w={'100%'} justify={'start'}>
                    {dashboard.pendingRST?.map(function (req): JSX.Element {
                        return Request(req)
                    })}
                </Stack>
            </ScrollArea>
        </Card.Section>
    </>
}