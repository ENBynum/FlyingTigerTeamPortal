import { useEffect } from 'react'
import { useMobileOrientation } from 'react-device-detect'

import { Container, Group, ScrollArea, Stack } from '@mantine/core'
import { useElementSize } from '@mantine/hooks'

import { FormButtons, RSTAbsence, RSTAbsenceDate, RSTMakeUp } from './components/mobile'



export default function MobileView() {
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}
	const { isPortrait, isLandscape } = useMobileOrientation()
	const { ref, width, height } = useElementSize()
	
	useEffect(() => {
		console.log(width, height)
	}, [height, width])
	
	return <>
		{isPortrait && <Stack
			w={'100%'}
			mih={'100%'}
			justify={'start'}
			align={'center'}
			gap={'1.5rem'}
			pt={0}
			px={'xs'}
			pb={'1.5rem'}
		>
			<RSTAbsenceDate reference={ref}/>
			<RSTAbsence/>
			<RSTMakeUp/>
			<FormButtons/>
		</Stack>}
		{isLandscape && <Group w={'100%'} gap={'1rem'} pt={0} px={'xs'} pb={'1.5rem'}>
			<RSTAbsenceDate reference={ref}/>
			<Container
				fluid
				miw={`calc(100% - ${width}px - 1rem)`}
				maw={`calc(100% - ${width}px - 1rem)`}
				h={`${height}px`}
				p={0}
			>
				<ScrollArea
					miw={'100%'}
					h={'100%'}
					type={'scroll'}
					scrollbars={'y'}
					scrollHideDelay={0}
				>
					<Stack
						w={'100%'}
						justify={'center'}
						align={'center'}
						gap={'2rem'}
						pb={'2rem'}
					>
						<RSTAbsence/>
						<RSTMakeUp/>
						<FormButtons/>
					</Stack>
				</ScrollArea>
			</Container>
		</Group>}
	</>
}