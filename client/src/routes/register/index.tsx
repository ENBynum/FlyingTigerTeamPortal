import { TransformedValues } from '@mantine/form'
import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import RegisterRequest from '../../utils/constructs/api/register-request'
import { RankType } from '../../utils/types/profile'
import MobileView from './device-views/mobile'
import { RegisterFormProvider, useRegisterForm } from './utils/register-form'
import { RegisterForm } from './utils/types'



export default function RegisterRoute() {
	useDocumentTitle('Register - Flying Tigers Team Portal')
	const scroll = useWindowScroll()[1]
	
	useEffect(() => {
		scroll({ y: 0 })
	}, [scroll])
	
	const form = useRegisterForm({
		mode: 'uncontrolled',
		initialValues: {
			dodid: '',
			dodid_confirm: '',
			rank: '',
			last: '',
			first: '',
			middle: '',
			no_middle: false,
			email: '',
			phone: '',
			platoon: '',
			squad: '',
			password: '',
			password_confirm: ''
		},
		validateInputOnBlur: true,
		validate: {
			dodid: (value) => value && value.toString().length !== 10 && 'Invalid DoD ID',
			dodid_confirm: (value, values) => values.dodid.toString().length === 10 && value && value !== values.dodid && 'Does Not Match DoD ID',
			last: (value) => value && /\d/.test(value) && 'Cannot Contain Numbers',
			first: (value) => value && /\d/.test(value) && 'Cannot Contain Numbers',
			middle: (value, values) => !values.no_middle && /\d/.test(value as string) && 'Cannot Contain Numbers',
			email: (value) => value && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) && 'Invalid Email Address',
			phone: (value) => value && value.toString().length !== 10 && 'Invalid Phone Number',
			password: (value) => value && value.length < 8 ? 'Must Be At Least 8 Characters' : !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) && 'Must Contain Uppercase & Lowercase Letter(s), Number(s), & Special Character(s)',
			password_confirm: (value, values) => values.password && value && value !== values.password && 'Does Not Match Password'
		},
		transformValues: (values: RegisterForm) => ({
			dodid: values.dodid.toString(),
			rank: values.rank as RankType,
			name: {
				full: `${values.last}, ${values.first} ${values.middle}`.trim(),
				last: values.last,
				first: values.first,
				middle: values.middle
			},
			email: values.email.toLowerCase(),
			phone: `+1${values.phone}`,
			platoon: values.platoon,
			squad: values.squad,
			password: values.password
		})
	})
	
	function handleSubmit(data: TransformedValues<typeof form>) {
		// const res: JSONResponse = new RegisterRequest(data).submit()
		// if (res.error) {
		// 	notifications.show({
		// 		position: 'top-center',
		// 		withCloseButton: false,
		// 		autoClose: 3000,
		// 		message: res.error,
		// 		color: 'red'
		// 	})
		// } else {
		// 	navigate('/sign-in')
		// }
		const req = new RegisterRequest(data)
		console.log(req.doc())
	}
	
	return <>
		<RegisterFormProvider form={form}>
			<form
				id={'register-form'}
				onSubmit={form.onSubmit(handleSubmit)}
				style={{
					width: '100%',
					height: 'fit-content',
					paddingBottom: '2.5rem'
				}}
			>
				{isMobileOnly && <MobileView/>}
			</form>
		</RegisterFormProvider>
	</>
	
}