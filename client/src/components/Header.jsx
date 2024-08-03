import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className='bg-cyan-200/10 h-20 fixed top-0 left-0 right-0 z-10 backdrop-blur-lg'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-4xl text-white'>TestOPs</h1>
                </Link>
                <ul className='flex gap-12 items-end'>
                    <button className='button'>
                        <Link to='/'>
                            <li>Home</li>
                        </Link>
                    </button>
                    <button className='button'>
                        <Link to='/about'>
                            <li>About</li>
                        </Link>
                    </button>
                    <button className='bg-sky-800 w-13 h-13 rounded-3xl p-1 hover:bg-cyan-600 hover:shadow-cyan-800/50 hover:font-bold transition transform hover:-translate-y-1 hover:scale-105'>
                        <Link to='/profile'>
                            {currentUser ? (
                                <img src={currentUser.profilePicture} alt='profile' className='h-10 w-10 rounded-full object-cover' />
                            ) : (
                                <li>Sign In</li>
                            )}
                        </Link>
                    </button>
                </ul>
            </div>
        </div>
    );
}
