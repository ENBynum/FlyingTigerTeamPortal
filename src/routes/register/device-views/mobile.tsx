import { Container, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useMobileOrientation } from 'react-device-detect'
import { Header, LandscapeView, PortraitView } from '../components/mobile.tsx'



export default function MobileView() {
	useDocumentTitle('Sign In - Flying Tigers Team Portal')
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}
	const { isLandscape, isPortrait } = useMobileOrientation()

	return <>
		<Container fluid w={'100vw'} h={'100vh'}>
			<Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'0'} p={'0'}>
				<Header/>
				<Stack w={'100%'} h={'calc(100% - 4rem)'} justify={'start'} align={'center'} gap={'2rem'}>
					{isPortrait && <PortraitView/>}
					{isLandscape && <LandscapeView/>}
				</Stack>
			</Stack>
		</Container>
	</>
}