import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../contexts/authContext'
import { useContext } from 'react'

const AuthRouter = () => {
    const auth = useContext(AuthContext)
    return auth.logined ? <Outlet /> : <Navigate to='/signIn' />
}
const GuesRouter = ()=>{
    const auth = useContext(AuthContext)
    return !auth.logined ? <Outlet /> : <Navigate to='/' />
}

export {AuthRouter,GuesRouter} 
