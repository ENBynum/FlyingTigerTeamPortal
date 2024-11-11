import { useSelector } from 'react-redux'

import { Card, ScrollArea, Stack, Text } from '@mantine/core'

import { AppState } from '../../../../app.store'



export default function AllDrills(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)

    return <>
        <Card.Section p={'md'} withBorder>
            <ScrollArea mah={'10rem'} w={'100%'} type={'scroll'} scrollHideDelay={0} scrollbars={'y'}>
                <Stack w={'100%'} justify={'start'}>
                    {dashboard.allTrainingDates?.map(function (value: string): JSX.Element {
                        return <Text size={'lg'}>{value}</Text>
                    })}
                </Stack>
            </ScrollArea>
        </Card.Section>
    </>
}