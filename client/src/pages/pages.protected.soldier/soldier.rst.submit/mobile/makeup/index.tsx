import { Stack } from '@mantine/core'
import { ReactNode } from 'react'
import MakeupDates from '../../components/makeup_dates.tsx'
import MakeupLocation from '../../components/makeup_location.tsx'
import MakeupRemarks from '../../components/makeup_remarks.tsx'
import MakeupTrainer from '../../components/makeup_trainer.tsx'
import MakeupUniform from '../../components/makeup_uniform.tsx'



export default function Makeup(): ReactNode {
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<MakeupDates/>
			<MakeupLocation/>
			<MakeupTrainer/>
			<MakeupUniform/>
			<MakeupRemarks/>
		</Stack>
	</>
}