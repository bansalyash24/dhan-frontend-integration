import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const [cookies]=useCookies()
    if(cookies.token){
        return children
    }else return <Navigate to={'/auth'}></Navigate>
}

export default ProtectedRoute