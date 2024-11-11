import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Group } from '@mantine/core'

import { AppDispatch, AppState } from '../../../../app.store'
import { toggleViewAllPending } from '../../soldier.dashboard.slice'



export default function ViewAllToggle(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)
    const dispatch = useDispatch<AppDispatch>()

    return <>
        <Card.Section p={'md'} pt={dashboard.viewAllPendingRST ? 'md' : 0} withBorder={dashboard.viewAllPendingRST}>
            <Group w={'100%'} h={'100%'} justify={'end'} align='center'>
                <Button w={'5rem'} onClick={() => dispatch(toggleViewAllPending())}>
                    {dashboard.viewAllPendingRST ? 'Hide' : 'Show'}
                </Button>
            </Group>
        </Card.Section>
    </>
}