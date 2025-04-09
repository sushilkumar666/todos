import React, { useState } from 'react'
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {



    interface formType {
        email: string,
        password: string
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState<formType>({ email: "", password: "" });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)

        const { data } = await axios.post(`${BACKEND_URL}/api/user/login`, formData)
        if (data.success) {
            navigate('/')
        }
    }
    return (
        <>
            <div>signin</div>
            <div className=''>

                <div className=' mx-auto px-40 py-40 border-1 border-gray-200  rounded   '>
                    <input name='email' value={formData?.email} onChange={handleChange} placeholder='Enter your email' className='border-1 mb-2' type="text" /> <br />
                    <input name='password' value={formData?.password} onChange={handleChange} placeholder='Enter you password' className='border-1 mb-2' type="password" /> <br />
                    <button onClick={handleSubmit} className='bg-blue-600 text-white px-2 py-1 rounded-sm' >sign in</button>
                </div>

            </div>
        </>
    )
}

export default Signin