import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../store/main'
import { AuthState, login } from '../../store/slices/auth'
import server from '../axios/axiosConfig'
import JSONResponse from '../constructs/api/response'



interface Props {
    children: JSX.Element
}

async function authenticate() {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_AUTHENTICATE_ROUTE)
        return new JSONResponse({ data: res.data, status: res.status, error: undefined })
        // eslint-disable-next-line
    } catch (error: any) {
        console.log(error)
        return new JSONResponse({ data: undefined, status: error.status, error: error })
    }
}

export default function ProtectedRoute({ children }: Props): JSX.Element {
    const auth = useSelector((state: RootState): AuthState => state.auth)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect((): void => {
        if (!auth.dodid || !auth.role || !auth.platoon || !auth.squad) {
            authenticate().then((res: JSONResponse): void => {
                if (res.error) {
                    notifications.show({
                        position: 'top-center',
                        withCloseButton: false,
                        autoClose: 3000,
                        message: res.error,
                        color: 'red'
                    })
                    navigate('/sign-in')
                } else {
                    dispatch(login(res.data))
                    navigate(auth.dashboard_route as string)
                }

            })
        }
    }, [])

    return <>{children}</>
}