import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Group, ScrollArea, Stack, Text, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../../../../store/main'
import { setDrills, UserDashboardState } from '../../../../../store/slices/user-dashboard'
import JSONResponse from '../../../../../utils/constructs/api/response'
import UserDashboardAPI from '../../utils/user-dashboard-api'



export function UserDashboardNextBattleAssembly(): JSX.Element {
    const dashboard = useSelector((state: RootState): UserDashboardState => state.user_dashboard)
    const dispatch = useDispatch<AppDispatch>()
    const api = new UserDashboardAPI()

    const [viewAll, setViewAll] = useState<boolean>(false)

    useEffect(function (): void {
        api.training_events().then(function (res: JSONResponse): void {
            if (res.error) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: false,
                    autoClose: 3000,
                    message: 'Failed to Populate Next Training Date',
                    color: 'red'
                })
            } else {
                console.log(res.data)
                dispatch(setDrills(res.data))
            }
        })
    }, [])



    return <>
        <Card w={'100%'} h={'100%'} p={'1rem'} withBorder radius={'lg'} shadow={'xl'}>
            <Card.Section p={'md'}><Title order={2}>Next Battle Assembly</Title></Card.Section>
            <Card.Section p={'md'} withBorder={viewAll}>
                <Text fw={'bold'} size={'lg'}>{dashboard.next_drill_dates}</Text>
            </Card.Section>
            {viewAll && <Card.Section p={'md'}>
                <ScrollArea mah={'10rem'} w={'100%'} type={'scroll'} scrollHideDelay={0} scrollbars={'y'}>
                    <Stack w={'100%'} justify={'start'}>
                        {dashboard.all_drill_dates?.map(function (value: string): JSX.Element {
                            return <Text size={'lg'}>{value}</Text>
                        })}
                    </Stack>
                </ScrollArea>
            </Card.Section>}
            <Card.Section p={'md'} pt={0}>
                <Group w={'100%'} justify={'end'}>
                    <Button onClick={(): void => setViewAll(!viewAll)}>
                        {viewAll ? 'Hide All' : 'Show All'}
                    </Button>
                </Group>
            </Card.Section>
        </Card>
    </>
}