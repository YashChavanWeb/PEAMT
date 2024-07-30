import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance with your keys
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create an order
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: "receipt_order_74394"
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify payment
export const verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    res.json({ status: "success", order_id: razorpay_order_id, payment_id: razorpay_payment_id });
  } else {
    res.status(400).json({ status: "failure" });
  }
};
