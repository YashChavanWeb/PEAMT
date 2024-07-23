import React, { useState } from 'react';

function PrivateDashboard() {
    const [formData, setFormData] = useState({
        college: '',
        exam: '',
        email: '',
        phone: '',
        description: '',
        verification: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            // Optionally handle success message or redirect
        } catch (error) {
            console.error('Error submitting form:', error.message);
            // Handle error
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-center mb-8">Application Form</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="college" className="block text-sm font-medium text-gray-700">College/Institution/Organization Name</label>
                        <input type="text" id="college" name="college" value={formData.college} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="exam" className="block text-sm font-medium text-gray-700">Exam Name</label>
                        <input type="text" id="exam" name="exam" value={formData.exam} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm" />
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea id="description" name="description" rows="3" value={formData.description} onChange={handleChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"></textarea>
                </div>
                <div>
                    <label htmlFor="verification" className="block text-sm font-medium text-gray-700">Verification Certificate</label>
                    <div className="mt-1 flex items-center">
                        <span className="inline-block bg-gray-100 py-2 px-3 rounded-md text-sm font-medium text-gray-700">Upload a scanned copy</span>
                        <input type="file" id="verification" name="verification" className="sr-only" />
                    </div>
                </div>
                <div className="text-right">
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit Application</button>
                </div>
            </form>
        </div>
    );
}

export default PrivateDashboard;
