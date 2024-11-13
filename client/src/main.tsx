import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/notifications/styles.css'

import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { store } from './pages/app.store'
import PortalRouter from './pages/routes'



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

createRoot(document.getElementById('root')!).render(<StrictMode>
	<Provider store={store}>
		<MantineProvider theme={theme} defaultColorScheme={'auto'}>
			<Notifications autoClose={3000}/>
			<RouterProvider router={PortalRouter}/>
		</MantineProvider>
	</Provider>
</StrictMode>)
