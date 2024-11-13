import { Stack } from '@mantine/core'

import AbsenceRequests from './absences'
import UpcomingTraining from './training'



export default function SoldierDashboardMobile(): JSX.Element {
	return <>
		<Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={'1.5rem'} pt={0} px={'xs'} pb={'1.5rem'}>
			<UpcomingTraining/>
			<AbsenceRequests/>
		</Stack>
	</>
}