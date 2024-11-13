import { Card, Stack, Title } from '@mantine/core'



export default function Header() {
	return <>
		<Card.Section p={'md'}>
			<Stack w={'100%'} justify={'center'} align={'center'} gap={'1.5rem'}>
				<Title order={2}>Request for Excused Absence/RST/ET</Title>
			</Stack>
		</Card.Section>
	</>
}