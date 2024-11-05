import { CSSProperties, useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'
import { useDispatch } from 'react-redux'

import { Container, ScrollArea, Stack } from '@mantine/core'
import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'

import { AppDispatch } from '../../../store/main'
import { setPendingRSTRequests } from '../../../store/slices/user-dashboard'
import Header from '../../../utils/components/header'
import JSONResponse from '../../../utils/constructs/api/response'
import { PendingUserRSTRequests } from './utils/user-dashboard-api'



export default function UserDashboardRoute(): JSX.Element {
    useDocumentTitle('Soldier Dashboard - Flying Tigers Team Portal')
    const headerHeight: CSSProperties['height'] = '5rem'
    const scroll = useWindowScroll()[1]
    const dispatch = useDispatch<AppDispatch>()

    useEffect(function (): void {
        scroll({ y: 0 })
    }, [])

    useEffect(function (): void {
        PendingUserRSTRequests().then(function (res: JSONResponse): void {
            if (res.error) {
                notifications.show({
                    position: 'top-center',
                    withCloseButton: false,
                    autoClose: 3000,
                    message: 'Not Authorized',
                    color: 'red'
                })
            } else {
                console.log(res.data)
                dispatch(setPendingRSTRequests(res.data))
            }
        })
    }, [])

    return <>
        <Container fluid w={'100vw'} h={'100vh'} p={0}>
            <Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={0} p={0}>
                <Header height={headerHeight} />
                <ScrollArea w='100%' mih={`calc(100% - ${headerHeight})`} scrollbars={'y'} type={'scroll'} scrollHideDelay={0}>
                    {isMobileOnly && <div />}
                </ScrollArea>
            </Stack>
        </Container>
    </>
}