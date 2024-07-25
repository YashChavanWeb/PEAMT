import React, { useState } from 'react';

const OtherInformation = ({ handleNext }) => {
    const [formData, setFormData] = useState({
        fatherName: '',
        fatherOccupation: '',
        fatherIsSalaried: '',
        motherName: '',
        motherOccupation: '',
        motherIsSalaried: '',
    });

    const [errors, setErrors] = useState({});
    const [isFormTouched, setIsFormTouched] = useState(false);

    const handleNextClick = () => {
        setIsFormTouched(true);
        if (validateForm()) {
            handleNext();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (/^[a-zA-Z\s]*$/.test(value) || value === '') {  // Allow only letters and spaces
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // Check if any required fields are empty
        for (let key in formData) {
            if (formData[key] === '' && (key.includes('Name') || key.includes('Occupation') || key.includes('Salaried'))) {
                isValid = false;
                formErrors['form'] = 'Please fill in all required details.';
                break;
            }
        }

        setErrors(formErrors);
        return isValid;
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Other Details</h2>
            <hr className="mb-4" />

            {/* Parent Details */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Parent Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Father */}
                    <div>
                        <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                            Father's Name
                        </label>
                        <input
                            id="fatherName"
                            name="fatherName"
                            type="text"
                            value={formData.fatherName}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Father's Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="fatherOccupation" className="block text-sm font-medium text-gray-700">
                            Father's Occupation
                        </label>
                        <input
                            id="fatherOccupation"
                            name="fatherOccupation"
                            type="text"
                            value={formData.fatherOccupation}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Father's Occupation"
                        />
                    </div>
                    <div>
                        <label htmlFor="fatherIsSalaried" className="block text-sm font-medium text-gray-700">
                            Is Father Salaried?
                        </label>
                        <select
                            id="fatherIsSalaried"
                            name="fatherIsSalaried"
                            value={formData.fatherIsSalaried}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    {/* Mother */}
                    <div>
                        <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                            Mother's Name
                        </label>
                        <input
                            id="motherName"
                            name="motherName"
                            type="text"
                            value={formData.motherName}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Mother's Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="motherOccupation" className="block text-sm font-medium text-gray-700">
                            Mother's Occupation
                        </label>
                        <input
                            id="motherOccupation"
                            name="motherOccupation"
                            type="text"
                            value={formData.motherOccupation}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Mother's Occupation"
                        />
                    </div>
                    <div>
                        <label htmlFor="motherIsSalaried" className="block text-sm font-medium text-gray-700">
                            Is Mother Salaried?
                        </label>
                        <select
                            id="motherIsSalaried"
                            name="motherIsSalaried"
                            value={formData.motherIsSalaried}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select an option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Additional Details (Customize as needed) */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Additional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="customField1" className="block text-sm font-medium text-gray-700">
                            Custom Field 1
                        </label>
                        <input
                            id="customField1"
                            name="customField1"
                            type="text"
                            value={formData.customField1 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Custom Field 1"
                        />
                    </div>
                    <div>
                        <label htmlFor="customField2" className="block text-sm font-medium text-gray-700">
                            Custom Field 2
                        </label>
                        <input
                            id="customField2"
                            name="customField2"
                            type="text"
                            value={formData.customField2 || ''}
                            onChange={handleChange}
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Custom Field 2"
                        />
                    </div>
                </div>
            </div>

            {/* Show error message if any details are missing */}
            {isFormTouched && errors.form && (
                <div className="mb-4">
                    <span className="text-red-500 text-sm">{errors.form}</span>
                </div>
            )}

            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleNextClick}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default OtherInformation;
