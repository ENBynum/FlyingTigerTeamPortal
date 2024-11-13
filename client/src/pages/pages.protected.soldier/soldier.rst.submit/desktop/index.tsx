import { Card, ScrollArea, Stack } from '@mantine/core'
import CancelConfirm from '../components/cancel_confirm.modal.tsx'
import Controls from './controls'
import Header from './header'



export default function SoldierRSTSubmitDesktop() {
	return <>
		<ScrollArea w={'100%'} h={'100%'} scrollHideDelay={0} scrollbars={'y'} type={'scroll'}>
			<CancelConfirm/>
			<Stack w={'100%'} justify={'center'} align={'center'} gap={'2rem'}>
				<Card w={'40rem'}>
					<Header/>
					<Controls/>
				</Card>
			</Stack>
		</ScrollArea>
	</>
}