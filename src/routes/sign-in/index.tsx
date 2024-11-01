import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { useEffect } from 'react'
import { isMobileOnly, useMobileOrientation } from 'react-device-detect'
import LoginRequest from '../../utils/constructs/api/login-request.ts'
import { LoginFormProvider, useLoginForm } from './components/shared.ts'
import MobileView from './device-views/mobile.tsx'
import { LoginForm } from './types.ts'



export default function SignInRoute() {
	useDocumentTitle('Sign In - Flying Tigers Team Portal')
	const { isPortrait } = useMobileOrientation()
	const scroll = useWindowScroll()[1]
	
	useEffect(() => {
		scroll({ y: 0 })
	}, [scroll])
	
	const form = useLoginForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: ''
		}
	})
	
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
			<LoginFormProvider form={form}>
				{isMobileOnly && <MobileView/>}
			</LoginFormProvider>
		</form>
	</>
	
}