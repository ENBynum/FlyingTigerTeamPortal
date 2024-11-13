import { Container, Group, Stack, Title } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { CSSProperties, ReactNode, useEffect } from 'react'



interface Props {
	children: ReactNode
}


export default function Page({ children }: Props): ReactNode {
	const banner_height: CSSProperties['height'] = '2rem'
	const app_height: CSSProperties['height'] = `calc(100% - ${banner_height})`
	
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}
	
	const scroll = useWindowScroll()[1]
	useEffect(function (): void {
		scroll({ y: 0 })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return <>
		<Container fluid w="100vw" h="100vh" p="0">
			<Stack w="100%" h="100%" justify="start" align="center" gap="0" p="0">
				<CUIBanner height={banner_height}/>
				<Container fluid w={'100%'} h={app_height} p={0} pt={banner_height}>
					{children}
				</Container>
			</Stack>
		</Container>
	</>
}


interface BannerProps {
	height: CSSProperties['height']
}


function CUIBanner({ height }: BannerProps): ReactNode {
	return <>
		<Container fluid w={'100%'} h={height} p={0} bg={'grape'} pos={'fixed'} style={{ zIndex: 1 }}>
			<Group w={'100%'} h={'100%'} justify={'center'} align={'center'}>
				<Title order={6}>Controlled Unclassified Information (CUI)</Title>
			</Group>
		</Container>
	</>
}