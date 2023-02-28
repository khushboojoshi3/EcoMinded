import { useContext } from "react"
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"

export function ProtectedRoutes({children}) {
    const { user } = useContext(AuthContext);
    if (user === null || user === undefined)
        return <Navigate to="/" replace={true} />
    return <>{children }</>
}