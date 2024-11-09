import { Stack } from '@mantine/core'

import { UpcomingTraining } from '../components/metric-cards/mobile'



export default function MobileLayout(): JSX.Element {
    const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
    if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
    }

    return <>
        <Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={'1.5rem'} pt={0} px={'xs'} pb={'1.5rem'}>
            <UpcomingTraining />
        </Stack>
    </>
}