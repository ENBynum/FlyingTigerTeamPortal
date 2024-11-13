import { Card } from '@mantine/core'
import { ReactNode } from 'react'
import ControlButtons from '../../components/controls.tsx'



export default function Controls(): ReactNode {
	return <>
		<Card.Section p={'xl'}>
			<ControlButtons width={'100%'}/>
		</Card.Section>
	</>
}