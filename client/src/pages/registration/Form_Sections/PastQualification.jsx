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
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validate = () => {
        let errorMsg = '';
        qualifications.forEach(qualification => {
            const fieldsWithDigitsAllowed = [
                'qualificationLevel', 'admissionYear', 'passingYear', 'result',
                'percentage', 'attempts', 'gap'
            ];
            const characterFields = [
                'stream', 'instituteState', 'district', 'taluka', 'schoolName',
                'course', 'boardUniversity', 'mode'
            ];

            // Check fields with digits allowed
            fieldsWithDigitsAllowed.forEach(field => {
                if (qualification[field].trim() === '') {
                    errorMsg = 'Please fill all details';
                }
            });

            // Check character-only fields
            characterFields.forEach(field => {
                if (qualification[field].trim() === '' || !/^[a-zA-Z\s]*$/.test(qualification[field])) {
                    errorMsg = 'Please fill all details correctly';
                }
            });

            if (errorMsg) return false; // Stop further checks if there's already an error
        });

        if (errorMsg) {
            setError(errorMsg);
            setSuccess('');
            setTimeout(() => setError(''), 3000); // Clear error after 3 seconds
            return false;
        }
        return true;
    };

    const canAddQualification = () => {
        // Check if all fields in the current qualifications are filled
        return qualifications.every(qualification => {
            const fieldsWithDigitsAllowed = [
                'qualificationLevel', 'admissionYear', 'passingYear', 'result',
                'percentage', 'attempts', 'gap'
            ];
            const characterFields = [
                'stream', 'instituteState', 'district', 'taluka', 'schoolName',
                'course', 'boardUniversity', 'mode'
            ];

            const allFieldsFilled = fieldsWithDigitsAllowed.every(field => qualification[field].trim() !== '') &&
                characterFields.every(field => qualification[field].trim() !== '' && /^[a-zA-Z\s]*$/.test(qualification[field]));

            return allFieldsFilled;
        });
    };

    const handleChange = (e, id) => {
        const { name, value } = e.target;
        const updatedQualifications = qualifications.map(qual => {
            if (qual.id === id) {
                // Validate input based on field name
                if ([
                    'qualificationLevel', 'admissionYear', 'passingYear', 'result',
                    'percentage', 'attempts', 'gap'
                ].includes(name) || /^[a-zA-Z\s]*$/.test(value)) {
                    return { ...qual, [name]: value };
                }
                return qual;
            }
            return qual;
        });
        setQualifications(updatedQualifications);
    };

    const handleAddQualification = () => {
        if (!validate()) return;
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

    const handleRemoveQualification = (id) => {
        const updatedQualifications = qualifications.filter(qual => qual.id !== id);
        setQualifications(updatedQualifications);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSuccess('Form submitted successfully!');
            setError('');
            // Add form submission logic here
        } else {
            setSuccess('');
        }
    };

    return (
        <div    className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-5">
            <h2 className="text-xl font-bold mb-2">Past Qualifications</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Validation Error:</strong>
                    <span className="block sm:inline">{error}</span>
                </div>
            )}
            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                    <strong className="font-bold">Success:</strong>
                    <span className="block sm:inline">{success}</span>
                </div>
            )}
            <hr className="mb-4" />

            {qualifications.map(qualification => (
                <div key={qualification.id} className="mb-6">
                    <h3 className="text-lg font-bold mb-2">Qualification {qualification.id}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Add form fields here */}
                      
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
                                placeholder="Enter Stream"
                            />
                        </div>
                        {/* Add remaining fields similarly */}
                        <div>
                            <label htmlFor={`completed-${qualification.id}`} className="block text-sm font-medium text-gray-700">
                                Completed
                            </label>
                            <select
                                id={`completed-${qualification.id}`}
                                name="completed"
                                value={qualification.completed}
                                onChange={(e) => handleChange(e, qualification.id)}
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
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
                               className={"mt-1 block w-full px-3 py-2 border rounded-md shadow-sm  'border-gray-400' focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={() => handleRemoveQualification(qualification.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Remove Qualification
                        </button>
                        {qualifications.length < 5 && (
                            <button
                                type="button"
                                onClick={handleAddQualification}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                disabled={!canAddQualification()}
                            >
                                Add Another Qualification
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <button
                type="submit"
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
                Submit
            </button>
        </div>
    );
};

export default PastQualification;
