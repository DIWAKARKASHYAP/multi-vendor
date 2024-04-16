import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AllAdmins from "../components/Admin/AllAdmins";

const AdminDashboardAdmin = () => {
    return (
        <div>
            <AdminHeader />
            <div className="w-full flex">
                <div className="flex items-start justify-between w-full">
                    <div className="w-[80px] 800px:w-[330px]">
                        <AdminSideBar active={1} />
                    </div>
                    <AllAdmins />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardAdmin;
