import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../redux/store';
function ProtectedRoute({ children }: { children: ReactNode }) {
    const authenticated = useSelector((state: RootState) => state.userSlice.authenticated);
    // console.log(authenticated + " this is value of authenticated")
    return (
        authenticated ? <>
            {children}
        </> : <Navigate to="/login" />
    )
}

export default ProtectedRoute