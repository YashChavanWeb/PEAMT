import React, { useState } from 'react';

const PastQualification = () => {
    const [qualifications, setQualifications] = useState([
        {
            id: 1,
            qualificationLevel: '',
            stream: '',
            completed: '',
            instituteState: '',
            district: '',
            taluka: '',
            schoolName: '',
            course: '',
            boardUniversity: '',
            mode: '',
            admissionYear: '',
            passingYear: '',
            result: '',
            percentage: '',
            attempts: '',
            uploadMarksheet: '',
            gap: '',
        }
    ]);

    // Function to handle changes in input fields
    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedQualifications = qualifications.map(qual => {
            if (qual.id === id) {
                return { ...qual, [name]: value };
            }
            return qual;
        });
        setQualifications(updatedQualifications);
    };

    // Function to add a new qualification entry
    const handleAddQualification = () => {
        const newId = qualifications.length + 1;
        const newQualification = {
            id: newId,
            qualificationLevel: '',
            stream: '',
            completed: '',
            instituteState: '',
            district: '',
            taluka: '',
            schoolName: '',
            course: '',
            boardUniversity: '',
            mode: '',
            admissionYear: '',
            passingYear: '',
            result: '',
            percentage: '',
            attempts: '',
            uploadMarksheet: '',
            gap: '',
        };
        setQualifications([...qualifications, newQualification]);
    };

    // Function to remove a qualification entry
    const handleRemoveQualification = (id) => {
        const updatedQualifications = qualifications.filter(qual => qual.id !== id);
        setQualifications(updatedQualifications);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Past Qualifications</h2>
            <hr className="mb-4" />

            {qualifications.map(qualification => (
                <div key={qualification.id} className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Qualification {qualification.id}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`qualificationLevel-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Qualification Level
                            </label>
                            <input
                                id={`qualificationLevel-${qualification.id}`}
                                name={`qualificationLevel-${qualification.id}`}
                                type="text"
                                value={qualification.qualificationLevel}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Qualification Level"
                            />
                        </div>
                        <div>
                            <label htmlFor={`stream-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Stream
                            </label>
                            <input
                                id={`stream-${qualification.id}`}
                                name={`stream-${qualification.id}`}
                                type="text"
                                value={qualification.stream}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Stream"
                            />
                        </div>
                        <div>
                            <label htmlFor={`completed-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Completed
                            </label>
                            <input
                                id={`completed-${qualification.id}`}
                                name={`completed-${qualification.id}`}
                                type="text"
                                value={qualification.completed}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Completed Status"
                            />
                        </div>
                        <div>
                            <label htmlFor={`instituteState-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Institute State
                            </label>
                            <input
                                id={`instituteState-${qualification.id}`}
                                name={`instituteState-${qualification.id}`}
                                type="text"
                                value={qualification.instituteState}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Institute State"
                            />
                        </div>
                        <div>
                            <label htmlFor={`district-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                District
                            </label>
                            <input
                                id={`district-${qualification.id}`}
                                name={`district-${qualification.id}`}
                                type="text"
                                value={qualification.district}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter District"
                            />
                        </div>
                        <div>
                            <label htmlFor={`taluka-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Taluka
                            </label>
                            <input
                                id={`taluka-${qualification.id}`}
                                name={`taluka-${qualification.id}`}
                                type="text"
                                value={qualification.taluka}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Taluka"
                            />
                        </div>
                        <div>
                            <label htmlFor={`schoolName-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                School Name
                            </label>
                            <input
                                id={`schoolName-${qualification.id}`}
                                name={`schoolName-${qualification.id}`}
                                type="text"
                                value={qualification.schoolName}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter School Name"
                            />
                        </div>
                        <div>
                            <label htmlFor={`course-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Course
                            </label>
                            <input
                                id={`course-${qualification.id}`}
                                name={`course-${qualification.id}`}
                                type="text"
                                value={qualification.course}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Course"
                            />
                        </div>
                        <div>
                            <label htmlFor={`boardUniversity-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Board/University
                            </label>
                            <input
                                id={`boardUniversity-${qualification.id}`}
                                name={`boardUniversity-${qualification.id}`}
                                type="text"
                                value={qualification.boardUniversity}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Board/University"
                            />
                        </div>
                        <div>
                            <label htmlFor={`mode-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Mode
                            </label>
                            <input
                                id={`mode-${qualification.id}`}
                                name={`mode-${qualification.id}`}
                                type="text"
                                value={qualification.mode}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Mode"
                            />
                        </div>
                        <div>
                            <label htmlFor={`admissionYear-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Admission Year
                            </label>
                            <input
                                id={`admissionYear-${qualification.id}`}
                                name={`admissionYear-${qualification.id}`}
                                type="text"
                                value={qualification.admissionYear}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Admission Year"
                            />
                        </div>
                        <div>
                            <label htmlFor={`passingYear-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Passing Year
                            </label>
                            <input
                                id={`passingYear-${qualification.id}`}
                                name={`passingYear-${qualification.id}`}
                                type="text"
                                value={qualification.passingYear}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Passing Year"
                            />
                        </div>
                        <div>
                            <label htmlFor={`result-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Result
                            </label>
                            <input
                                id={`result-${qualification.id}`}
                                name={`result-${qualification.id}`}
                                type="text"
                                value={qualification.result}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Result"
                            />
                        </div>
                        <div>
                            <label htmlFor={`percentage-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Percentage
                            </label>
                            <input
                                id={`percentage-${qualification.id}`}
                                name={`percentage-${qualification.id}`}
                                type="text"
                                value={qualification.percentage}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Percentage"
                            />
                        </div>
                        <div>
                            <label htmlFor={`attempts-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Attempts
                            </label>
                            <input
                                id={`attempts-${qualification.id}`}
                                name={`attempts-${qualification.id}`}
                                type="text"
                                value={qualification.attempts}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Attempts"
                            />
                        </div>
                        <div>
                            <label htmlFor={`uploadMarksheet-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Upload Marksheet
                            </label>
                            <input
                                id={`uploadMarksheet-${qualification.id}`}
                                name={`uploadMarksheet-${qualification.id}`}
                                type="file"
                                accept=".pdf,.jpg,.png"
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor={`gap-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Gap in Study
                            </label>
                            <input
                                id={`gap-${qualification.id}`}
                                name={`gap-${qualification.id}`}
                                type="text"
                                value={qualification.gap}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter Gap in Study"
                            />
                        </div>
                    </div>

                    {/* Delete button */}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => handleRemoveQualification(qualification.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {/* Add button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleAddQualification}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500"
                >
                    Add Qualification
                </button>
            </div>
        </div>
    );
};

export default PastQualification;
