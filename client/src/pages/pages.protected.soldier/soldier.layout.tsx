import { AspectRatio, Burger, Center, Container, Grid, Group, Image, Menu, Stack } from '@mantine/core'
import { NotificationData, notifications, useNotifications } from '@mantine/notifications'
import { CSSProperties, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import Authenticate from '../../services/auth/get.authenticate.ts'
import { AppDispatch, AppState } from '../app.store'
import { login } from '../auth.slice'
import Page from '../pages.layout'
import { routes } from '../routes'



interface Props {
	children: JSX.Element
}


export default function SoldierLayout({ children }: Props): JSX.Element {
	const header_height: CSSProperties['height'] = '4rem'
	const app_height: CSSProperties['height'] = `calc(100% - ${header_height})`
	
	const navigate = useNavigate()
	const notificationsState = useNotifications()
	const auth = useSelector((state: AppState) => state.auth)
	const dispatch = useDispatch<AppDispatch>()
	
	const [authorized, setAuthorized] = useState<boolean>(false)
	
	useEffect(function (): void {
		if (auth.dodid && auth.unit_level && auth.dashboard_route) {
			setAuthorized(true)
			if (!['Soldier', 'Squad', 'Platoon', 'Company'].includes(auth.unit_level)) {
				navigate(auth.dashboard_route)
			}
		} else {
			Authenticate().then(function (res): void {
				if ('error' in res) {
					const notification: NotificationData = {
						id: 'soldier.layout.failed.authentication',
						position: 'top-center',
						withCloseButton: false,
						message: res.error,
						color: 'red'
					}
					if (!notificationsState.notifications.includes(notification) && !notificationsState.queue.includes(notification)) {
						notifications.show(notification)
					}
					navigate('/sign-in')
				} else {
					dispatch(login(res))
					setAuthorized(true)
				}
			})
		}
	}, [])
	
	return <Page>
		{!authorized ? <div/> :
			<Stack w="100%" h="100%" justify="start" align="center" gap="0" p="0">
				<Header height={header_height}/>
				<Container fluid w={'100%'} h={app_height} p={0}>
					{children}
				</Container>
			</Stack>}
	</Page>
}


interface HeaderProps {
	height: CSSProperties['height']
}


function Header({ height }: HeaderProps): JSX.Element {
	return <>
		<Container fluid w={'100%'} h={height} px={'md'}>
			<Grid w={'100%'} h={'100%'}>
				<Grid.Col span={3}>
					<HeaderMenu/>
				</Grid.Col>
				<Grid.Col span={6}>
					<Center w={'100%'} h={'100%'} p={`calc(${height} * (1/5))`}>
						<AspectRatio ratio={1} w={'auto'} h={`calc(${height} * (3/5))`}>
							<Image src={'/reserves-seal.png'} w={`calc(${height} * (3/5))`}
								   h={`calc(${height} * (3/5))`}/>
						</AspectRatio>
					</Center>
				</Grid.Col>
			</Grid>
		</Container>
	</>
}

function HeaderMenu(): JSX.Element {
	const location = useLocation().pathname
	const navigate = useNavigate()
	const auth = useSelector((state: AppState) => state.auth)
	
	return <>
		<Group w={'100%'} h={'100%'} justify="start" align="center">
			<Menu shadow="xl">
				<Menu.Target>
					<Burger h={'90%'}/>
				</Menu.Target>
				<Menu.Dropdown>
					{!location.startsWith(routes.soldierDashboard.replace(':dodid', '')) && <Menu.Item
						onClick={() => navigate(routes.soldierDashboard.replace(':dodid', auth.dodid as string))}>
						Dashboard
					</Menu.Item>}
					{!location.startsWith(routes.soldierAbsenceSubmit.replace(':dodid', '')) && <Menu.Item
						onClick={() => navigate(routes.soldierAbsenceSubmit.replace(':dodid', auth.dodid as string))}>
						Submit RST Request
					</Menu.Item>}
				</Menu.Dropdown>
			</Menu>
		</Group>
	</>
}