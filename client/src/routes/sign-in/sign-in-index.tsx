import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../store/main.ts'
import { AuthState, login } from '../../store/slices/auth.ts'
import JSONResponse from '../../utils/constructs/api/response.ts'
import SignInMobileView from './device-views/sign-in-mobile-view.tsx'
import { SignInForm, SignInFormProvider, useSignInForm } from './utils/sign-in-form.ts'
import SignInRequest, { SignInAPIResponseData } from './utils/sign-in-request-api.ts'



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
		const res: JSONResponse = await new SignInRequest(data).submit()
		if (res.error) {
			notifications.show({
				position: 'top-center',
				withCloseButton: false,
				autoClose: 3000,
				message: res.error,
				color: 'red'
			})
		} else {
			notifications.show({
				position: 'top-center',
				withCloseButton: false,
				autoClose: 3000,
				message: 'Successfully Signed In',
				color: 'green'
			})
			const data: SignInAPIResponseData = res.data as SignInAPIResponseData
			dispatch(login(data))
			navigate(auth.user?.login_redirect() as string)
		}
	}

	return <>
		<form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%' }}>
			<SignInFormProvider form={form}>
				{isMobileOnly && <SignInMobileView />}
			</SignInFormProvider>
		</form>
	</>

}