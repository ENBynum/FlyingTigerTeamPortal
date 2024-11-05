import { useMobileOrientation } from 'react-device-detect'

import { Container, Group, Stack } from '@mantine/core'
import { useDocumentTitle } from '@mantine/hooks'

import { LogoComponent, SignInFormComponent } from './components/sign-in-mobile-components'



/**
 * Renders the mobile sign-in view.
 *
 * This component sets the document title to "Sign In - Flying Tigers Team Portal" and
 * sets the viewport meta tag to allow for responsive design on mobile devices.
 *
 * It renders a logo component and a sign-in form component, with the logo at the top
 * and the form below it in portrait mode, and with the logo and form side-by-side in
 * landscape mode.
 *
 * @returns The mobile sign-in view.
 */
export default function SignInMobileView(): JSX.Element {
	useDocumentTitle('Sign In - Flying Tigers Team Portal')
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}
	const { isLandscape, isPortrait } = useMobileOrientation()

	return <>
		<Container fluid w={'100vw'} h={'100vh'}>
			{isPortrait && <Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'1rem'} p={'1rem'}>
				<LogoComponent />
				<SignInFormComponent />
			</Stack>}
			{isLandscape && <Group miw={'100%'} h={'100%'} justify={'space-evenly'} align={'space-evenly'} gap={'1rem'} p={'1rem'}>
				<LogoComponent />
				<SignInFormComponent />
			</Group>}
		</Container>
	</>
}