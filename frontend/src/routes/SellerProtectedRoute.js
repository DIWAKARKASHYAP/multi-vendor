import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
    const { isLoading, isSeller, seller } = useSelector(
        (state) => state.seller
    );

    // console.log(seller);

    if (isLoading === true) {
        return <Loader />;
    } else {
        if (!isSeller) {
            return <Navigate to={`/shop-login`} replace />;
        } else if (seller.suspend) {
            return <Navigate to={`/suspend`} replace />;
        } else if (seller && new Date(seller.expirationDate) < new Date()) {
            return <Navigate to={`/dashboard-renew`} replace />;
        }
        return children;
    }
};

export default SellerProtectedRoute;
