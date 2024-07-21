import React from 'react';

const OtherInformation = ({ handleNext }) => {
    const handleNextClick = () => {
        handleNext();
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
                        <label htmlFor="fatherIsAlive" className="block text-sm font-medium text-gray-700">
                            Is Father Alive?
                        </label>
                        <input
                            id="fatherIsAlive"
                            name="fatherIsAlive"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">
                            Father's Name
                        </label>
                        <input
                            id="fatherName"
                            name="fatherName"
                            type="text"
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Father's Occupation"
                        />
                    </div>
                    <div>
                        <label htmlFor="fatherIsSalaried" className="block text-sm font-medium text-gray-700">
                            Is Father Salaried?
                        </label>
                        <input
                            id="fatherIsSalaried"
                            name="fatherIsSalaried"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>

                    {/* Mother (same structure as Father) */}
                    <div>
                        <label htmlFor="motherIsAlive" className="block text-sm font-medium text-gray-700">
                            Is Mother Alive?
                        </label>
                        <input
                            id="motherIsAlive"
                            name="motherIsAlive"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
                    </div>
                    <div>
                        <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">
                            Mother's Name
                        </label>
                        <input
                            id="motherName"
                            name="motherName"
                            type="text"
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Mother's Occupation"
                        />
                    </div>
                    <div>
                        <label htmlFor="motherIsSalaried" className="block text-sm font-medium text-gray-700">
                            Is Mother Salaried?
                        </label>
                        <input
                            id="motherIsSalaried"
                            name="motherIsSalaried"
                            type="checkbox"
                            className="mt-1 form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                        />
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
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Custom Field 2"
                        />
                    </div>
                    {/* Add more custom fields as needed */}
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

export default OtherInformation;
