import { Container, ScrollArea, Stack } from '@mantine/core'

import {
	Contact, DODIDInputs, Header, Password, PII, SignInLink, SubmitButton, Unit
} from './components/register-mobile-components'



export default function MobileView() {
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}

	return <>
		<Container fluid w={'100vw'} h={'100vh'} p={0}>
			<ScrollArea w={'100%'} mih={'100%'} scrollbars={'y'}>
				<Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'0'} p={0}>
					<Header />
					<Stack
						w={'100%'}
						mih={'calc(100% - 4rem)'}
						justify={'start'}
						align={'center'}
						gap={'1.5rem'}
						p={'xs'}
						pb={'1.5rem'}
					>
						<DODIDInputs />
						<PII />
						<Contact />
						<Unit />
						<Password />
						<SubmitButton />
						<SignInLink />
					</Stack>

				</Stack>
			</ScrollArea>
		</Container>
	</>
}