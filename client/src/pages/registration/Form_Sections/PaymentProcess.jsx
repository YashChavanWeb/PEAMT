import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const PaymentProcess = () => {
  const { currentUser } = useSelector((state) => state.user); // Access current user details from Redux
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentId, setPaymentId] = useState(null); // State to store the payment ID
  const [paymentCompleted, setPaymentCompleted] = useState(false); // State to track payment completion

  // Debug log to check currentUser
  console.log('Current User:', currentUser);

  const handlePayment = () => {
    setLoading(true);
    setError(null);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
      amount: '9900', // Amount in paise (9900 paise = 99 INR)
      currency: 'INR',
      name: 'Registration Fee',
      description: 'Student Registration Payment',
      handler: function (response) {
        setLoading(false);
        setPaymentId(response.razorpay_payment_id); // Store the payment ID
        setPaymentCompleted(true); // Update payment status
        alert('Payment Successful');
      },
      prefill: {
        name: currentUser?.name || 'User Name',
        email: currentUser?.email || 'user@example.com',
        contact: currentUser?.contact || '0000000000',
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

  return (
    <div className='p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold mb-4 text-gray-700'>Student Registration</h2>
      <p className='mb-6 text-gray-600'>Please complete the payment of ₹99 to complete your registration.</p>
      {error && <div className='text-red-500 mb-4'>{error}</div>}
      {paymentId && (
        <div className='bg-green-100 text-green-800 p-4 rounded-md mb-4'>
          Payment Successful! Your Payment ID is: <strong>{paymentId}</strong>
          <br />
          <strong>Email:</strong> {currentUser?.email || 'Not available'}
        </div>
      )}
      <button
        onClick={handlePayment}
        className={`bg-blue-500 text-white px-6 py-3 rounded-md font-semibold transition-transform transform ${loading ? 'cursor-wait' : 'hover:scale-105'} ${paymentCompleted ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={loading || paymentCompleted}
      >
        {loading ? 'Processing...' : paymentCompleted ? 'Payment Completed' : 'Pay ₹99 with Razorpay'}
      </button>
    </div>
  );
};

export default PaymentProcess;
