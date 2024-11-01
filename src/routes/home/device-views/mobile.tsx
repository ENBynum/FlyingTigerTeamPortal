import { Button } from '@mantine/core'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import HomeSignInWrapper from '../../../utils/components/templates/mobile/home-auth.tsx'



export default function HomeMobileView() {
	const navigate: NavigateFunction = useNavigate()

	return <HomeSignInWrapper>
		<Button
			w={'90%'}
			size={'lg'}
			onClick={() => navigate('/sign-in')}
		>
			Sign In
		</Button>
		<Button
			w={'90%'}
			size={'lg'}
			onClick={() => navigate('/register')}
		>
			Register
		</Button>
	</HomeSignInWrapper>
}