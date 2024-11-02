import { ReactNode } from 'react'
import { isDesktop } from 'react-device-detect'



interface Props {
	children: ReactNode
}

export default function DesktopComponent({ children }: Props) {
	return <>{isDesktop && children}</>
}