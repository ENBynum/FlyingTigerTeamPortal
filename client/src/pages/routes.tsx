import { createBrowserRouter } from 'react-router-dom'

import SoldierDashboardRoute from './pages.protected.soldier/soldier.dashboard'
import SoldierRSTSubmitRoute from './pages.protected.soldier/soldier.rst.submit'
import HomeRoute from './pages.unprotected/home'
import SignInRoute from './pages.unprotected/sign_in'



export const routes = {
    home: '/',
    signIn: '/sign-in',
    register: '/register',
    soldierDashboard: '/soldier/dashboard/:dodid',
    soldierRSTSubmit: '/soldier/rst/submit/:dodid'
}

const PortalRouter = createBrowserRouter([
    { path: routes.home, element: <HomeRoute /> },
    { path: routes.signIn, element: <SignInRoute /> },
    // Protected Routes - Soldier
    { path: routes.soldierDashboard, element: <SoldierDashboardRoute /> },
    { path: routes.soldierRSTSubmit, element: <SoldierRSTSubmitRoute /> }
])

export default PortalRouter