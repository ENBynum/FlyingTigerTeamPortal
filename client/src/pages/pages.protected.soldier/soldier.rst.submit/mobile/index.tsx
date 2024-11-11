import { useMobileOrientation } from 'react-device-detect'

import { Stack } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'

import AbsenceDates from '../components/absence_dates'



export default function SoldierRSTSubmitMobile(): JSX.Element {
    const { isPortrait, isLandscape } = useMobileOrientation()
    const { ref, width, height } = useElementSize()

    return <>
        {isPortrait && <Stack w={'100%'} mih={'100%'} justify={'start'} align={'center'} gap={'1.5rem'} pt={0} px={'xs'} pb={'1.5rem'}>
            <AbsenceDates reference={ref} size='md' />

        </Stack>}
    </>
}