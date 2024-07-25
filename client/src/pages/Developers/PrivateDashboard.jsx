import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PrivateDashboard() {
    const [admins, setAdmins] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
    const [adminToDelete, setAdminToDelete] = useState(null); // State to store admin to be deleted
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false); // State to handle deletion in progress

    const navigate = useNavigate();
    const privatePassId = import.meta.env.VITE_PRIVATE_DASHBOARD_ID;
    const dashboardPassword = import.meta.env.VITE_DASHBOARD_PASSWORD; // Assuming the password is stored in environment variables

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('/api/form/admins');
                setAdmins(response.data.data);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };

        fetchAdmins();
    }, []);

    const handleNavigateToForm = () => {
        navigate(`/private-dashboard/${privatePassId}/admin-entry`);
    };

    const handleDeleteAdmin = async (id) => {
        if (password !== dashboardPassword) {
            setPasswordError(true);
            return;
        }

        setIsDeleting(true); // Indicate that deletion is in progress
        try {
            await axios.delete(`/api/form/admins/${id}`);
            setAdmins(admins.filter(admin => admin._id !== id));
            setPassword(''); // Clear password field
            setPasswordError(false); // Clear password error
        } catch (error) {
            console.error('Error deleting admin:', error);
        } finally {
            setIsDeleting(false); // Reset deletion in progress
            setAdminToDelete(null); // Reset adminToDelete after deletion attempt
            setShowConfirmation(false); // Hide confirmation dialog
        }
    };

    const confirmDelete = (id) => {
        setAdminToDelete(id); // Set admin to be deleted
        setShowConfirmation(true); // Show confirmation dialog
    };

    const cancelDelete = () => {
        setAdminToDelete(null); // Reset adminToDelete
        setShowConfirmation(false); // Hide confirmation dialog
        setPassword(''); // Clear password field
        setPasswordError(false); // Clear password error
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center mb-8">Private Dashboard</h1>
            <button onClick={handleNavigateToForm} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                Go to Admin Entry Form
            </button>
            <table className="min-w-full mt-8 bg-white border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-gray-200">College</th>
                        <th className="px-4 py-2 border border-gray-200">Exam</th>
                        <th className="px-4 py-2 border border-gray-200">Email</th>
                        <th className="px-4 py-2 border border-gray-200">Phone</th>
                        <th className="px-4 py-2 border border-gray-200">Description</th>
                        <th className="px-4 py-2 border border-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin._id}>
                            <td className="px-4 py-2 border border-gray-200">{admin.college}</td>
                            <td className="px-4 py-2 border border-gray-200">{admin.exam}</td>
                            <td className="px-4 py-2 border border-gray-200">{admin.email}</td>
                            <td className="px-4 py-2 border border-gray-200">{admin.phone}</td>
                            <td className="px-4 py-2 border border-gray-200">{admin.description}</td>
                            <td className="px-4 py-2 border border-gray-200">
                                <button onClick={() => confirmDelete(admin._id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Confirmation Dialog */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg font-semibold mb-4">Are you sure you want to delete this admin?</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        />
                        {passwordError && <p className="text-red-600 mb-4">Incorrect password. Please try again.</p>}
                        <div className="flex justify-end">
                            <button onClick={cancelDelete} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md mr-4">
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteAdmin(adminToDelete)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md"
                                disabled={isDeleting} // Disable button during deletion
                            >
                                {isDeleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PrivateDashboard;
