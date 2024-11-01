import { Container } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'
import { useMobileOrientation } from 'react-device-detect'
import { LandscapeView, PortraitView } from '../components/mobile.tsx'



export default function MobileView() {
	useDocumentTitle('Sign In - Flying Tigers Team Portal')
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}
	const { isLandscape, isPortrait } = useMobileOrientation()

	return <>
		<Container fluid w={'100vw'} h={'100vh'}>
			{isPortrait && <PortraitView/>}
			{isLandscape && <LandscapeView/>}
		</Container>
	</>
}