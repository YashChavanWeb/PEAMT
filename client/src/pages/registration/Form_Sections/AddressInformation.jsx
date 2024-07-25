
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
    const [districts, setDistricts] = useState([]);
    const [cities, setCities] = useState([]);

    const apiKey = 'UTdQa1cwdTc2VnRMd3RlZzNUdVpPd1ZTTEZnSXZaQW15c3pTZDBNTg=='; // Replace with your actual API key

    const fetchCountries = async () => {
        try {
            const response = await axios.get('/api/address/countries', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            setCountries(response.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchStates = async (country) => {
        try {
            const response = await axios.get(`/api/address/states/${country}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            setStates(response.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const fetchDistricts = async (country, state) => {
        try {
            const response = await axios.get(`/api/address/districts/${state}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            setDistricts(response.data);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchCities = async (country, state, district) => {
        try {
            const response = await axios.get(`/api/address/cities/${district}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });
            setCities(response.data);
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
        if (permanentAddress.state) {
            fetchDistricts(permanentAddress.country, permanentAddress.state);
        }
    }, [permanentAddress.state]);

    useEffect(() => {
        if (permanentAddress.district) {
            fetchCities(permanentAddress.country, permanentAddress.state, permanentAddress.district);
        }
    }, [permanentAddress.district]);

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
                                <option key={index} value={country.iso2}>{country.name}</option>
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
                                <option key={index} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="permanentDistrict" className="block text-sm font-medium text-gray-700">
                            District
                        </label>
                        <select
                            id="permanentDistrict"
                            name="district"
                            value={permanentAddress.district}
                            onChange={handlePermanentChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district.iso2}>{district.name}</option>
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
                                <option key={index} value={city.name}>{city.name}</option>
                            ))}
                        </select>
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
                                <option key={index} value={country.iso2}>{country.name}</option>
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
                                <option key={index} value={state.iso2}>{state.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="correspondingDistrict" className="block text-sm font-medium text-gray-700">
                            District
                        </label>
                        <select
                            id="correspondingDistrict"
                            name="district"
                            value={correspondingAddress.district}
                            onChange={handleCorrespondingChange}
                            className="mt-1 block w-full px-3 py-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="" disabled>Select District</option>
                            {districts.map((district, index) => (
                                <option key={index} value={district.iso2}>{district.name}</option>
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
                                <option key={index} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <button
                    onClick={handleNextClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AddressInformation;
