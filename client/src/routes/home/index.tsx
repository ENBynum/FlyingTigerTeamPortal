import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'
import { useEffect } from 'react'
import DesktopComponent from '../../utils/components/desktop-component.tsx'
import MobileComponent from '../../utils/components/mobile-component.tsx'
import TabletComponent from '../../utils/components/tablet-component.tsx'
import HomeMobileView from './device-views/mobile.tsx'



export default function HomeRoute() {
	useDocumentTitle('Home - Flying Tigers Team Portal')
	const scroll = useWindowScroll()[1]
	
	useEffect(() => {
		scroll({ y: 0 })
	}, [scroll])
	
	return <>
		<DesktopComponent>
			<div/>
		</DesktopComponent>
		<TabletComponent>
			<div/>
		</TabletComponent>
		<MobileComponent><HomeMobileView/></MobileComponent>
	</>
}