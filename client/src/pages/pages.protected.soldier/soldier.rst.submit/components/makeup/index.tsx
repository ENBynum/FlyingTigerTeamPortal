import { Stack } from '@mantine/core'
import { ReactNode } from 'react'
import Dates from './01_dates.tsx'
import Location from './02_location.tsx'
import Trainer from './03_trainer.tsx'
import Uniform from './04_uniform.tsx'
import Remarks from './05_remarks.tsx'



export default function Makeup(): ReactNode {
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<Dates/>
			<Location/>
			<Trainer/>
			<Uniform/>
			<Remarks/>
		</Stack>
	</>
}