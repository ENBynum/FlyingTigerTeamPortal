import { Card, Grid, Group, Pill, ScrollArea, Stack, Text } from '@mantine/core'
import { DateTime } from 'luxon'
import { ReactNode, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DrillDateString from '../../../../../helpers/drill_date_string.ts'
import { Drill } from '../../../../../types/unit.ts'

import { AppState } from '../../../../app.store'



export default function AllDrills(): ReactNode {
	const dashboard = useSelector((state: AppState) => state.soldierDashboard)
	
	return <>
		<Card.Section p={'md'} withBorder>
			<ScrollArea mah={'10rem'} w={'100%'} type={'scroll'} scrollHideDelay={0} scrollbars={'y'}>
				<Stack w={'100%'} justify={'start'}>
					{dashboard.allTraining?.map(function (drill): ReactNode {
						return DrillRow(drill)
					})}
				</Stack>
			</ScrollArea>
		</Card.Section>
	</>
}

function DrillRow(drill: Drill): ReactNode {
	const dashboard = useSelector((state: AppState) => state.soldierDashboard)
	const date = DrillDateString(drill)
	const [status, setStatus] = useState<'RST Approved' | 'RST Denied' | 'RST Pending' | undefined>(undefined)
	
	
	useEffect(function () {
		const date_values: number[] = []
		date_values.push(DateTime.fromISO(drill.start_date).valueOf())
		if (!date_values.includes(DateTime.fromISO(drill.end_date).valueOf())) {
			let days = 0
			do {
				days++
				date_values.push(DateTime.fromISO(drill.start_date).plus({ hours: days * 24 }).valueOf())
			} while (!date_values.includes(DateTime.fromISO(drill.end_date).toUTC().valueOf()))
		}
		const dates: string[] = []
		date_values.map(function (value) {
			dates.push(DateTime.fromMillis(value).toFormat('yyyy-LL-dd'))
		})
		
		dashboard.rstRequests.map(function (req) {
			if (dates.includes(req.absence_dates[0])) {
				if (req.commander_decision === 'Approved') {
					setStatus('RST Approved')
				} else if (req.commander_decision === 'Denied') {
					setStatus('RST Denied')
				} else {
					setStatus('RST Pending')
				}
			}
		})
	}, [])
	
	return <>
		<Grid w={'100%'}>
			<Grid.Col span={8}>
				<Text>{date}</Text>
			</Grid.Col>
			{status && <Grid.Col span={4}>
				<Group w={'100%'} h={'100%'} justify="center" align="center">
					<Pill
						withRemoveButton={false}
						c={status === 'RST Approved' ? 'green' : status === 'RST Denied' ? 'red' : status === 'RST Pending' ? 'yellow' : undefined}
					>
						{status}
					</Pill>
				</Group>
			</Grid.Col>}
		</Grid>
	</>
}