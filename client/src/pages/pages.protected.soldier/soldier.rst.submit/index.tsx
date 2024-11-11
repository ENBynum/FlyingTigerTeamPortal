import { useDocumentTitle } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AppDispatch, AppState } from '../../app.store'
import SoldierLayout from '../soldier.layout'
import SoldierRSTSubmitMobile from './mobile'
import { FetchTraining } from './services/get.training'
import { SubmitRequest } from './services/post.rst_request.ts'
import { RSTForm, RSTFormProvider, useRSTForm } from './soldier.rst.submit.form'
import { setDrillDates } from './soldier.rst.submit.slice'



export default function SoldierRSTSubmitRoute(): JSX.Element {
	useDocumentTitle('New RST Request - Flying Tigers Team Portal')
	
	const auth = useSelector((state: AppState) => state.auth)
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	
	useEffect(function (): void {
		FetchTraining().then(function (res): void {
			if ('error' in res) {
				notifications.show({
					position: 'top-center',
					withCloseButton: false,
					autoClose: 3000,
					message: res.error,
					color: 'red'
				})
			} else {
				dispatch(setDrillDates(res.training))
			}
		})
	}, [])
	
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
		const res = await SubmitRequest(data)
		if (res) {
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
			navigate(auth.dashboard_route as string)
		}
	}
	
	return <SoldierLayout>
		<form onSubmit={form.onSubmit(handleSubmit)} style={{ width: '100%', height: '100%' }}>
			<RSTFormProvider form={form}>
				{isMobileOnly ? <SoldierRSTSubmitMobile/> : <div/>}
			</RSTFormProvider>
		</form>
	</SoldierLayout>
}