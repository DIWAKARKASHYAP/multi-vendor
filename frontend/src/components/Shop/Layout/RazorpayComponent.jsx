import React, { useState } from 'react';
import axios from 'axios';

const RazorpayPaymentComponent = ({ amount, onSuccess, onFailure }) => {
  const [rzpLoaded, setRzpLoaded] = useState(false);

  const handlePayment = async () => {
    if (!rzpLoaded) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => setRzpLoaded(true);
      document.body.appendChild(script);
    }

    const options = {
      key: 'rzp_test_TvkHy7JJ6Uh2vB', // Replace with your Razorpay API key
      amount: amount * 100, // amount in paise
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Purchase',
      handler: function(response) {
        console.log(response);
        // On payment success, send verification request to backend
        axios.post('http://localhost:8000/api/v2/user/create-order', {
          razorpay_payment_id: response.razorpay_payment_id,
         
          amount: amount 
        })
        .then(res => {
          onSuccess(res.data);
          console.log('babu')
        })
        .catch(err => {
          onFailure(err.response.data);
        });
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      notes: {
        address: 'Customer Address'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment}>
      Pay {amount} INR
    </button>
  );
};

export default RazorpayPaymentComponent;
