import { isMobileOnly } from 'react-device-detect'

import { useDocumentTitle } from '@mantine/hooks'

import SoldierLayout from '../soldier.layout'
import SoldierDashboardMobile from './mobile'



export default function SoldierDashboardRoute(): JSX.Element {
    useDocumentTitle('Dashboard - Flying Tigers Team Portal')

    return <SoldierLayout>
        {isMobileOnly ? <SoldierDashboardMobile /> : <div />}
    </SoldierLayout>
}