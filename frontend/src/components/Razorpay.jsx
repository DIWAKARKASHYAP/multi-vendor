import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../server";
import { toast } from "react-toastify";
import { loadSeller } from "../redux/actions/user";
import styles from "../styles/styles";

const Razorpay = ({ amount, onSuccess, onFailure }) => {
    const [rzpLoaded, setRzpLoaded] = useState(false);

    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loadSeller());
    }, [dispatch]);

    // console.log("===========================");
    // console.log(seller);
    // console.log("===========================");
    const handlePayment = async () => {
        if (!rzpLoaded) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => setRzpLoaded(true);
            document.body.appendChild(script);
        }

        const handleRenew = async () => {
            // Add logic to handle renewing the subscription for the next month
            await axios
                .put(
                    `${server}/shop/update-expiration`,
                    {
                        sellerId: seller._id,
                        months: 1,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    toast.success(res.data.message);
                    dispatch(loadSeller());
                })
                .catch((error) => {
                    toast.error(error);
                });

            console.log("Renew for Next Month");
        };

        const options = {
            key: "rzp_test_JPBKvtfFBllt9C", // Replace with your Razorpay API key
            amount: amount * 100, // amount in paise
            currency: "INR",
            name: "Modcub",
            description: "Payment for Renewal",
            handler: function (response) {
                // console.log(response);
                // On payment success, send verification request to backend
                axios
                    .post(`${server}/shop/renew-subscription`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        amount: amount,
                    })
                    .then((res) => {
                        onSuccess(res.data);
                        handleRenew();
                    })
                    .catch((err) => {
                        onFailure(err.response.data);
                    });
            },
            prefill: {
                name: seller.name,
                email: seller.email,
                contact: `91-${seller.phoneNumber}`,
            },
            notes: {
                address: seller.address,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    // 267007
    return (
        <button
            className={`${styles.button} !bg-[#ab662e] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            onClick={handlePayment}
        >
            Pay Now
            {/* {amount} INR */}
        </button>
    );
};

export default Razorpay;
