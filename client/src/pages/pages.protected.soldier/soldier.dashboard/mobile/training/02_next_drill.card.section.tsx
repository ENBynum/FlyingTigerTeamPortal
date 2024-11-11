import { useSelector } from 'react-redux'

import { Card, Text } from '@mantine/core'

import { AppState } from '../../../../app.store'



export default function NextDrill(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)

    return <>
        <Card.Section p={'md'} pt={'0.2rem'} withBorder={dashboard.viewAllDrills}>
            <Text size={'lg'}>{dashboard.nextTrainingDates}</Text>
        </Card.Section>
    </>
}