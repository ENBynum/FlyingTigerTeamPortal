import { CSSProperties, useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'

import { Container, ScrollArea, Stack } from '@mantine/core'
import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'

import Header from '../../utils/components/header'
import ProtectedRoute from '../../utils/components/protected-route'
import { MobileLayout } from './device-layouts'



export default function SoldierDashboardRoute(): JSX.Element {
    useDocumentTitle('Soldier Dashboard - Flying Tigers Team Portal')
    const headerHeight: CSSProperties['height'] = '5rem'
    const scroll = useWindowScroll()[1]

    useEffect(function (): void {
        scroll({ y: 0 })
    }, [])

    return <ProtectedRoute unit_level={'Soldier'}>
        <Container fluid w={'100vw'} h={'100vh'} p={0}>
            <Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={0} p={0}>
                <Header height={headerHeight} />
                <ScrollArea w='100%' mih={`calc(100% - ${headerHeight})`} scrollbars={'y'} type={'scroll'} scrollHideDelay={0}>
                    {isMobileOnly && <MobileLayout />}
                </ScrollArea>
            </Stack>
        </Container>
    </ProtectedRoute>
}