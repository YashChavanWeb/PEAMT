import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInFailure, signInSuccess } from '../../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());

            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sign in failed');
            }

            if (data.success === false) {
                if (data.errorType === 'user_not_found') {
                    throw new Error('User not found. Please check your credentials.');
                } else if (data.errorType === 'wrong_credentials') {
                    throw new Error('Incorrect password. Please try again.');
                } else {
                    throw new Error(data.message || 'Sign in failed');
                }
            }

            dispatch(signInSuccess(data));
            console.log('Sign in successful:', data);
            navigate('/');

        } catch (error) {
            console.error('Sign in error:', error.message);
            dispatch(signInFailure(error.message));
        }
    };

    return (
        <div className='p-3 mx-auto max-w-lg'>
            <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' required />
                <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} className='bg-slate-100 p-3 rounded-lg' required />
                <button disabled={loading} type='submit' className='text-white bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Don't have an account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>

            {error && <p className='text-red-600 mt-5'>{error}</p>}
        </div>
    );
}

export default SignIn;
