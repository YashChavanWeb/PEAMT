import React, { useState } from 'react';

function AdminEntryForm() {
    const [formData, setFormData] = useState({
        college: '',
        exam: '',
        email: '',
        password: '',
        phone: '',
        description: ''
    });
    const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const dashboardPassword = import.meta.env.VITE_DASHBOARD_PASSWORD;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const confirmSubmit = (e) => {
        e.preventDefault();
        setShowSubmitConfirmation(true);
    };

    const handleSubmit = async () => {
        if (passwordInput !== dashboardPassword) {
            setPasswordError(true);
            return;
        }

        try {
            const response = await fetch('/api/form/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            console.log(data);
            setShowSubmitConfirmation(false);
            setPasswordInput('');
            setPasswordError(false);
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const cancelSubmit = () => {
        setShowSubmitConfirmation(false);
        setPasswordInput('');
        setPasswordError(false);
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center mb-8">Admin Entry Form</h1>
            <form className="space-y-6" onSubmit={confirmSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="college" className="block text-sm font-medium text-gray-700">College/Institution/Organization Name</label>
                        <input
                            type="text"
                            id="college"
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="exam" className="block text-sm font-medium text-gray-700">Exam Name</label>
                        <input
                            type="text"
                            id="exam"
                            name="exam"
                            value={formData.exam}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
                    ></textarea>
                </div>
                <div className="text-right">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Confirm Submission
                    </button>
                </div>
            </form>

            {showSubmitConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg font-semibold mb-4">Please enter the password to submit the form</p>
                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Enter password"
                            className="border border-gray-300 p-2 rounded-md w-full mb-4"
                        />
                        {passwordError && <p className="text-red-600 mb-4">Incorrect password. Please try again.</p>}
                        <div className="flex justify-end">
                            <button onClick={cancelSubmit} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md mr-4">
                                Cancel
                            </button>
                            <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminEntryForm;
