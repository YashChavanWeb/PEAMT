import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <div className='bg-transparent h-20 fixed top-0 left-0 right-0 z-10 backdrop-blur-lg'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-4xl text-white'>TestOPs</h1>
                </Link>
                <ul className='flex gap-16 items-end'>
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
                    <button className='button'>
                        <Link to='/profile'>
                            {currentUser ? (
                                <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
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
