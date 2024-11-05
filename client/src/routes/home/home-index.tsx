import { useEffect } from 'react'
import { isMobileOnly } from 'react-device-detect'

import { useDocumentTitle, useWindowScroll } from '@mantine/hooks'

import HomeMobileView from './device-views/home-mobile-view'



/**
 * The home route component for the Flying Tigers Team Portal.
 *
 * This component sets the document title and manages the viewport
 * orientation and scroll position on mobile devices. It renders the
 * mobile view if the device is mobile.
 *
 * @returns The home route component.
 */
export default function HomeRoute(): React.JSX.Element
{
	useDocumentTitle('Home - Flying Tigers Team Portal')
	const scroll = useWindowScroll()[1]

	useEffect((): void =>
	{
		scroll({ y: 0 })
	}, [scroll])

	return <>
		{isMobileOnly && <HomeMobileView />}
	</>
}