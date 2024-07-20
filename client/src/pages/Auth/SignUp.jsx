import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div className='p-3 mx-auto max-w-lg'>
            <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>

            <form className='flex flex-col gap-4'>
                <input type="text" id='username' placeholder='username' className='bg-slate-100 p-3 rounded-lg' />
                <input type="email" id='email' placeholder='email' className='bg-slate-100 p-3 rounded-lg' />
                <input type="password" id='password' placeholder='password' className='bg-slate-100 p-3 rounded-lg' />
                <button className='text-white bg-slate-700 p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
            </form>

            <div className='flex gap-2 mt-5'>
                <p>Already have an account</p>
                <Link to='/sign-in'>
                    <span className='text-blue-500'>Login In</span>
                </Link>
            </div>

        </div>
    )
}

export default SignUp
