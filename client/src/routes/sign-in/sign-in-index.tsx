import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../store/main.ts'
import { AuthState, login } from '../../store/slices/auth.ts'
import SignInMobileView from './device-views/sign-in-mobile-view.tsx'
import { SignInForm, SignInFormProvider, useSignInForm } from './utils/sign-in-form.ts'
import SignInRequest, { AuthReturn } from './utils/sign-in-request-api.ts'



export default function SignInRoute(): JSX.Element {
	useDocumentTitle('Sign In - Flying Tigers Team Portal')
	const navigate = useNavigate()
	const scroll = useWindowScroll()[1]

	const auth: AuthState = useSelector((state: RootState): AuthState => state.auth)
	const dispatch = useDispatch<AppDispatch>()

	useEffect((): void => {
		scroll({ y: 0 })
	}, [scroll])

	const form = useSignInForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: ''
		}
	})

	async function handleSubmit(data: SignInForm): Promise<void> {
		const req = new SignInRequest(data)
		await req.submit()
		if (req.response?.error) {
			notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: req.response.error, color: 'red' })
		} else {
			notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: 'Successfully Signed In', color: 'green' })
			const data: AuthReturn = req.response?.data as AuthReturn
			dispatch(login(data))
		}
	}

	useEffect(function (): void {
		navigate(auth.dashboard_route as string)
	}, [auth.dashboard_route])

	return <>
		<form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
			<SignInFormProvider form={form}>
				{isMobileOnly && <SignInMobileView />}
			</SignInFormProvider>
		</form>
	</>

}