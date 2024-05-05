import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/sellers";
import { Link } from "react-router-dom";

const AllSellers = () => {
    const dispatch = useDispatch();
    const { sellers } = useSelector((state) => state.seller);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        dispatch(getAllSellers());
    }, [dispatch]);

    const handleDelete = async (id) => {
        await axios
            .delete(`${server}/shop/delete-seller/${id}`, {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message);
            });

        dispatch(getAllSellers());
    };

    // console.log(sellers);
    // const handleSuspend = async (id) => {
    const handleSuspend = async (id, suspend) => {
        if (suspend) {
            try {
                // Make a PUT request to suspend the seller
                await axios.put(`${server}/shop/remove-suspend-seller/${id}`, {
                    withCredentials: true,
                });

                // Show a success message
                toast.success("User suspended successfully");

                // Update the sellers' data after suspension
                dispatch(getAllSellers());
            } catch (error) {
                // Handle errors if any
                console.error("Error suspending user:", error);
                // Show an error message
                toast.error("Failed to suspend user");
            }
        } else {
            try {
                // Make a PUT request to suspend the seller
                await axios.put(`${server}/shop/suspend-seller/${id}`, {
                    withCredentials: true,
                });

                // Show a success message
                toast.success("User suspended successfully");

                // Update the sellers' data after suspension
                dispatch(getAllSellers());
            } catch (error) {
                // Handle errors if any
                console.error("Error suspending user:", error);
                // Show an error message
                toast.error("Failed to suspend user");
            }
        }
    };
    // };

    const columns = [
        { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },
        { field: "name", headerName: "Name", minWidth: 130, flex: 0.7 },
        { field: "email", headerName: "Email", minWidth: 130, flex: 0.7 },
        {
            field: "address",
            headerName: "Seller Address",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "joinedAt",
            headerName: "Joined At",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: "previewShop",
            headerName: "Preview Shop",
            minWidth: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Link to={`/shop/preview/${params.id}`}>
                    <Button>
                        <AiOutlineEye size={20} />
                    </Button>
                </Link>
            ),
        },
        {
            field: "deleteSeller",
            headerName: "Delete Seller",
            minWidth: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Button onClick={() => setUserId(params.id) || setOpen(true)}>
                    <AiOutlineDelete size={20} />
                </Button>
            ),
        },
        {
            field: "suspendUser",
            headerName: "Suspend",
            minWidth: 150,
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <Button
                    onClick={() => handleSuspend(params.id, params.row.suspend)}
                >
                    {params.row.suspend ? "Remove Suspend" : "Suspend"}
                </Button>
            ),
        },
    ];
    const row = [];
    sellers &&
        sellers.forEach((item) => {
            row.push({
                id: item._id,
                name: item?.name,
                email: item?.email,
                joinedAt: item.createdAt.slice(0, 10),
                address: item.address,
                suspend: item.suspend,
            });
        });

    return (
        <div className="w-full flex justify-center pt-5">
            <div className="w-[97%]">
                <h3 className="text-[22px] font-Poppins pb-2">All Sellers</h3>
                <div className="w-full min-h-[45vh] bg-white rounded">
                    <DataGrid
                        rows={row}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
                {open && (
                    <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                        <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                            <div className="w-full flex justify-end cursor-pointer">
                                <RxCross1
                                    size={25}
                                    onClick={() => setOpen(false)}
                                />
                            </div>
                            <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                                Are you sure you want to delete this user?
                            </h3>
                            <div className="w-full flex items-center justify-center">
                                <div
                                    className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                                    onClick={() => setOpen(false)}
                                >
                                    cancel
                                </div>
                                <div
                                    className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                                    onClick={() =>
                                        setOpen(false) || handleDelete(userId)
                                    }
                                >
                                    confirm
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllSellers;
