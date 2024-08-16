import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PopupModel from './PopupModel';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        adhar: '',
        email: '',
        phone: '',
        fatherName: '',
        motherName: '',
        currentCourse: '', // Existing field
        subjects: [],     // Existing field (array for subjects)
        dateOfBirth: '',  // New field
        gender: '',       // New field
        nationality: '',  // New field
        emergencyContact: {
            name: '',      // Emergency contact's name
            phone: ''      // Emergency contact's phone number
        },
        previousEducation: '', // New field
        permanentAddress: {
            country: '',
            state: '',
            city: '',
            pincode: ''
        }
    });



    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentId, setPaymentId] = useState(null);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State for modal
    const [paymentCompleted, setPaymentCompleted] = useState(false); // New state for tracking payment status

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                // Check if a payment ID is present in localStorage
                const storedPaymentId = localStorage.getItem('paymentId');
                if (storedPaymentId) {
                    setPaymentId(storedPaymentId);
                    setPaymentCompleted(true); // Mark payment as completed
                    return;
                }

                // Replace with your API endpoint to check payment status
                const response = await axios.get(`/api/check-payment-status/${currentUser.id}`);
                if (response.data.paymentCompleted) {
                    localStorage.setItem('paymentId', response.data.paymentId);
                    setPaymentId(response.data.paymentId);
                    setPaymentCompleted(true);
                }
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };

        checkPaymentStatus();
    }, [currentUser.id]);


    useEffect(() => {
        const storedFormData = localStorage.getItem('formData');
        if (storedFormData) {
            setFormData(JSON.parse(storedFormData));
        }
    }, []);




    const handlePayment = () => {
        if (paymentCompleted) {
            alert('Payment already completed.');
            return;
        }

        setLoading(true);
        setError(null);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: '9900',
            currency: 'INR',
            name: 'Registration Fee',
            description: 'Student Registration Payment',
            handler: function (response) {
                setLoading(false);
                setPaymentId(response.razorpay_payment_id);
                setPaymentSuccessful(true);
                setPaymentCompleted(true); // Mark payment as completed
                localStorage.setItem('paymentId', response.razorpay_payment_id); // Store payment ID
                alert('Payment Successful');
            },
            prefill: {
                name: currentUser.name || 'User Name',
                email: currentUser.email || 'user@example.com',
                contact: currentUser.contact || '0000000000',
            },
            theme: {
                color: '#3399cc'
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        try {
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            setLoading(false);
            setError('Payment failed. Please try again.');
            console.error('Payment Error:', error);
        }
    };




    const handleSubjectChange = (e, index) => {
        const newSubjects = [...formData.subjects];
        newSubjects[index] = e.target.value;
        setFormData((prevState) => ({
            ...prevState,
            subjects: newSubjects,
        }));
    };

    const addSubject = () => {
        setFormData((prevState) => ({
            ...prevState,
            subjects: [...prevState.subjects, '']
        }));
    };

    const removeSubject = (index) => {
        const newSubjects = formData.subjects.filter((_, i) => i !== index);
        setFormData((prevState) => ({
            ...prevState,
            subjects: newSubjects,
        }));
    };


    const fetchCountries = async () => {
        try {
            const response = await axios.get(
                "https://countriesnow.space/api/v0.1/countries"
            );
            setCountries(response.data.data);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
    };

    const fetchStates = async (country) => {
        try {
            const response = await axios.post(
                "https://countriesnow.space/api/v0.1/countries/states",
                {
                    country,
                }
            );
            setStates(response.data.data.states);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchCities = async (country, state) => {
        try {
            const response = await axios.post(
                "https://countriesnow.space/api/v0.1/countries/state/cities",
                {
                    country,
                    state,
                }
            );
            setCities(response.data.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (formData.permanentAddress.country) {
            fetchStates(formData.permanentAddress.country);
        }
    }, [formData.permanentAddress.country]);

    useEffect(() => {
        if (formData.permanentAddress.country && formData.permanentAddress.state) {
            fetchCities(formData.permanentAddress.country, formData.permanentAddress.state);
        }
    }, [formData.permanentAddress.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: value
        };
        setFormData(updatedFormData);
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        const [key, subKey] = name.split('.');

        let updatedFormData;
        if (subKey) {
            updatedFormData = {
                ...formData,
                [key]: {
                    ...formData[key],
                    [subKey]: value
                }
            };
        } else {
            updatedFormData = {
                ...formData,
                [key]: value
            };
        }

        setFormData(updatedFormData);
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!paymentSuccessful) {
        //     alert('Please complete the payment before submitting the form.');
        //     return;
        // }

        if (!formData.name || !formData.adhar || !formData.email || !formData.phone || !formData.permanentAddress.country || !formData.permanentAddress.state || !formData.permanentAddress.city || !formData.permanentAddress.pincode) {
            alert('Please fill all the required fields.');
            return;
        }

        const submissionData = {
            ...formData,
            paymentId
        };

        try {
            const response = await axios.post('/api/regform', submissionData);
            setModalOpen(true); // Open the modal
            localStorage.removeItem('formData'); // Clear localStorage on successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };



    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md max-w-max">
            <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="adhar" className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                    <input
                        type="text"
                        id="adhar"
                        name="adhar"
                        value={formData.adhar}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father Name</label>
                    <input
                        type="text"
                        id="fatherName"
                        name="fatherName" // Updated
                        value={formData.fatherName} // Updated
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="motherName" className="block text-sm font-medium text-gray-700">Mother Name</label>
                    <input
                        type="text"
                        id="motherName"
                        name="motherName" // Updated
                        value={formData.motherName} // Updated
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                {/* Permanent Address */}
                <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Permanent Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="permanentAddress.country"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Country
                            </label>
                            <select
                                id="permanentAddress.country"
                                name="permanentAddress.country"
                                value={formData.permanentAddress.country}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.country}>
                                        {country.country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="permanentAddress.state"
                                className="block text-sm font-medium text-gray-700"
                            >
                                State
                            </label>
                            <select
                                id="permanentAddress.state"
                                name="permanentAddress.state"
                                value={formData.permanentAddress.state}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select State</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state.name}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="permanentAddress.city"
                                className="block text-sm font-medium text-gray-700"
                            >
                                City
                            </label>
                            <select
                                id="permanentAddress.city"
                                name="permanentAddress.city"
                                value={formData.permanentAddress.city}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            >
                                <option value="" disabled>Select City</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="permanentAddress.pincode"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Pincode
                            </label>
                            <input
                                id="permanentAddress.pincode"
                                name="permanentAddress.pincode"
                                type="text"
                                value={formData.permanentAddress.pincode}
                                onChange={handleAddressChange}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>



                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>


                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>


                <div>
                    <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
                    <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>


                <div>
                    <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                    <input
                        type="text"
                        id="emergencyContact.name"
                        name="emergencyContact.name"
                        value={formData.emergencyContact.name}
                        onChange={handleAddressChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>


                <div>
                    <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                    <input
                        type="text"
                        id="emergencyContact.phone"
                        name="emergencyContact.phone"
                        value={formData.emergencyContact.phone}
                        onChange={handleAddressChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>


                <div>
                    <label htmlFor="previousEducation" className="block text-sm font-medium text-gray-700">Previous Education</label>
                    <textarea
                        id="previousEducation"
                        name="previousEducation"
                        value={formData.previousEducation}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows="3"
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="currentCourse"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Current Course
                    </label>
                    <input
                        id="currentCourse"
                        name="currentCourse"
                        type="text"
                        value={formData.currentCourse}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        required
                    />
                </div>


                <div>
                    <label
                        htmlFor="subjects"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Subjects
                    </label>
                    {formData.subjects.map((subject, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                name="subjects"
                                value={subject}
                                onChange={(e) => handleSubjectChange(e, index)}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                placeholder={`Subject ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeSubject(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSubject}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add Subject
                    </button>
                </div>


                <div className='p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg'>
                    <h2 className='text-2xl font-bold mb-4 text-gray-700'>Student Registration</h2>
                    <p className='mb-6 text-gray-600'>Please complete the payment of ₹99 to complete your registration.</p>
                    {error && <div className='text-red-500 mb-4'>{error}</div>}
                    {paymentSuccessful && (
                        <div className='bg-green-100 text-green-800 p-4 rounded-md mb-4'>
                            Payment Successful! Your Payment ID is: <strong>{paymentId}</strong>
                        </div>
                    )}
                    {paymentCompleted ? (
                        <div className='bg-gray-100 text-gray-600 p-4 rounded-md'>
                            Payment has already been completed. Thank you!
                        </div>
                    ) : (
                        <button
                            onClick={handlePayment}
                            className={`bg-blue-500 text-white px-6 py-3 rounded-md font-semibold transition-transform transform ${loading ? 'cursor-wait' : 'hover:scale-105'}`}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Pay ₹99 with Razorpay'}
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit
                </button>
            </form>
            {/* Modal Component */}
            <PopupModel
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                formData={formData} // Pass form data to the modal
            />
        </div>
    );
}

export default RegistrationForm;

