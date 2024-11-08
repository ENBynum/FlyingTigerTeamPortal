import { useSelector } from 'react-redux'

import { Stack } from '@mantine/core'

import { RootState } from '../../../../store/main'
import { UserDashboardState } from '../../../../store/slices/user-dashboard'
import { UserDashboardNextBattleAssembly } from './components/user-dashboard-mobile-components'



export default function UserDashboardMobileView(): JSX.Element {
    const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
    }

    const dashboard = useSelector((state: RootState): UserDashboardState => state.user_dashboard)

    return <>
        <Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={'1.5rem'} pt={0} px={'xs'} pb={'1.5rem'}>
            <UserDashboardNextBattleAssembly />
        </Stack>
    </>
}