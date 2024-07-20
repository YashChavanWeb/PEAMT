import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            if (data.success === false) {
                setError(data.message || 'Signup failed');
                setLoading(false);
            } else {
                // Signup successful
                console.log('Signup successful:', data);
            }

        } catch (error) {
            console.error('Sign up error:', error.message);
            setError('Something went wrong. Please try again.');
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-3 mx-auto max-w-lg'>
            <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" name="username" placeholder='Username' value={formData.username} onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' required />
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' required />
                <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' required />
                <button disabled={loading} type='submit' className='text-white bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Already have an account</p>
                <Link to='/sign-in'>
                    <span className='text-blue-500'>Log In</span>
                </Link>
            </div>

            {error && <p className='text-red-600 mt-5'>{error}</p>}
        </div>
    );
}

export default SignUp;
