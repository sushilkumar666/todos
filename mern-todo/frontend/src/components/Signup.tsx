import React, { useState } from 'react'
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

    interface formType {
        name: string,
        email: string,
        password: string
    }

    const navigate = useNavigate();
    const [formData, setFormData] = useState<formType>({ name: "", email: "", password: "" });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(formData)

        const { data } = await axios.post(`${BACKEND_URL}/api/user/createuser`, formData, { withCredentials: true })
        if (data.success) {
            navigate('/login')
        }
    }
    return (
        <>
            <div>Signup</div>
            <div className=''>

                <div className=' mx-auto px-40 py-40 border-1 border-gray-200  rounded   '>
                    <input name='name' value={formData?.name} onChange={handleChange} placeholder='Enter your name' className='border-1 mb-2' type="text" /> <br />
                    <input name='email' value={formData?.email} onChange={handleChange} placeholder='Enter your email' className='border-1 mb-2' type="text" /> <br />
                    <input name='password' value={formData?.password} onChange={handleChange} placeholder='Enter you password' className='border-1 mb-2' type="password" /> <br />
                    <button onClick={handleSubmit} className='bg-blue-600 text-white px-2 py-1 rounded-sm' >sign in</button>
                </div>

            </div>
        </>
    )
}

export default Signup