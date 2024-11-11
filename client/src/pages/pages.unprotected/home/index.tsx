import { isMobileOnly } from 'react-device-detect'

import { useDocumentTitle } from '@mantine/hooks'

import Page from '../../pages.layout'
import HomeMobile from './mobile'



export default function HomeRoute(): JSX.Element {
    useDocumentTitle('Home - Flying Tigers Team Portal')

    return <Page>
        {isMobileOnly ? <HomeMobile /> : <></>}
    </Page>
}