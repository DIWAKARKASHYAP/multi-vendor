import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardRenew from "../../components/Shop/DashboardRenew";

const ShopDashboardRenew = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={1} />
                </div>
                <DashboardRenew />
            </div>
        </div>
    );
};

export default ShopDashboardRenew;
