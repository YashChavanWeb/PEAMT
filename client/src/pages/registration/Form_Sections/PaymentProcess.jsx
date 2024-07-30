import React, { useState } from 'react';
import axios from 'axios';

const PaymentProcess = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // Create an order
      const orderResponse = await axios.post('/api/payment/create-order', { amount });

      const { id: order_id, currency, amount: orderAmount } = orderResponse.data;

      // Open Razorpay payment interface
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Access the Razorpay Key ID
        amount: orderAmount,
        currency: currency,
        name: "Competitive Exams Platform",
        description: "Application Fee Payment",
        order_id: order_id,
        handler: async function (response) {
          // Verify payment on server
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          const result = await axios.post('/api/payment/verify-payment', paymentData);
          alert(result.data.status);
        },
        prefill: {
          name: "Your Name",
          email: "your-email@example.com",
          contact: "1234567890"
        },
        notes: {
          address: "Your Address"
        },
        theme: {
          color: "#3399cc"
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error: ", error);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Payment Process</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handlePayment}
          className={`w-full p-3 text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentProcess;
