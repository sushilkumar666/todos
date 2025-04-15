import React from 'react'
import { useAuth } from '../context/UserProvider'

function Header() {

    const { logout } = useAuth();

    return (
        <div className='fixed top-0 w-full bg-orange-500'><button onClick={() => logout()} className='bg-blue-600 text-white px-2 py-1 rounded-sm mx-2 '>
            logout</button></div>
    )
}

export default Header