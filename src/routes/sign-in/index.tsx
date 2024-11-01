import { useDocumentTitle } from '@mantine/hooks'
import { isMobileOnly } from 'react-device-detect'
import { LoginFormProvider, useLoginForm } from './components/shared.ts'
import MobileView from './device-views/mobile.tsx'



export default function SignInRoute() {
	useDocumentTitle('Sign In - Flying Tigers Team Portal')

	const form = useLoginForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			password: ''
		}
	})

	return <>
		<LoginFormProvider form={form}>
			{isMobileOnly && <MobileView/>}
		</LoginFormProvider>
	</>

}