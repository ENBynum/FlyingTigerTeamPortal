import { Stack } from '@mantine/core'
import { ReactNode } from 'react'
import AbsenceReason from '../../components/absence_reason.tsx'
import AbsenceType from '../../components/absence_type.tsx'



export default function Absence(): ReactNode {
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<AbsenceType/>
			<AbsenceReason/>
		</Stack>
	</>
}