import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/UserProvider'
import Header from './Header';
function Layout() {

    const { authenticated } = useAuth();

    return (
        <>
            {authenticated ? <Header></Header> : ""}
            <Outlet />
        </>
    )
}

export default Layout