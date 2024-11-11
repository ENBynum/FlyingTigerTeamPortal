import { Stack } from '@mantine/core'
import { ReactNode } from 'react'
import Type from './01_type.tsx'
import Reason from './02_reason.tsx'



export default function Absence(): ReactNode {
	return <>
		<Stack w={'100%'} justify={'center'} align={'center'} gap={'0.5rem'}>
			<Type/>
			<Reason/>
		</Stack>
	</>
}