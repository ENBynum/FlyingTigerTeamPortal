import { useDispatch, useSelector } from 'react-redux'

import { Button, Card, Group } from '@mantine/core'

import { AppDispatch, AppState } from '../../../../app.store'
import { toggleViewAllDrills } from '../../soldier.dashboard.slice'



export default function ViewAllToggle(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)
    const dispatch = useDispatch<AppDispatch>()

    return <>
        <Card.Section p={'md'} pt={dashboard.viewAllDrills ? 'md' : 0} withBorder={dashboard.viewAllDrills}>
            <Group w={'100%'} h={'100%'} justify={'end'} align='center'>
                <Button w={'5rem'} onClick={() => dispatch(toggleViewAllDrills())}>
                    {dashboard.viewAllDrills ? 'Hide' : 'Show'}
                </Button>
            </Group>
        </Card.Section>
    </>
}