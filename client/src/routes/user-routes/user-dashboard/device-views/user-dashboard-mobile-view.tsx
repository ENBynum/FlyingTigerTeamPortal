import { useSelector } from 'react-redux'

import { Stack } from '@mantine/core'

import { RootState } from '../../../../store/main'
import { UserDashboardState } from '../../../../store/slices/user-dashboard'



export default function UserDashboardMobileView(): JSX.Element {
    const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
    }

    const dashboard = useSelector((state: RootState): UserDashboardState => state.user_dashboard)

    return <>
        <Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={'1.5rem'} pt={0} px={'xs'} pb={'1.5rem'}>
            {dashboard.pending_rst_requests.map(req => (
                <h1>{req}</h1>
            ))}
            <div>{dashboard.pending_rst_request_count}</div>
        </Stack>
    </>
}