import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import Razorpay from "../../components/Razorpay";

const DashboardRenew = () => {
    const { seller } = useSelector((state) => state.seller);
    console.log(seller);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loadSeller());
    }, [dispatch]);
    // Function to handle renew button click
    // const handleRenew = async () => {
    //     // Add logic to handle renewing the subscription for the next month
    //     await axios
    //         .put(
    //             `${server}/shop/update-expiration`,
    //             {
    //                 sellerId: seller._id,
    //                 months: 1,
    //             },
    //             { withCredentials: true }
    //         )
    //         .then((res) => {
    //             toast.success(res.data.message);
    //             dispatch(loadSeller());
    //         })
    //         .catch((error) => {
    //             toast.error(error);
    //         });

    //     console.log("Renew for Next Month");
    // };

    // Handle payment success
    const handlePaymentSuccess = (response) => {
        console.log("Payment Successful:", response);
        // Handle success, maybe show a success message to the user
    };

    // Handle payment failure
    const handlePaymentFailure = (error) => {
        console.error("Payment Failed:", error);
        // Handle failure, maybe show an error message to the user
    };

    // Function to calculate whether the expiration date is within the next 7 days
    const isExpiringSoon = (expirationDate) => {
        const currentDate = new Date();
        const expiration = new Date(expirationDate);
        const differenceInDays =
            (expiration - currentDate) / (1000 * 3600 * 24);
        return differenceInDays <= 7;
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Dashboard Renew</h2>
                <div className="mb-4">
                    <p className="font-semibold">Name:</p>
                    <p>{seller.name}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Email:</p>
                    <p>{seller.email}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Address:</p>
                    <p>{seller.address}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Phone Number:</p>
                    <p>{seller.phoneNumber}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Zip Code:</p>
                    <p>{seller.zipCode}</p>
                </div>
                <div className="mb-4">
                    <p className="font-semibold">Expiration Date:</p>
                    <p
                        className={
                            isExpiringSoon(seller.expirationDate)
                                ? "text-red-500 font-bold"
                                : ""
                        }
                    >
                        {new Date(seller.expirationDate).toLocaleDateString()}
                        {isExpiringSoon(seller.expirationDate) &&
                            " (Renewal Due Soon)"}
                    </p>
                </div>
                {/* <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    onClick={handleRenew}
                >
                    Renew for Next Month
                </button> */}
                {/* Razorpay Payment Component */}
                <Razorpay
                    amount={100} // Amount in INR
                    onSuccess={handlePaymentSuccess}
                    onFailure={handlePaymentFailure}
                />
            </div>
        </div>
    );
};

export default DashboardRenew;

// atQzPRO0UhK5iTXxLBs78tMc
