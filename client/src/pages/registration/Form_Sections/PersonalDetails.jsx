import React, { useState } from 'react';

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

    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);

    const handleNextClick = () => {
        if (validateForm()) {
            handleNext();
        } else {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000); // Hide the error message after 3 seconds
        }
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
            setErrors({
                ...errors,
                aadharNumber: ''
            });
        }
    };

    const handleMobileNumberChange = (e) => {
        const mobileNumber = e.target.value.replace(/\D/g, '');
        if (mobileNumber.length <= 10) {
            setFormData({
                ...formData,
                mobileNumber: mobileNumber,
            });
            setErrors({
                ...errors,
                mobileNumber: ''
            });
        }
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(name)) {
            setFormData({
                ...formData,
                name: name,
            });
            setErrors({
                ...errors,
                name: ''
            });
        }
    };

    const handleApplicantNameChange = (e) => {
        const applicantName = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(applicantName)) {
            setFormData({
                ...formData,
                applicantName: applicantName,
            });
            setErrors({
                ...errors,
                applicantName: ''
            });
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.aadharNumber || formData.aadharNumber.replace(/-/g, '').length !== 12) {
            isValid = false;
            formErrors["aadharNumber"] = "Aadhar Number must be exactly 12 digits.";
        }
        if (!formData.name) {
            isValid = false;
            formErrors["name"] = "Name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            isValid = false;
            formErrors["name"] = "Name must contain only letters and spaces.";
        }
        if (!formData.email) {
            isValid = false;
            formErrors["email"] = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            formErrors["email"] = "Email is invalid.";
        }
        if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
            isValid = false;
            formErrors["mobileNumber"] = "Mobile Number must be exactly 10 digits.";
        }
        if (!formData.dob) {
            isValid = false;
            formErrors["dob"] = "Date of Birth is required.";
        }
        if (!formData.age) {
            isValid = false;
            formErrors["age"] = "Age is required.";
        } else if (!/^\d+$/.test(formData.age)) {
            isValid = false;
            formErrors["age"] = "Age must be a valid number.";
        }
        if (!formData.gender) {
            isValid = false;
            formErrors["gender"] = "Gender is required.";
        }
        if (!formData.religion) {
            isValid = false;
            formErrors["religion"] = "Religion is required.";
        }
        if (!formData.casteCategory) {
            isValid = false;
            formErrors["casteCategory"] = "Caste Category is required.";
        }
        if (!formData.applicantName) {
            isValid = false;
            formErrors["applicantName"] = "Applicant Name is required.";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.applicantName)) {
            isValid = false;
            formErrors["applicantName"] = "Applicant Name must contain only letters and spaces.";
        }

        setErrors(formErrors);
        return isValid;
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Personal Information</h2>
            <hr className="mb-4" />

            {showError && (
                <div className="bg-red-500 text-white p-2 mb-4 rounded">
                    Please fill in all required fields correctly.
                </div>
            )}

            {/* Personal Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Form Fields */}
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Aadhar Number"
                        />
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleNameChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Applicant Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Email"
                        />
                    </div>
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Mobile Number"
                        />
                    </div>
                    <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                            Date of Birth
                        </label>
                        <input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input
                            id="age"
                            name="age"
                            type="text"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Age"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
                            Religion
                        </label>
                        <input
                            id="religion"
                            name="religion"
                            type="text"
                            value={formData.religion}
                            onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Religion"
                        />
                    </div>
                    <div>
                        <label htmlFor="casteCategory" className="block text-sm font-medium text-gray-700">
                            Caste Category
                        </label>
                        <input
                            id="casteCategory"
                            name="casteCategory"
                            type="text"
                            value={formData.casteCategory}
                            onChange={(e) => setFormData({ ...formData, casteCategory: e.target.value })}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Caste Category"
                        />
                    </div>
                    <div>
                        <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
                            Applicant Name
                        </label>
                        <input
                            id="applicantName"
                            name="applicantName"
                            type="text"
                            value={formData.applicantName}
                            onChange={handleApplicantNameChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Applicant Name"
                        />
                    </div>
                </div>
            </div>

            {/* Add other form sections here */}

            <div className="mt-6 flex justify-end">
                <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PersonalDetails;
