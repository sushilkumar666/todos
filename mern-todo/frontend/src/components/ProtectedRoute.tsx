import React, { ReactNode } from 'react'
import { useAuth } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { authenticated } = useAuth();
    const navigate = useNavigate();

    if (!authenticated) {
        navigate('/login')
    }
    return (
        <>
            {children}

        </>
    )
}

export default ProtectedRoute