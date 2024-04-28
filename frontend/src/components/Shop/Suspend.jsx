import React from "react";

const Suspend = () => {
    return (
        <div className="w-full p-8 flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-4">Account Suspended</h3>
            <p className="text-lg text-gray-700">
                We're sorry, but your account has been suspended. Please contact
                support for further assistance.
            </p>
        </div>
    );
};

export default Suspend;
