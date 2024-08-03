import React, { useState, useEffect } from 'react';

const PersonalDetails = ({ handleNext }) => {
    const [formData, setFormData] = useState({
        aadharNumber: '',
        name: '',
        email: '',
        mobileNumber: '',
        dob: '',
        age: '',
        gender: '',
        religion: '',
        casteCategory: '',
        isDomicile: false,
        haveCertificate: false,
        relationshipType: '',
        certificateNo: '',
        applicantName: '',
        authority: '',
        certificatePdf: '',
        workingOrStudent: '',
        disabled: false,
        adharLinkedWithBank: false,
        phoneLinkedWithBank: false,
        bankAccNo: '',
        ifsCode: '',
        branch: '',
    });

    useEffect(() => {
        // Load data from local storage when the component mounts
        const savedData = JSON.parse(localStorage.getItem('personalDetails'));
        if (savedData) {
            setFormData(savedData);
        }
    }, []);

    const handleNextClick = () => {
        // Save form data to local storage without validation
        localStorage.setItem('personalDetails', JSON.stringify(formData));
        handleNext(); // Move to the next section
    };

    const formatAadharNumber = (value) => {
        const cleanedValue = value.replace(/\D/g, '');
        const match = cleanedValue.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
        if (match) {
            return match.slice(1).filter((group) => group !== '').join('-');
        }
        return cleanedValue;
    };

    const handleAadharNumberChange = (e) => {
        const cleanedValue = e.target.value.replace(/\D/g, '');
        if (cleanedValue.length <= 12) {
            const formattedAadharNumber = formatAadharNumber(cleanedValue);
            setFormData({
                ...formData,
                aadharNumber: formattedAadharNumber,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleMobileNumberChange = (e) => {
        const mobileNumber = e.target.value.replace(/\D/g, '');
        if (mobileNumber.length <= 10) {
            setFormData({
                ...formData,
                mobileNumber: mobileNumber,
            });
        }
    };

    const handleAgeChange = (e) => {
        const age = e.target.value.replace(/\D/g, '');
        setFormData({
            ...formData,
            age: age,
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-5">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Aadhar Number */}
                <div>
                    <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                        Aadhar Number
                    </label>
                    <input
                        id="aadharNumber"
                        name="aadharNumber"
                        type="text"
                        value={formData.aadharNumber}
                        onChange={handleAadharNumberChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Aadhar Number"
                    />
                </div>

                {/* Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Applicant Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Name"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Email"
                    />
                </div>

                {/* Mobile Number */}
                <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                        Mobile Number
                    </label>
                    <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="text"
                        value={formData.mobileNumber}
                        onChange={handleMobileNumberChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Mobile Number"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                {/* Age */}
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                    </label>
                    <input
                        id="age"
                        name="age"
                        type="text"
                        value={formData.age}
                        onChange={handleAgeChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Age"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                    </label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Religion */}
                <div>
                    <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
                        Religion
                    </label>
                    <input
                        id="religion"
                        name="religion"
                        type="text"
                        value={formData.religion}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Religion"
                    />
                </div>

                {/* Caste Category */}
                <div>
                    <label htmlFor="casteCategory" className="block text-sm font-medium text-gray-700">
                        Caste Category
                    </label>
                    <input
                        id="casteCategory"
                        name="casteCategory"
                        type="text"
                        value={formData.casteCategory}
                        onChange={handleChange}
                        autoComplete="off"
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter Caste Category"
                    />
                </div>
            </div>

            {/* Navigation Button */}
            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PersonalDetails;
