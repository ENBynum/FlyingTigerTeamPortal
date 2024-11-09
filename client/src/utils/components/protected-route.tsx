import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { notifications } from '@mantine/notifications'

import { AppDispatch, RootState } from '../../store/main'
import { AuthState, login } from '../../store/slices/auth'
import server from '../axios/axiosConfig'



interface Props {
    children: JSX.Element
    unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}

interface APIReturn {
    dodid: string
    unit_level: 'Soldier' | 'Squad' | 'Platoon' | 'Company'
}

interface Response {
    data?: APIReturn
    status: number
    error?: string
}

async function authenticate(): Promise<Response> {
    try {
        const res = await server.get(import.meta.env.VITE_SERVER_DOMAIN + import.meta.env.VITE_SERVER_AUTHENTICATE_ROUTE)
        return { data: res.data, status: res.status }
        // eslint-disable-next-line
    } catch (error: any) {
        console.log(error)
        return { status: error.status, error: error }
    }
}

export default function ProtectedRoute({ children, unit_level }: Props): JSX.Element {
    const auth = useSelector((state: RootState): AuthState => state.auth)
    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    useEffect(function (): void {
        if (auth.dodid && auth.unit_level) {
            if (auth.unit_level !== unit_level) navigate(auth.dashboard_route as string)
        } else {
            authenticate().then(function (res: Response): void {
                if (res.error) {
                    notifications.show({ position: 'top-center', withCloseButton: false, autoClose: 3000, message: 'Not Authenticated', color: 'red' })
                    navigate('/sign-in')
                } else {
                    dispatch(login(res.data as APIReturn))
                }
            })
        }
    }, [])

    return <>{children}</>
}