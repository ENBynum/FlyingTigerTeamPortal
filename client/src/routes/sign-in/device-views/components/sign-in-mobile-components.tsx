import { useMobileOrientation } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import {
	Anchor, AspectRatio, Button, Center, Group, Image, Paper, PasswordInput, Stack, Text, TextInput
} from '@mantine/core'

import { useSignInFormContext } from '../../utils/sign-in-form.ts'



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
 * Renders an email input component for the sign-in form.
 *
 * This component uses Mantine's TextInput component to display an email input
 * field. It retrieves the form context to manage input values and submission.
 *
 * @returns The email input component.
 */
function SignInEmail(): JSX.Element {
	const form = useSignInFormContext()

	return <>
		<TextInput
			id={'sign-in-email'}
			type={'email'}
			w={'100%'}
			label={'Email'}
			required
			key={form.key('email')}
			{...form.getInputProps('email')}
		/>
	</>
}

/**
 * Renders a password input component for the sign-in form.
 *
 * This component uses Mantine's PasswordInput component to display a password
 * input field. It retrieves the form context to manage input values and submission.
 *
 * @returns The password input component.
 */
function SignInPassword(): JSX.Element {
	const form = useSignInFormContext()

	return <>
		<PasswordInput
			id={'sign-in-password'}
			type={'password'}
			w={'100%'}
			label={'Password'}
			required
			key={form.key('password')}
			{...form.getInputProps('password')}
		/>
	</>
}

/**
 * Renders a stack of the email and password input components for the sign-in form.
 *
 * This component is used in the sign-in form to display the email and password input
 * fields in a responsive manner.
 *
 * @returns The email and password input components in a stack.
 */
function SignInFormInputs(): JSX.Element {
	return <>
		<Stack w={'100%'} gap={'0.5rem'}>
			<SignInEmail />
			<SignInPassword />
		</Stack>
	</>
}

/**
 * Renders the sign-in button for the sign-in form.
 *
 * This component uses Mantine's Button component to create a large,
 * center-aligned button. The button is styled with a width of 90%
 * and is used to submit the form when clicked.
 *
 * @returns The sign-in button component.
 */
function SignInButton(): JSX.Element {
	return <>
		<Button w={'90%'} size={'lg'} type={'submit'}>
			Sign In
		</Button>
	</>
}

/**
 * Renders a group of components with a link to reset the password.
 *
 * This component displays a paragraph of text with a link to reset the password.
 * It is used in the sign-in form to allow users to reset their passwords.
 *
 * @returns The forgot password link component.
 */
function PasswordResetLink(): JSX.Element {
	return <>
		<Group w={'100%'} justify={'center'} gap={'0.5rem'}>
			<Text size={'sm'}>Forgot your password?</Text>
			<Anchor size={'sm'} onClick={() => console.log('Reset Password')}>Reset</Anchor>
		</Group>
	</>
}

/**
 * Renders a group of components with a link to the registration page.
 *
 * This component displays a paragraph of text with a link to register for an account.
 * It is used in the sign-in form to allow users to register for an account.
 *
 * @returns The register link component.
 */
function RegisterLink(): JSX.Element {
	const navigate = useNavigate()

	return <>
		<Group w={'100%'} justify={'center'} gap={'0.5rem'}>
			<Text size={'sm'}>Need to register for an account?</Text>
			<Anchor size={'sm'} onClick={() => navigate('/register')}>Register Now!</Anchor>
		</Group>
	</>
}

/**
 * Renders the sign-in form with email and password input fields, a sign-in
 * button, a link to reset the password, and a link to register for an account.
 *
 * The component uses Mantine's Stack component to display the form components
 * in a responsive manner. On portrait devices, the components are stacked
 * vertically, and on landscape devices, they are placed side-by-side.
 *
 * @returns The sign-in form component.
 */
export function SignInFormComponent(): JSX.Element {
	const { isPortrait } = useMobileOrientation()

	return <>
		<Stack
			w={isPortrait ? '100%' : 'calc((100% - 1rem) / 2)'}
			justify={'center'}
			align={'center'}
			gap={'2rem'}
			pt={'1rem'}
		>
			<SignInFormInputs />
			<Stack w={'100%'} align={'center'} gap={'1rem'}>
				<SignInButton />
				<PasswordResetLink />
			</Stack>
			<RegisterLink />
		</Stack>
	</>
}