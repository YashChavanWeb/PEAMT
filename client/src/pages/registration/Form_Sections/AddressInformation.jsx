import React from 'react';

const AddressInformation = ({ handleNext }) => {
    const handleNextClick = () => {
        handleNext();
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-2">Address Information</h2>
            <hr className="mb-4" />

            {/* Permanent Address */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Permanent Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="permanentState" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            id="permanentState"
                            name="permanentState"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter State"
                        />
                    </div>
                    <div>
                        <label htmlFor="permanentDistrict" className="block text-sm font-medium text-gray-700">
                            District
                        </label>
                        <input
                            id="permanentDistrict"
                            name="permanentDistrict"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter District"
                        />
                    </div>
                    <div>
                        <label htmlFor="permanentTaluka" className="block text-sm font-medium text-gray-700">
                            Taluka
                        </label>
                        <input
                            id="permanentTaluka"
                            name="permanentTaluka"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Taluka"
                        />
                    </div>
                    <div>
                        <label htmlFor="permanentVillage" className="block text-sm font-medium text-gray-700">
                            Village
                        </label>
                        <input
                            id="permanentVillage"
                            name="permanentVillage"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Village"
                        />
                    </div>
                    <div>
                        <label htmlFor="permanentPincode" className="block text-sm font-medium text-gray-700">
                            Pincode
                        </label>
                        <input
                            id="permanentPincode"
                            name="permanentPincode"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Pincode"
                        />
                    </div>
                </div>
            </div>

            {/* Corresponding Address */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Corresponding Address (if different)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="correspondingState" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <input
                            id="correspondingState"
                            name="correspondingState"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter State"
                        />
                    </div>
                    <div>
                        <label htmlFor="correspondingDistrict" className="block text-sm font-medium text-gray-700">
                            District
                        </label>
                        <input
                            id="correspondingDistrict"
                            name="correspondingDistrict"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter District"
                        />
                    </div>
                    <div>
                        <label htmlFor="correspondingTaluka" className="block text-sm font-medium text-gray-700">
                            Taluka
                        </label>
                        <input
                            id="correspondingTaluka"
                            name="correspondingTaluka"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Taluka"
                        />
                    </div>
                    <div>
                        <label htmlFor="correspondingVillage" className="block text-sm font-medium text-gray-700">
                            Village
                        </label>
                        <input
                            id="correspondingVillage"
                            name="correspondingVillage"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Village"
                        />
                    </div>
                    <div>
                        <label htmlFor="correspondingPincode" className="block text-sm font-medium text-gray-700">
                            Pincode
                        </label>
                        <input
                            id="correspondingPincode"
                            name="correspondingPincode"
                            type="text"
                            autoComplete="off"
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter Pincode"
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

export default AddressInformation;
