import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../store/main.ts'
import { AuthState, login } from '../../store/slices/auth.ts'
import LoginRequest, { LoginAPIResponseData } from '../../utils/constructs/api/login-request.ts'
import JSONResponse from '../../utils/constructs/api/response.ts'
import SignInMobileView from './device-views/sign-in-mobile-view.tsx'
import { SignInFormProvider, useSignInForm } from './utils/sign-in-form.ts'
import { SignInForm } from './utils/types.ts'



/**
 * The sign-in route for the Flying Tigers Team Portal.
 *
 * This route renders a sign-in form, which is submitted to the API
 * when the user clicks the "Sign In" button. If the request is successful,
 * the user is redirected to the specified route.
 *
 * @returns A JSX element representing the sign-in route.
 */
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

	/**
	 * Handles the submission of the sign-in form.
	 *
	 * Submits a sign-in request to the API with the provided
	 * form data. If the request is successful, shows a success 
	 * notification and redirects to the specified route.
	 *
	 * @param data - The sign in form data.
	 */
	async function handleSubmit(data: SignInForm): Promise<void> {
		const res: JSONResponse = await new LoginRequest(data).submit()
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
			const data: LoginAPIResponseData = res.data as LoginAPIResponseData
			console.log(data)
			// dispatch(login(data))
			// navigate(auth.user?.login_redirect() as string)
			// navigate('/request/rst/new')
		}
	}

	return <>
		<form onSubmit={ form.onSubmit(handleSubmit) } style={ { width: '100%' } }>
			<SignInFormProvider form={ form }>
				{ isMobileOnly && <SignInMobileView /> }
			</SignInFormProvider>
		</form>
	</>

}