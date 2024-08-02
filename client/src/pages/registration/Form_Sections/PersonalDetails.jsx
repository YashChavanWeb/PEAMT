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

        const handleChange = (e) => {
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



        const handleAgeChange = (e) => {
            const age = e.target.value.replace(/\D/g, '');
            setFormData({
                ...formData,
                age: age,
            });
            setErrors({
                ...errors,
                age: ''
            });
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
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-5">
                <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>

                {showError && (
                    <div className="bg-red-600 text-white p-3 mb-4 rounded-lg">
                        Please fill in all required fields correctly.
                    </div>
                )}

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
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.aadharNumber ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            autoComplete="off"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.mobileNumber ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            autoComplete="off"
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.dob ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.age ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.gender ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.religion ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
                            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${errors.casteCategory ? 'border-red-500' : 'border-gray-400'} focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
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
