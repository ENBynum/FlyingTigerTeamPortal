import { Card, Title } from '@mantine/core'
import { ReactNode } from 'react'



export default function Header(): ReactNode {
	return <>
		<Card.Section p={'md'} pb={'0.2rem'}>
			<Title order={2}>Absence Requests</Title>
		</Card.Section>
	</>
}