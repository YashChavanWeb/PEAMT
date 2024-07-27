// PaymentProcess.js
import React, { useState } from 'react';

const PaymentProcess = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', paymentDetails);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Payment Process</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
              placeholder="123"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentProcess;
