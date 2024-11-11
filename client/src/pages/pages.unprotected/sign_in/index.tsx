import { useEffect } from 'react'
import { isDesktop, isMobileOnly } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useDocumentTitle } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { AppDispatch, AppState } from '../../app.store'
import { login } from '../../auth.slice'
import Page from '../../pages.layout'
import SignInDesktop from './desktop'
import SignInMobile from './mobile'
import { RequestSignIn } from './services/post.sign_in'
import { SignInForm, SignInFormProvider, useSignInForm } from './sign_in.form'



export default function SignInRoute(): JSX.Element {
    useDocumentTitle('Sign In - Flying Tigers Team Portal')
    const navigate = useNavigate()

    const auth = useSelector((state: AppState) => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(function (): void {
        if (auth.dashboard_route) navigate(auth.dashboard_route)
    }, [auth.dashboard_route])

    const form = useSignInForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        }
    })

    async function handleSubmit(data: SignInForm): Promise<void> {
        const res = await RequestSignIn(data)
        if ('error' in res) {
            notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: res.error, color: 'red' })
        } else {
            notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: 'Successfully Signed In', color: 'green' })
            dispatch(login(res))
        }
    }

    return <Page>
        <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%', height: '100%' }}>
            <SignInFormProvider form={form}>
                {isDesktop && <SignInDesktop />}
                {isMobileOnly && <SignInMobile />}
            </SignInFormProvider>
        </form>
    </Page>
}