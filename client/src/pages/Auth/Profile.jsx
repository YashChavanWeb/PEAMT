import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut } from '../../redux/user/userSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const { currentUser, loading, error } = useSelector((state) => state.user);
    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, profilePicture: downloadURL })
                );
            }
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error));
        }
    };

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error));
        }
    };

    const handleSignOut = async () => {
        try {
            await fetch('/api/auth/signout');
            dispatch(signOut())
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg'>
            <h1 className='text-3xl font-semibold text-center mb-8'>Profile</h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='relative'>
                    <input
                        type='file'
                        ref={fileRef}
                        hidden
                        accept='image/*'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <img
                        src={formData.profilePicture || currentUser.profilePicture}
                        alt='profile'
                        className='h-32 w-32 mx-auto rounded-full border-4 border-gray-300 object-cover cursor-pointer hover:border-gray-500 transition-all'
                        onClick={() => fileRef.current.click()}
                    />
                    <p className='text-center mt-2'>
                        {imageError ? (
                            <span className='text-red-600'>
                                Error uploading image (file size must be less than 2 MB)
                            </span>
                        ) : imagePercent > 0 && imagePercent < 100 ? (
                            <span className='text-gray-600'>{`Uploading: ${imagePercent}%`}</span>
                        ) : imagePercent === 100 ? (
                            <span className='text-green-600'>Image uploaded successfully</span>
                        ) : (
                            ''
                        )}
                    </p>
                </div>
                <input
                    defaultValue={currentUser.username}
                    type='text'
                    id='username'
                    placeholder='Username'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors'
                    onChange={handleChange}
                />
                <input
                    defaultValue={currentUser.email}
                    type='email'
                    id='email'
                    placeholder='Email'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors'
                    onChange={handleChange}
                />
                <button 
                    type='submit'
                    className='w-full bg-blue-600 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition-colors disabled:opacity-80'
                >
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </form>
            <div className='flex justify-between mt-6'>
                <span
                    onClick={handleDeleteAccount}
                    className='text-red-600 cursor-pointer hover:underline'
                >
                    Delete Account
                </span>
                <span 
                    onClick={handleSignOut} 
                    className='text-red-600 cursor-pointer hover:underline'
                >
                    Sign out
                </span>
            </div>
            {error && <p className='text-red-600 mt-4 text-center'>{'Something went wrong!'}</p>}
            {updateSuccess && <p className='text-green-600 mt-4 text-center'>{'User updated successfully!'}</p>}
        </div>
    );
}
