import { Container, Group, ScrollArea, Stack } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'
import { ReactNode } from 'react'
import { useMobileOrientation } from 'react-device-detect'
import CancelConfirm from '../components/cancel_confirm.modal.tsx'
import ControlButtons from '../components/controls'
import Absence from './absence'
import AbsenceDates from './absence_dates'
import Makeup from './makeup'



export default function SoldierRSTSubmitMobile(): ReactNode {
	const { isPortrait, isLandscape } = useMobileOrientation()
	const { ref, width, height } = useElementSize()
	
	return <>
		<CancelConfirm/>
		{isPortrait &&
			<Stack w={'100%'} justify={'start'} align={'center'} gap={'1.5rem'} pt={0} px={'xs'} pb={'1.5rem'}>
				<AbsenceDates/>
				<Absence/>
				<Makeup/>
				<ControlButtons width={'100%'}/>
			</Stack>}
		{isLandscape && <Group w={'100%'} gap={'1rem'} pt={0} px={'xs'} pb={'1.5rem'}>
			<AbsenceDates reference={ref}/>
			<Container fluid miw={`calc(100% - ${width}px - 1rem)`} maw={`calc(100% - ${width}px - 1rem)`}
			           h={`${height}px`} p={0}>
				<ScrollArea miw={'100%'} h={'100%'} type={'scroll'} scrollbars={'y'} scrollHideDelay={0}>
					<Stack w={'100%'} justify={'center'} align={'center'} gap={'2rem'} pb={'2rem'}>
						<Absence/>
						<Makeup/>
						<ControlButtons width={'100%'}/>
					</Stack>
				</ScrollArea>
			</Container>
		</Group>}
	</>
}