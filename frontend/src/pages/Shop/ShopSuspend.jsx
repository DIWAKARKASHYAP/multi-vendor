import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import Suspend from "../../components/Shop/Suspend";

const ShopSuspend = () => {
    return (
        <div className=" bg-white">
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={1} />
                </div>
                <Suspend />
            </div>
        </div>
    );
};

export default ShopSuspend;
