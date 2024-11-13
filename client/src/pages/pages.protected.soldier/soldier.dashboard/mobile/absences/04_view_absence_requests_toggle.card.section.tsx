import { Button, Card, Group } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from '../../../../app.store'
import { toggleViewAllRSTRequests } from '../../soldier.dashboard.slice'



export default function ViewAllToggle(): JSX.Element {
	const dashboard = useSelector((state: AppState) => state.soldierDashboard)
	const dispatch = useDispatch<AppDispatch>()
	
	return <>
		<Card.Section p={'md'} pt={dashboard.viewAllRSTRequests ? 'md' : 0} withBorder={dashboard.viewAllRSTRequests}>
			<Group w={'100%'} h={'100%'} justify={'end'} align="center">
				<Button w={'5rem'} onClick={() => dispatch(toggleViewAllRSTRequests())}>
					{dashboard.viewAllRSTRequests ? 'Hide' : 'Show'}
				</Button>
			</Group>
		</Card.Section>
	</>
}