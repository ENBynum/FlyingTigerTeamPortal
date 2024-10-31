import { createTheme, MantineProvider } from '@mantine/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store/main.ts'



const theme = createTheme({
	fontSizes: {
		xs: '12px', sm: '14px', md: '16px', lg: '18px', xl: '20px'
	},
	fontFamily: 'Roboto, sans-serif',
	fontFamilyMonospace: 'Roboto, sans-serif',
	headings: { fontFamily: 'Roboto, sans-serif' }
})

const router = createBrowserRouter([])

createRoot(document.getElementById('root')!).render(<StrictMode>
	<Provider store={store}>
		<MantineProvider theme={theme} defaultColorScheme={'auto'}>
			<RouterProvider router={router}/>
		</MantineProvider>
	</Provider>
</StrictMode>)
