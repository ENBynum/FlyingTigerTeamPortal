import {
	Anchor,
	AspectRatio,
	Button,
	Center,
	Group,
	Image,
	Paper,
	PasswordInput,
	Stack,
	Text,
	TextInput
} from '@mantine/core'
import { useMobileOrientation } from 'react-device-detect'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import LoginRequest from '../../../utils/constructs/api/login-request.ts'
import { LoginForm } from '../types.ts'
import { useLoginFormContext } from './shared.ts'



function LogoComponent() {
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
					<Image src={'/reserves-seal.png'}/>
				</AspectRatio>
			</Center>
		</Paper>
	</>
}

function LoginFormComponent() {
	const navigate: NavigateFunction = useNavigate()
	const form = useLoginFormContext()
	const { isPortrait } = useMobileOrientation()

	function handleSubmit(data: LoginForm) {
		// const res: JSONResponse = new LoginRequest(data).submit()
		// if (res.error) {
		// 	notifications.show({
		// 		position: 'top-center',
		// 		withCloseButton: false,
		// 		autoClose: 3000,
		// 		message: res.error,
		// 		color: 'red'
		// 	})
		// } else {
		// 	const data: LoginAPIResponseData = res.data as LoginAPIResponseData
		// 	navigate(auth.user.login(data))
		// }
		const req = new LoginRequest(data)
		console.log(req.doc())
	}

	return <>
		<form
			onSubmit={form.onSubmit(handleSubmit)}
			style={{
				width: isPortrait ? '100%' : 'calc((100% - 1rem) / 2)',
				justifyContent: 'center',
				alignItems: 'center'
			}}
		>
			<Stack w={'100%'} justify={'center'} align={'center'} gap={'2rem'} pt={'1rem'}>
				<Stack w={'100%'} gap={'0.5rem'}>
					<TextInput
						w={'100%'}
						label={'Email'}
						required
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						w={'100%'}
						label={'Password'}
						required
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
				</Stack>
				<Stack w={'100%'} align={'center'} gap={'1rem'}>
					<Button w={'90%'} size={'lg'} type={'submit'}>
						Sign In
					</Button>
					<Group w={'100%'} justify={'center'} gap={'0.5rem'}>
						<Text size={'sm'}>Forgot your password?</Text>
						<Anchor size={'sm'} onClick={() => console.log('Reset Password')}>Reset</Anchor>
					</Group>
				</Stack>
				<Group w={'100%'} justify={'center'} gap={'0.5rem'}>
					<Text size={'sm'}>Need to register for an account?</Text>
					<Anchor size={'sm'} onClick={() => navigate('/register')}>Register Now!</Anchor>
				</Group>
			</Stack>
		</form>
	</>
}

export function PortraitView() {

	return <>
		<Stack w={'100%'} h={'100%'} justify={'start'} align={'center'} gap={'1rem'} p={'1rem'}>
			<LogoComponent/>
			<LoginFormComponent/>
		</Stack>
	</>
}

export function LandscapeView() {
	return <>
		<Group w={'100%'} h={'100%'} justify={'space-evenly'} align={'space-evenly'} gap={'1rem'} p={'1rem'}>
			<LogoComponent/>
			<LoginFormComponent/>
		</Group>
	</>
}