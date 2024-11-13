import { Card, LoadingOverlay } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetSoldierAbsences from '../../../../../services/soldier/get.soldier.absences.ts'

import { AppDispatch, AppState } from '../../../../app.store'
import { setRSTRequests } from '../../soldier.dashboard.slice'
import Header from './01_header.card.section'
import PendingCount from './02_absence_count.card.section.tsx'
import AllPending from './03_view_absence_requests.card.section.tsx'
import ViewAllToggle from './04_view_absence_requests_toggle.card.section.tsx'



export default function AbsenceRequests(): ReactNode {
	const dashboard = useSelector((state: AppState) => state.soldierDashboard)
	const dispatch = useDispatch<AppDispatch>()
	
	const [loading, setLoading] = useState<boolean>(true)
	
	useEffect(function (): void {
		setLoading(true)
		GetSoldierAbsences().then(function (res): void {
			if ('error' in res) {
				notifications.show({
					position: 'top-center',
					withCloseButton: false,
					autoClose: 3000,
					message: res.error,
					color: 'red'
				})
			} else {
				dispatch(setRSTRequests(res))
			}
		})
		setLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return <>
		<LoadingOverlay visible={loading}/>
		{!loading && <Card w={'100%'} h={'100%'} p={'1rem'} withBorder radius={'lg'} shadow={'xl'}>
			<Header/>
			<PendingCount/>
			{dashboard.viewAllRSTRequests && <AllPending/>}
			{dashboard.rstRequestCount !== 0 && <ViewAllToggle/>}
		</Card>}
	</>
}