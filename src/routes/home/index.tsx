import { useDocumentTitle } from '@mantine/hooks'
import DesktopComponent from '../../utils/components/desktop-component.tsx'
import MobileComponent from '../../utils/components/mobile-component.tsx'
import TabletComponent from '../../utils/components/tablet-component.tsx'



export default function HomeRoute() {
	useDocumentTitle('')

	return <>
		<DesktopComponent><div/></DesktopComponent>
		<TabletComponent><div/></TabletComponent>
		<MobileComponent><div/></MobileComponent>
	</>
}