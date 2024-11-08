import { useMobileOrientation } from 'react-device-detect'

import { Container, Group, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'

import { LogoComponent, RedirectButtons } from './components/home-mobile-components.tsx'



export default function HomeMobileView(): JSX.Element {
	useDocumentTitle('Home - Flying Tigers Team Portal')
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}
	const { isPortrait, isLandscape } = useMobileOrientation()

	return <>
		<Container fluid w={'100vw'} h={'100vh'}>
			{isPortrait && <Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'1rem'} p={'1rem'}>
				<LogoComponent />
				<RedirectButtons />
			</Stack>}
			{isLandscape && <Group w={'100%'} h={'100%'} justify={'space-evenly'} align={'space-evenly'} gap={'1rem'} p={'1rem'}>
				<LogoComponent />
				<RedirectButtons />
			</Group>}
		</Container>
	</>
}