import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressInformation = ({ handleNext }) => {
    const [permanentAddress, setPermanentAddress] = useState({
        country: '',
        state: '',
        district: '',
        city: '',
        pincode: ''
    });

    const [correspondingAddress, setCorrespondingAddress] = useState({
        country: '',
        state: '',
        district: '',
        city: '',
        pincode: ''
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://countriesnow.space/api/v0.1/countries');
            setCountries(response.data.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchStates = async (country) => {
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
                country
            });
            setStates(response.data.data.states);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const fetchCities = async (country, state) => {
        try {
            const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
                country,
                state
            });
            setCities(response.data.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (permanentAddress.country) {
            fetchStates(permanentAddress.country);
        }
    }, [permanentAddress.country]);

    useEffect(() => {
        if (permanentAddress.country && permanentAddress.state) {
            fetchCities(permanentAddress.country, permanentAddress.state);
        }
    }, [permanentAddress.state]);

    const handlePermanentChange = (e) => {
        const { name, value } = e.target;
        setPermanentAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCorrespondingChange = (e) => {
        const { name, value } = e.target;
        setCorrespondingAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

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
                        <label htmlFor="permanentCountry" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <select
                            id="permanentCountry"
                            name="country"
                            value={permanentAddress.country}
                            onChange={handlePermanentChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.country}>{country.country}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="permanentState" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <select
                            id="permanentState"
                            name="state"
                            value={permanentAddress.state}
                            onChange={handlePermanentChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select State</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="permanentCity" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <select
                            id="permanentCity"
                            name="city"
                            value={permanentAddress.city}
                            onChange={handlePermanentChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="permanentPincode" className="block text-sm font-medium text-gray-700">
                            Pincode
                        </label>
                        <input
                            id="permanentPincode"
                            name="pincode"
                            type="text"
                            value={permanentAddress.pincode}
                            onChange={handlePermanentChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Corresponding Address */}
            <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Corresponding Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="correspondingCountry" className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <select
                            id="correspondingCountry"
                            name="country"
                            value={correspondingAddress.country}
                            onChange={handleCorrespondingChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.country}>{country.country}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="correspondingState" className="block text-sm font-medium text-gray-700">
                            State
                        </label>
                        <select
                            id="correspondingState"
                            name="state"
                            value={correspondingAddress.state}
                            onChange={handleCorrespondingChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select State</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.name}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="correspondingCity" className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <select
                            id="correspondingCity"
                            name="city"
                            value={correspondingAddress.city}
                            onChange={handleCorrespondingChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="correspondingPincode" className="block text-sm font-medium text-gray-700">
                            Pincode
                        </label>
                        <input
                            id="correspondingPincode"
                            name="pincode"
                            type="text"
                            value={correspondingAddress.pincode}
                            onChange={handleCorrespondingChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={handleNextClick}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Next
            </button>
        </div>
    );
};

export default AddressInformation;
