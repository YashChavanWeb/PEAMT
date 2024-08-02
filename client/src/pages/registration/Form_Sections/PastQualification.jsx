import React, { useState } from 'react';

const PastQualification = () => {
    const [qualifications, setQualifications] = useState([
        {
            id: 1,
            stream: '',
            completed: '',
            instituteState: '',
            district: '',
            taluka: '',
            schoolName: '',
            course: '',
            boardUniversity: '',
            admissionYear: '',
            passingYear: '',
            percentage: '',
            attempts: '',
            uploadMarksheet: '',
            gap: '',
        }
    ]);

    // Function to handle changes in input fields
    const handleChange = (e, id) => {
        const { name, value, type, files } = e.target;
        const updatedQualifications = qualifications.map(qual => {
            if (qual.id === id) {
                return {
                    ...qual,
                    [name]: type === 'file' ? files[0] : value
                };
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
            stream: '',
            completed: '',
            instituteState: '',
            district: '',
            taluka: '',
            schoolName: '',
            course: '',
            boardUniversity: '',
            admissionYear: '',
            passingYear: '',
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
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-5">
            <h2 className="text-xl font-bold mb-2">Past Qualifications</h2>
            <hr className="mb-4" />

            {qualifications.map(qualification => (
                <div key={qualification.id} className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Qualification {qualification.id}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Form fields */}
                        <div>
                            <label htmlFor={`stream-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Stream
                            </label>
                            <input
                                id={`stream-${qualification.id}`}
                                name="stream"
                                type="text"
                                value={qualification.stream}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Stream"
                            />
                        </div>
                        <div>
                            <label htmlFor={`completed-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Completed
                            </label>
                            <select
                                id={`completed-${qualification.id}`}
                                name="completed"
                                value={qualification.completed}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor={`instituteState-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Institute State
                            </label>
                            <input
                                id={`instituteState-${qualification.id}`}
                                name="instituteState"
                                type="text"
                                value={qualification.instituteState}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Institute State"
                            />
                        </div>
                        <div>
                            <label htmlFor={`district-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                District
                            </label>
                            <input
                                id={`district-${qualification.id}`}
                                name="district"
                                type="text"
                                value={qualification.district}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter District"
                            />
                        </div>
                        <div>
                            <label htmlFor={`schoolName-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                School Name
                            </label>
                            <input
                                id={`schoolName-${qualification.id}`}
                                name="schoolName"
                                type="text"
                                value={qualification.schoolName}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter School Name"
                            />
                        </div>
                        <div>
                            <label htmlFor={`course-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Course
                            </label>
                            <input
                                id={`course-${qualification.id}`}
                                name="course"
                                type="text"
                                value={qualification.course}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Course"
                            />
                        </div>
                        <div>
                            <label htmlFor={`boardUniversity-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Board/University
                            </label>
                            <input
                                id={`boardUniversity-${qualification.id}`}
                                name="boardUniversity"
                                type="text"
                                value={qualification.boardUniversity}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Board/University"
                            />
                        </div>
                        <div>
                            <label htmlFor={`admissionYear-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Admission Year
                            </label>
                            <input
                                id={`admissionYear-${qualification.id}`}
                                name="admissionYear"
                                type="text"
                                value={qualification.admissionYear}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Admission Year"
                            />
                        </div>
                        <div>
                            <label htmlFor={`passingYear-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Passing Year
                            </label>
                            <input
                                id={`passingYear-${qualification.id}`}
                                name="passingYear"
                                type="text"
                                value={qualification.passingYear}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Passing Year"
                            />
                        </div>
                        <div>
                            <label htmlFor={`percentage-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Percentage
                            </label>
                            <input
                                id={`percentage-${qualification.id}`}
                                name="percentage"
                                type="text"
                                value={qualification.percentage}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Percentage"
                            />
                        </div>
                        <div>
                            <label htmlFor={`attempts-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Attempts
                            </label>
                            <input
                                id={`attempts-${qualification.id}`}
                                name="attempts"
                                type="text"
                                value={qualification.attempts}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Attempts"
                            />
                        </div>
                        <div>
                            <label htmlFor={`gap-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Gap
                            </label>
                            <input
                                id={`gap-${qualification.id}`}
                                name="gap"
                                type="text"
                                value={qualification.gap}
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Enter Gap"
                            />
                        </div>
                        <div>
                            <label htmlFor={`uploadMarksheet-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Upload Marksheet
                            </label>
                            <input
                                id={`uploadMarksheet-${qualification.id}`}
                                name="uploadMarksheet"
                                type="file"
                                onChange={(e) => handleChange(e, qualification.id)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
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
