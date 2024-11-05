import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Container, CSSProperties, ScrollArea, Stack } from '@mantine/core'
import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { RootState } from '../../../store/main'
import { AuthState } from '../../../store/slices/auth'
import Header from '../../../utils/components/header'
import JSONResponse from '../../../utils/constructs/api/response'
import MobileView from './device-views/new-rst-request-mobile-view'
import RSTRequest from './utils/new-rst-request-api'
import { RSTForm, RSTFormProvider, useRSTForm } from './utils/new-rst-request-form'



export default function RequestRSTRoute() {
	useDocumentTitle('RST Request - Flying Tigers Team Portal')
	const headerHeight: CSSProperties['height'] = '5rem'
	const scroll = useWindowScroll()[1]
	const navigate = useNavigate()

	const auth = useSelector((state: RootState): AuthState => state.auth)

	useEffect(() => {
		scroll({ y: 0 })
	}, [scroll])

	const form = useRSTForm({
		mode: 'uncontrolled',
		initialValues: {
			absence_dates: [null, null],
			absence_periods: undefined,
			absence_type: '',
			absence_reason: '',
			makeup_dates: [null, null],
			makeup_location: '',
			makeup_trainer: '',
			makeup_uniform: '',
			makeup_remarks: ''
		},
		validateInputOnBlur: true,
		validate: {
			absence_dates: value => value[0] && !value[1] && 'Select Absence End Dates',
			absence_reason: value => value && value.length < 15 && 'Reason Too Short',
			makeup_dates: value => value[0] && !value[1] && 'Select Make-Up End Dates'
		}
	})

	async function handleSubmit(data: RSTForm): Promise<void> {
		const res: JSONResponse = await new RSTRequest(data).submit()
		if (res.error) {
			notifications.show({
				position: 'top-center',
				withCloseButton: false,
				autoClose: 3000,
				message: res.error,
				color: 'red'
			})
			if (res.error === 'Not Authorized') {
				navigate('/sign-in')
			}
		} else {
			notifications.show({
				position: 'top-center',
				withCloseButton: false,
				autoClose: 3000,
				message: 'RST Request Submitted',
				color: 'green'
			})
			// navigate(`/dashboard/user/${auth.user?.dodid}`)
		}
		const req = new RSTRequest(data)
		console.log(req.doc())
	}

	return <>
		<RSTFormProvider form={form}>
			<Container fluid w={'100vw'} h={'100vh'} p={0}>
				<ScrollArea w={'100%'} mih={'100%'} scrollbars={'y'}>
					<Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={0} p={0}>
						<Header height={headerHeight} />
						<form
							onSubmit={form.onSubmit(handleSubmit)}
							style={{ width: '100%', minHeight: `calc(100% - ${headerHeight})` }}
						>
							{isMobileOnly && <MobileView />}
						</form>
					</Stack>
				</ScrollArea>
			</Container>
		</RSTFormProvider>
	</>
}