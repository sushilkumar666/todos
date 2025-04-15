import React, { ChangeEvent, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, UseDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { login } from '../redux/slices/userSlice';
function Auth() {
    const location = useLocation();
    // console.log(location.pathname + " this is my current location");
    const path = location.pathname;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    interface IFormData {
        email: string,
        password: string
    }

    const [formData, setFormData] = useState<IFormData>({
        email: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        if (path == '/login') {
            const { data } = await axios.post('http://localhost:3000/api/user/login', { email: formData.email, password: formData.password }, { withCredentials: true });
            // console.log(data?.success)
            if (data.success) {
                dispatch(login());
                navigate('/')
            }
        } else {
            const { data } = await axios.post('http://localhost:3000/api/user/register', { email: formData.email, password: formData.password }, { withCredentials: true });
            // console.log(data?.success)
            if (data.success) {
                dispatch(login());

                navigate('/login')
            }
        }
    }

    return (
        <>
            <div className='text-3xl mb-5'>{path == '/login' ? "Login" : "Sign up"}</div>
            <div className='flex flex-col'>
                <input required={true} name='email' onChange={handleChange} value={formData.email} className='border-white px-2 border-1 my-2 rounded-sm' type="text" placeholder='Enter Email' />
                <input required={true} name='password' value={formData.password} onChange={handleChange} className='border-white px-2 border-1 my-2 rounded-sm' type="password" placeholder='Enter password ' />
                <button className='px-2 py-1 bg-blue-600 text-white rounded-sm' onClick={handleSubmit}> {path == '/login' ? 'login' : 'signup'} </button>
            </div>
        </>
    )
}

export default Auth