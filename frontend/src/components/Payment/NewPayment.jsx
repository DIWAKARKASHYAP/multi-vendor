import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import RazorpayClient from "./RazorpayClient";

import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";

const NewPayment = () => {
    const [orderData, setOrderData] = useState([]);
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    console.log("--------------------------------------");
    console.log(orderData);
    console.log("--------------------------------------");

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem("latestOrder"));
        setOrderData(orderData);
    }, []);

    const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
        paymentInfo: {
            type: "Pay with Razorpay",
        },
    };

    const cashOnDeliveryHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        order.paymentInfo = {
            type: "RazorPay",
        };

        await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
                setOpen(false);
                navigate("/order/success");
                toast.success("Order successful!");
                localStorage.setItem("cartItems", JSON.stringify([]));
                localStorage.setItem("latestOrder", JSON.stringify([]));
                window.location.reload();
            });
    };

    return (
        <div className="w-full flex flex-col items-center py-8">
            <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
                <div className="w-full 800px:w-[65%]">
                    <PaymentInfo
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        cashOnDeliveryHandler={cashOnDeliveryHandler}
                        orderData={orderData}
                        order={order}
                    />
                </div>
                <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
                    <CartData orderData={orderData} />
                </div>
            </div>
        </div>
    );
};

const PaymentInfo = ({
    user,
    open,
    setOpen,
    cashOnDeliveryHandler,
    orderData,
    order,
}) => {
    const [select, setSelect] = useState(1);

    return (
        <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
            {/* cash on delivery */}
            <div>
                <div className="flex w-full pb-5 border-b mb-2">
                    <div
                        className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
                        onClick={() => setSelect(3)}
                    >
                        {select === 3 ? (
                            <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
                        ) : null}
                    </div>
                    <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
                        Pay with Razorpay
                    </h4>
                </div>

                {/* cash on delivery */}
                {select === 3 ? (
                    <div className="w-full flex">
                        <RazorpayClient
                            amount={orderData?.totalPrice}
                            order={order}
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
};

const CartData = ({ orderData }) => {
    const shipping = orderData?.shipping?.toFixed(2);
    return (
        <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">
                    subtotal:
                </h3>
                <h5 className="text-[18px] font-[600]">
                    ${orderData?.subTotalPrice}
                </h5>
            </div>
            <br />
            <div className="flex justify-between">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">
                    shipping:
                </h3>
                <h5 className="text-[18px] font-[600]">${shipping}</h5>
            </div>
            <br />
            <div className="flex justify-between border-b pb-3">
                <h3 className="text-[16px] font-[400] text-[#000000a4]">
                    Discount:
                </h3>
                <h5 className="text-[18px] font-[600]">
                    {orderData?.discountPrice
                        ? "$" + orderData.discountPrice
                        : "-"}
                </h5>
            </div>
            <h5 className="text-[18px] font-[600] text-end pt-3">
                ${orderData?.totalPrice}
            </h5>
            <br />
        </div>
    );
};

export default NewPayment;
