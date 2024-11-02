import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RequestRSTRoute from './routes/__user-routes/request-rst'
import HomeRoute from './routes/home'
import RegisterRoute from './routes/register'
import SignInRoute from './routes/sign-in'
import { store } from './store/main'



const theme = createTheme({
	fontSizes: {
		xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px'
	},
	fontFamily: 'Roboto, sans-serif',
	fontFamilyMonospace: 'Roboto, sans-serif',
	headings: { fontFamily: 'Roboto, sans-serif' },
	colors: {
		deepBlue: ['#f3edff', '#e0d7fa', '#beabf0', '#9a7de6', '#7c55de', '#693cd9', '#5f30d8', '#4f23c0', '#461eac', '#3b1898']
	},
	primaryColor: 'deepBlue'
})

const router = createBrowserRouter([
	{ path: '/', element: <HomeRoute/> },
	{ path: '/sign-in', element: <SignInRoute/> },
	{ path: '/register', element: <RegisterRoute/> },
	// Protected Routes - User
	{ path: '/request/rst/new', element: <RequestRSTRoute/> }
])

createRoot(document.getElementById('root')!).render(<StrictMode>
	<Provider store={store}>
		<MantineProvider theme={theme} defaultColorScheme={'auto'}>
			<Notifications/>
			<RouterProvider router={router}/>
		</MantineProvider>
	</Provider>
</StrictMode>)
