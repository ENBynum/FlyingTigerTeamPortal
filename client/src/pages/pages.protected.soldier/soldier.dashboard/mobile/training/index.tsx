import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card, LoadingOverlay } from '@mantine/core'
import { notifications } from '@mantine/notifications'

import { AppDispatch, AppState } from '../../../../app.store'
import { FetchTraining } from '../../services/get.training'
import { setTraining } from '../../soldier.dashboard.slice'
import Header from './01_header.card.section'
import NextDrill from './02_next_drill.card.section'
import AllDrills from './03_all_drill.card.section'
import ViewAllToggle from './04_view_all_toggle.card.section'



export default function UpcomingTraining(): JSX.Element {
    const dashboard = useSelector((state: AppState) => state.soldierDashboard)
    const dispatch = useDispatch<AppDispatch>()

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(function (): void {
        setLoading(true)
        FetchTraining().then(function (res): void {
            if ('error' in res) {
                notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: res.error, color: 'red' })
            } else {
                dispatch(setTraining(res.training))
            }
        })
        setLoading(false)
    }, [])

    return <>
        <LoadingOverlay visible={loading} />
        {!loading && <Card w={'100%'} h={'100%'} p={'1rem'} withBorder radius={'lg'} shadow={'xl'}>
            <Header />
            <NextDrill />
            {dashboard.viewAllDrills && <AllDrills />}
            {dashboard.allTrainingDates && <ViewAllToggle />}
        </Card>}
    </>
}