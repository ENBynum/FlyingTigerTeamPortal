import { Card, Text } from '@mantine/core'
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { AppState } from '../../../../app.store'



export default function Count(): ReactNode {
	const dashboard = useSelector((state: AppState) => state.soldierDashboard)
	
	return <>
		<Card.Section p={'md'} pt={'0.2rem'} pl={'2rem'} withBorder={dashboard.viewAllRSTRequests}>
			<Text size={'lg'} fw={'bold'}>{dashboard.rstRequestCount}</Text>
		</Card.Section>
	</>
}