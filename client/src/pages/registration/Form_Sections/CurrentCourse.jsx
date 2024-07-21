import React from 'react';

const CurrentCourse = ({ handleNext }) => {
    const handleNextClick = () => {
        handleNext();
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Current Course Details</h2>
            <hr className="mb-4" />

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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Admission Year"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute State"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute District"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Institute Taluka"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Qualification Level"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Stream"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter College / School Name"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Course Name"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Admission Type"
                        />
                    </div>
                    <div>
                        <label htmlFor="marksDetails" className="block text-sm font-medium text-gray-700">
                            Marks and Details
                        </label>
                        <textarea
                            id="marksDetails"
                            name="marksDetails"
                            rows="3"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Marks and Details"
                        ></textarea>
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Year of Study"
                        />
                    </div>
                    <div>
                        <label htmlFor="studyStatus" className="block text-sm font-medium text-gray-700">
                            Study Status
                        </label>
                        <select
                            id="studyStatus"
                            name="studyStatus"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Study Status</option>
                            <option value="completed">Completed</option>
                            <option value="continuing">Continuing</option>
                        </select>
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Gap in Study"
                        />
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
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Study Mode"
                        />
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
