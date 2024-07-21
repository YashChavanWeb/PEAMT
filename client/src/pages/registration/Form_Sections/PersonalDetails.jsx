// PersonalDetails.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PersonalDetails = ({ handleNext }) => {
    const navigate = useNavigate();

    const handleNextClick = () => {
        // Call handleNext to change the section in RegistrationForm
        handleNext();
    };


    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Personal Information</h2>
            <hr className="mb-4" />

            {/* Personal Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                            Aadhar Number
                        </label>
                        <input
                            id="aadharNumber"
                            name="aadharNumber"
                            type="text"
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Name"
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Select Date of Birth"
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Religion Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Religion Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="religion" className="block text-sm font-medium text-gray-700">
                            Religion
                        </label>
                        <input
                            id="religion"
                            name="religion"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Religion"
                        />
                    </div>
                </div>
            </div>

            {/* Caste Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Caste Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="casteCategory" className="block text-sm font-medium text-gray-700">
                            Caste Category
                        </label>
                        <input
                            id="casteCategory"
                            name="casteCategory"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Caste Category"
                        />
                    </div>
                </div>
            </div>

            {/* Domicile Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Domicile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="isDomicile" className="block text-sm font-medium text-gray-700">
                            Are you Domicile?
                        </label>
                        <input
                            id="isDomicile"
                            name="isDomicile"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="haveCertificate" className="block text-sm font-medium text-gray-700">
                            Do you have Domicile Certificate?
                        </label>
                        <input
                            id="haveCertificate"
                            name="haveCertificate"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="relationshipType" className="block text-sm font-medium text-gray-700">
                            Relationship Type
                        </label>
                        <input
                            id="relationshipType"
                            name="relationshipType"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Relationship Type"
                        />
                    </div>
                    <div>
                        <label htmlFor="certificateNo" className="block text-sm font-medium text-gray-700">
                            Certificate Number
                        </label>
                        <input
                            id="certificateNo"
                            name="certificateNo"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Certificate Number"
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Applicant Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="authority" className="block text-sm font-medium text-gray-700">
                            Authority
                        </label>
                        <input
                            id="authority"
                            name="authority"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Authority"
                        />
                    </div>
                    <div>
                        <label htmlFor="certificatePdf" className="block text-sm font-medium text-gray-700">
                            Certificate PDF
                        </label>
                        <input
                            id="certificatePdf"
                            name="certificatePdf"
                            type="file"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Eligibility Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Eligibility Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="workingOrStudent" className="block text-sm font-medium text-gray-700">
                            Working or Student
                        </label>
                        <input
                            id="workingOrStudent"
                            name="workingOrStudent"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Working or Student"
                        />
                    </div>
                    <div>
                        <label htmlFor="disabled" className="block text-sm font-medium text-gray-700">
                            Disabled
                        </label>
                        <input
                            id="disabled"
                            name="disabled"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                </div>
            </div>

            {/* Bank Account Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Bank Account Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="adharLinkedWithBank" className="block text-sm font-medium text-gray-700">
                            Aadhar linked with Bank
                        </label>
                        <input
                            id="adharLinkedWithBank"
                            name="adharLinkedWithBank"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="phoneLinkedWithBank" className="block text-sm font-medium text-gray-700">
                            Phone linked with Bank
                        </label>
                        <input
                            id="phoneLinkedWithBank"
                            name="phoneLinkedWithBank"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="bankAccNo" className="block text-sm font-medium text-gray-700">
                            Bank Account Number
                        </label>
                        <input
                            id="bankAccNo"
                            name="bankAccNo"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Bank Account Number"
                        />
                    </div>
                    <div>
                        <label htmlFor="ifsCode" className="block text-sm font-medium text-gray-700">
                            IFSC Code
                        </label>
                        <input
                            id="ifsCode"
                            name="ifsCode"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter IFSC Code"
                        />
                    </div>
                    <div>
                        <label htmlFor="branch" className="block text-sm font-medium text-gray-700">
                            Branch
                        </label>
                        <input
                            id="branch"
                            name="branch"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Branch"
                        />
                    </div>
                </div>
            </div>
            {/* Next button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleNextClick}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PersonalDetails;
