import { useMobileOrientation } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'

import { AspectRatio, Button, Center, Image, Paper, Stack } from '@mantine/core'



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

function SignInButton(): JSX.Element {
	const navigate = useNavigate()

	return <>
		<Button w={'90%'} size={'lg'} onClick={(): void => navigate('/sign-in')}>
			Sign In
		</Button>
	</>
}

function RegisterButton(): JSX.Element {
	const navigate = useNavigate()

	return <>
		<Button w={'90%'} size={'lg'} onClick={(): void => navigate('/register')}>
			Register
		</Button>
	</>
}

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