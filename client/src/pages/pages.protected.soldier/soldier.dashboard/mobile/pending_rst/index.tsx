import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card, LoadingOverlay } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { AppDispatch, AppState } from '../../../../app.store'
import FetchPendingRST from '../../services/get.pending_rst_requests'
import { setPendingRST } from '../../soldier.dashboard.slice'
import Header from './01_header.card.section'
import PendingCount from './02_pending_request_count.card.section'
import AllPending from './03_view_pending_requests.card.section'
import ViewAllToggle from './04_view_pending_requests_toggle.card.section'



export default function PendingRST(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)
    const dispatch = useDispatch<AppDispatch>()

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(function (): void {
        setLoading(true)
        FetchPendingRST().then(function (res): void {
            if ('error' in res) {
                notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: res.error, color: 'red' })
            } else {
                dispatch(setPendingRST(res.requests))
            }
        })
        setLoading(false)
    }, [])

    return <>
        <LoadingOverlay visible={loading} />
        {!loading && <Card w={'100%'} h={'100%'} p={'1rem'} withBorder radius={'lg'} shadow={'xl'}>
            <Header />
            <PendingCount />
            {dashboard.viewAllPendingRST && <AllPending />}
            {dashboard.pendingRSTCount !== 0 && <ViewAllToggle />}
        </Card>}
    </>
}