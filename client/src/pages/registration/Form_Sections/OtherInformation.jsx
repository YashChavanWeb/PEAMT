import React, { useState, useEffect } from "react";
import axios from "axios";

const CombinedForm = ({ handleNext }) => {
  const [formData, setFormData] = useState({
    // Permanent Address
    permanentAddress: {
      country: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    },
    // Corresponding Address
    correspondingAddress: {
      country: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    },
    // Parent Details
    fatherName: "",
    fatherOccupation: "",
    fatherIsSalaried: "",
    motherName: "",
    motherOccupation: "",
    motherIsSalaried: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

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
      fetchCities(
        formData.permanentAddress.country,
        formData.permanentAddress.state
      );
    }
  }, [formData.permanentAddress.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const [addressType, field] = name.split(".");
    setFormData((prevState) => ({
      ...prevState,
      [addressType]: {
        ...prevState[addressType],
        [field]: value,
      },
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check if any required fields are empty for both addresses and parent details
    for (let key in formData) {
      if (typeof formData[key] === "object") {
        for (let field in formData[key]) {
          if (formData[key][field] === "" && field !== "district") {
            isValid = false;
            formErrors["form"] = "Please fill in all required details.";
            break;
          }
        }
      } else if (
        formData[key] === "" &&
        (key.includes("Name") ||
          key.includes("Occupation") ||
          key.includes("Salaried"))
      ) {
        isValid = false;
        formErrors["form"] = "Please fill in all required details.";
        break;
      }
    }

    setError(formErrors);
    return isValid;
  };

  const handleNextClick = () => {
    setIsFormTouched(true);
    if (validateForm()) {
      setError(false);
      handleNext();
    } else {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-5">
      {/* Parent Details */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Parent Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fatherName"
              className="block text-sm font-medium text-gray-700"
            >
              Father's Name
            </label>
            <input
              id="fatherName"
              name="fatherName"
              type="text"
              value={formData.fatherName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Father Name"
            />
          </div>
          <div>
            <label
              htmlFor="fatherOccupation"
              className="block text-sm font-medium text-gray-700"
            >
              Father's Occupation
            </label>
            <input
              id="fatherOccupation"
              name="fatherOccupation"
              type="text"
              value={formData.fatherOccupation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Father's Occupation"
            />
          </div>
          <div>
            <label
              htmlFor="fatherIsSalaried"
              className="block text-sm font-medium text-gray-700"
            >
              Is Father Salaried?
            </label>
            <select
              id="fatherIsSalaried"
              name="fatherIsSalaried"
              value={formData.fatherIsSalaried}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="motherName"
              className="block text-sm font-medium text-gray-700"
            >
              Mother's Name
            </label>
            <input
              id="motherName"
              name="motherName"
              type="text"
              value={formData.motherName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Mother's Name"
            />
          </div>
          <div>
            <label
              htmlFor="motherOccupation"
              className="block text-sm font-medium text-gray-700"
            >
              Mother's Occupation
            </label>
            <input
              id="motherOccupation"
              name="motherOccupation"
              type="text"
              value={formData.motherOccupation}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
              placeholder="Mother's Occupation"
            />
          </div>
          <div>
            <label
              htmlFor="motherIsSalaried"
              className="block text-sm font-medium text-gray-700"
            >
              Is Mother Salaried?
            </label>
            <select
              id="motherIsSalaried"
              name="motherIsSalaried"
              value={formData.motherIsSalaried}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Option
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">Address and Other Information</h2>
      <hr className="mb-4" />

      {/* Error Message */}
      {showPopup && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error.form}</span>
        </div>
      )}

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
              <option value="" disabled>
                Select Country
              </option>
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
              <option value="" disabled>
                Select State
              </option>
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
              <option value="" disabled>
                Select City
              </option>
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

      {/* Corresponding Address */}
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2">Corresponding Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="correspondingAddress.country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select
              id="correspondingAddress.country"
              name="correspondingAddress.country"
              value={formData.correspondingAddress.country}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="correspondingAddress.state"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <select
              id="correspondingAddress.state"
              name="correspondingAddress.state"
              value={formData.correspondingAddress.state}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select State
              </option>
              {states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="correspondingAddress.city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <select
              id="correspondingAddress.city"
              name="correspondingAddress.city"
              value={formData.correspondingAddress.city}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="correspondingAddress.pincode"
              className="block text-sm font-medium text-gray-700"
            >
              Pincode
            </label>
            <input
              id="correspondingAddress.pincode"
              name="correspondingAddress.pincode"
              type="text"
              value={formData.correspondingAddress.pincode}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleNextClick}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CombinedForm;
