import { Card, Grid, Group, Pill, ScrollArea, Stack, Text } from '@mantine/core'
import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import RSTDateString from '../../../../../helpers/rst_date_string'
import { RSTRequest } from '../../../../../types/rst'
import { AppState } from '../../../../app.store'



function Request(req: RSTRequest): ReactNode {
	const date = RSTDateString(req, 'absence_dates')
	const [status, setStatus] = useState<'Approved' | 'Denied' | 'w/ Commander' | 'w/ Supervisor'>('w/ Supervisor')
	
	useEffect(function () {
		if (req.commander_signature) {
			setStatus(req.commander_decision as 'Approved' | 'Denied')
		} else if (req.supervisor_signature) {
			setStatus('w/ Commander')
		} else {
			setStatus('w/ Supervisor')
		}
	}, [req.commander_decision, req.commander_signature, req.supervisor_signature])
	
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={8}>
				<Text size={'lg'}>{date}</Text>
			</Grid.Col>
			<Grid.Col span={4}>
				<Group w={'100%'} h={'100%'} justify="center" align="center">
					<Pill
						withRemoveButton={false}
						color={status === 'Approved' ? 'green' : status === 'Denied' ? 'red' : 'undefined'}
					>
						{status}
					</Pill>
				</Group>
			</Grid.Col>
		</Grid>
	</>
}


export default function All(): ReactNode {
	const dashboard = useSelector((state: AppState) => state.soldierDashboard)
	
	return <>
		<Card.Section p={'md'} withBorder>
			<ScrollArea mah={'10rem'} w={'100%'} type={'scroll'} scrollHideDelay={0} scrollbars={'y'}>
				<Stack w={'100%'} justify={'start'}>
					{dashboard.rstRequests?.map(function (req): ReactNode {
						return Request(req)
					})}
				</Stack>
			</ScrollArea>
		</Card.Section>
	</>
}