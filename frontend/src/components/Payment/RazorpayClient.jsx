import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const RazorpayClient = ({ amount, order }) => {
    const [rzpLoaded, setRzpLoaded] = useState(false);
    const navigate = useNavigate();

    // console.log("------------------\\-------------------");
    // console.log(order);
    const { seller } = useSelector((state) => state.seller);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loadSeller());
    }, [dispatch]);
    const handlePayment = async () => {
        if (!rzpLoaded) {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => setRzpLoaded(true);
            document.body.appendChild(script);
        }

        const handleOrder = async () => {
            // Add logic to handle renewing the subscription for the next month
            // console.log("handlerenew is working");
            await axios
                .post(`${server}/order/create-order`, order, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((res) => {
                    // setOpen(false);
                    navigate("/order/success");
                    toast.success("Order successful!");
                    localStorage.setItem("cartItems", JSON.stringify([]));
                    localStorage.setItem("latestOrder", JSON.stringify([]));
                    window.location.reload();
                })
                .then((res) => {
                    toast.success(res.data.message);
                    dispatch(loadSeller());
                })
                .catch((error) => {
                    toast.error(error);
                });

            // console.log("Renew for Next Month");
        };

        const options = {
            key: "rzp_test_JPBKvtfFBllt9C", // Replace with your Razorpay API key
            amount: amount * 100, // amount in paise
            currency: "INR",
            name: "Modcub",
            description: "Payment for Purchase",
            handler: function (response) {
                // console.log(response);
                // On payment success, send verification request to backend
                axios
                    .post(`${server}/payment/razorpay-process`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        amount: amount,
                    })
                    .then((res) => {
                        handleOrder();
                    })
                    .catch((err) => {
                        console.log("handleorder is fail", err);
                    });
            },
            prefill: {
                name: order.user.name,
                email: order.user.email,
                contact: ` 91-${order.shippingAddress.phone}`,
            },
            notes: {
                address: `${order.shippingAddress.address1},${order.shippingAddress.address2},${order.shippingAddress.city},(${order.shippingAddress.zipCode}),${order.shippingAddress.country}`,
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
            className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            onClick={handlePayment}
        >
            Pay Now
            {/* {amount} INR */}
        </button>
    );
};

export default RazorpayClient;
