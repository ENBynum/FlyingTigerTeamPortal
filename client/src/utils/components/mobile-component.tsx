import { ReactNode } from 'react'
import { isMobileOnly } from 'react-device-detect'



interface Props {
	children: ReactNode
}

export default function MobileComponent({ children }: Props) {
	const viewport: HTMLMetaElement | null = document.querySelector('meta[name="viewport"]')
	if (viewport) {
		viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, allow-user-scalable=no'
	}

	return <>{isMobileOnly && children}</>
}