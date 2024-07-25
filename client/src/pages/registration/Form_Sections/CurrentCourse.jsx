import React, { useState } from 'react';

const CurrentCourse = ({ handleNext }) => {
    const [formData, setFormData] = useState({
        isJob: false,
        jobDetails: '',
        admissionYear: '',
        instituteState: '',
        instituteDistrict: '',
        instituteTaluka: '',
        qualificationLevel: '',
        stream: '',
        collegeName: '',
        courseName: '',
        admissionType: '',
        marksDetails: '',
        yearOfStudy: '',
        studyStatus: '',
        gapInStudy: '',
        studyMode: ''
    });

    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = [
            'admissionYear', 'instituteState', 'instituteDistrict', 'instituteTaluka',
            'qualificationLevel', 'stream', 'collegeName', 'courseName',
            'admissionType', 'marksDetails', 'yearOfStudy', 'studyStatus', 'gapInStudy', 'studyMode'
        ];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = 'This field is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShowError(true);
            return false;
        }

        setShowError(false);
        return true;
    };

    const handleNextClick = () => {
        if (validateForm()) {
            handleNext();
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Current Course Details</h2>
            <hr className="mb-4" />

            {showError && (
                <div className="mb-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded">
                    <p className="text-sm">Please fill all required fields.</p>
                </div>
            )}

            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Job Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="isJob" className="block text-sm font-medium text-gray-700">
                            Are you currently employed?
                        </label>
                        <input
                            id="isJob"
                            name="isJob"
                            type="checkbox"
                            checked={formData.isJob}
                            onChange={handleChange}
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="jobDetails" className="block text-sm font-medium text-gray-700">
                            Job Details
                        </label>
                        <textarea
                            id="jobDetails"
                            name="jobDetails"
                            rows="3"
                            value={formData.jobDetails}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Job Details"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Current Course Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="admissionYear" className="block text-sm font-medium text-gray-700">
                            Admission Year in Current Course
                        </label>
                        <input
                            id="admissionYear"
                            name="admissionYear"
                            type="text"
                            autoComplete="off"
                            value={formData.admissionYear}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Admission Year"
                        />
                        {errors.admissionYear && <p className="text-red-500 text-xs">{errors.admissionYear}</p>}
                    </div>
                    <div>
                        <label htmlFor="instituteState" className="block text-sm font-medium text-gray-700">
                            Institute State
                        </label>
                        <input
                            id="instituteState"
                            name="instituteState"
                            type="text"
                            autoComplete="off"
                            value={formData.instituteState}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute State"
                        />
                        {errors.instituteState && <p className="text-red-500 text-xs">{errors.instituteState}</p>}
                    </div>
                    <div>
                        <label htmlFor="instituteDistrict" className="block text-sm font-medium text-gray-700">
                            Institute District
                        </label>
                        <input
                            id="instituteDistrict"
                            name="instituteDistrict"
                            type="text"
                            autoComplete="off"
                            value={formData.instituteDistrict}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute District"
                        />
                        {errors.instituteDistrict && <p className="text-red-500 text-xs">{errors.instituteDistrict}</p>}
                    </div>
                    <div>
                        <label htmlFor="instituteTaluka" className="block text-sm font-medium text-gray-700">
                            Institute Taluka
                        </label>
                        <input
                            id="instituteTaluka"
                            name="instituteTaluka"
                            type="text"
                            autoComplete="off"
                            value={formData.instituteTaluka}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute Taluka"
                        />
                        {errors.instituteTaluka && <p className="text-red-500 text-xs">{errors.instituteTaluka}</p>}
                    </div>
                    <div>
                        <label htmlFor="qualificationLevel" className="block text-sm font-medium text-gray-700">
                            Your Qualification Level
                        </label>
                        <input
                            id="qualificationLevel"
                            name="qualificationLevel"
                            type="text"
                            autoComplete="off"
                            value={formData.qualificationLevel}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Qualification Level"
                        />
                        {errors.qualificationLevel && <p className="text-red-500 text-xs">{errors.qualificationLevel}</p>}
                    </div>
                    <div>
                        <label htmlFor="stream" className="block text-sm font-medium text-gray-700">
                            Stream
                        </label>
                        <input
                            id="stream"
                            name="stream"
                            type="text"
                            autoComplete="off"
                            value={formData.stream}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Stream"
                        />
                        {errors.stream && <p className="text-red-500 text-xs">{errors.stream}</p>}
                    </div>
                    <div>
                        <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
                            College / School Name
                        </label>
                        <input
                            id="collegeName"
                            name="collegeName"
                            type="text"
                            autoComplete="off"
                            value={formData.collegeName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter College / School Name"
                        />
                        {errors.collegeName && <p className="text-red-500 text-xs">{errors.collegeName}</p>}
                    </div>
                    <div>
                        <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                            Course Name
                        </label>
                        <input
                            id="courseName"
                            name="courseName"
                            type="text"
                            autoComplete="off"
                            value={formData.courseName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Course Name"
                        />
                        {errors.courseName && <p className="text-red-500 text-xs">{errors.courseName}</p>}
                    </div>
                    <div>
                        <label htmlFor="admissionType" className="block text-sm font-medium text-gray-700">
                            Admission Type
                        </label>
                        <input
                            id="admissionType"
                            name="admissionType"
                            type="text"
                            autoComplete="off"
                            value={formData.admissionType}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Admission Type"
                        />
                        {errors.admissionType && <p className="text-red-500 text-xs">{errors.admissionType}</p>}
                    </div>
                    <div>
                        <label htmlFor="marksDetails" className="block text-sm font-medium text-gray-700">
                            Marks Details
                        </label>
                        <input
                            id="marksDetails"
                            name="marksDetails"
                            type="text"
                            autoComplete="off"
                            value={formData.marksDetails}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Marks Details"
                        />
                        {errors.marksDetails && <p className="text-red-500 text-xs">{errors.marksDetails}</p>}
                    </div>
                    <div>
                        <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700">
                            Year of Study
                        </label>
                        <input
                            id="yearOfStudy"
                            name="yearOfStudy"
                            type="text"
                            autoComplete="off"
                            value={formData.yearOfStudy}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Year of Study"
                        />
                        {errors.yearOfStudy && <p className="text-red-500 text-xs">{errors.yearOfStudy}</p>}
                    </div>
                    <div>
                        <label htmlFor="studyStatus" className="block text-sm font-medium text-gray-700">
                            Study Status
                        </label>
                        <input
                            id="studyStatus"
                            name="studyStatus"
                            type="text"
                            autoComplete="off"
                            value={formData.studyStatus}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Study Status"
                        />
                        {errors.studyStatus && <p className="text-red-500 text-xs">{errors.studyStatus}</p>}
                    </div>
                    <div>
                        <label htmlFor="gapInStudy" className="block text-sm font-medium text-gray-700">
                            Gap in Study
                        </label>
                        <input
                            id="gapInStudy"
                            name="gapInStudy"
                            type="text"
                            autoComplete="off"
                            value={formData.gapInStudy}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Gap in Study"
                        />
                        {errors.gapInStudy && <p className="text-red-500 text-xs">{errors.gapInStudy}</p>}
                    </div>
                    <div>
                        <label htmlFor="studyMode" className="block text-sm font-medium text-gray-700">
                            Study Mode
                        </label>
                        <input
                            id="studyMode"
                            name="studyMode"
                            type="text"
                            autoComplete="off"
                            value={formData.studyMode}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Study Mode"
                        />
                        {errors.studyMode && <p className="text-red-500 text-xs">{errors.studyMode}</p>}
                    </div>
                </div>
            </div>

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

export default CurrentCourse;
