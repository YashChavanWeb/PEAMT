import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <div className='bg-slate-200'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold'>Auth App</h1>
                </Link>
<<<<<<< Updated upstream
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li>About</li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
                        ) : (
                            <li>Sign In</li>
                        )}
                    </Link>
=======
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
>>>>>>> Stashed changes
                </ul>
            </div>
        </div>
    );
}