import { useMobileOrientation } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import { AspectRatio, Button, Center, Image, Paper, Stack } from '@mantine/core'



/**
 * Renders a logo component that adjusts its dimensions based on device orientation.
 *
 * The component utilizes Mantine's Paper, Center, Image, and AspectRatio components
 * to display an image of a seal. The dimensions of the component adapt to the device
 * orientation: full width and half height in portrait mode, and half width and full
 * height in landscape mode.
 */
export function LogoComponent(): JSX.Element {
	const { isPortrait } = useMobileOrientation()

	return <>
		<Paper
			withBorder
			radius={'lg'}
			shadow={'xl'}
			w={isPortrait ? '100%' : 'calc((100% - 1rem) / 2)'}
			h={isPortrait ? 'calc((100% - 1rem) / 2)' : '100%'}
			p={'2rem'}
		>
			<Center w={'100%'} h={'100%'}>
				<AspectRatio ratio={1} w={'100%'} h={'auto'}>
					<Image src={'/reserves-seal.png'} />
				</AspectRatio>
			</Center>
		</Paper>
	</>
}

/**
 * Renders a sign-in button for the home route.
 *
 * This component uses Mantine's Button component to create a large,
 * center-aligned button. The button is styled with a width of 90%
 * and is used to navigate to the sign-in route when clicked.
 *
 * @returns The sign-in button component.
 */
function SignInButton(): JSX.Element {
	const navigate = useNavigate()

	return <>
		<Button w={'90%'} size={'lg'} onClick={(): void => navigate('/sign-in')}>
			Sign In
		</Button>
	</>
}

/**
 * Renders a register button for the home route.
 *
 * This component uses Mantine's Button component to create a large,
 * center-aligned button. The button is styled with a width of 90%
 * and is used to navigate to the register route when clicked.
 *
 * @returns The register button component.
 */
function RegisterButton(): JSX.Element {
	const navigate = useNavigate()

	return <>
		<Button w={'90%'} size={'lg'} onClick={(): void => navigate('/register')}>
			Register
		</Button>
	</>
}

/**
 * Renders a stack of the sign-in and register buttons for the home route.
 *
 * This component uses Mantine's Stack component to display the sign-in and
 * register buttons in a responsive manner. On portrait devices, the buttons
 * are stacked vertically, and on landscape devices, they are placed
 * side-by-side.
 *
 * @returns The redirect buttons component.
 */
export function RedirectButtons(): JSX.Element {
	const { isPortrait } = useMobileOrientation()

	return <>
		<Stack
			w={isPortrait ? '100%' : 'calc((100% - 1rem) / 2)'}
			justify={'center'}
			align={'center'}
			gap={'2rem'}
			pt={'1rem'}
		>
			<SignInButton />
			<RegisterButton />
		</Stack>
	</>
}