import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const ApproveProducts = () => {
    const [data, setData] = useState([]);

    axios
        .get(`${server}/product/admin-all-products`, {
            withCredentials: true,
        })
        .then((res) => {
            setData(res.data.products);
        });
    useEffect(() => {}, []);

    const approveProduct = (id) => {
        // Perform the logic for approving the product
        axios
            .post(`${server}/product/approve-product`, { productId: id })
            .then((res) => {
                console.log(res.data.message);
                // Optionally, you can update the data in your state or trigger a refresh
            })
            .catch((error) => {
                console.error("Error approving product:", error);
                // Optionally, you can display an error message to the user
            });
    };

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 180,
            flex: 1.4,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 100,
            flex: 0.6,
        },
        {
            field: "Stock",
            headerName: "Stock",
            type: "number",
            minWidth: 80,
            flex: 0.5,
        },
        {
            field: "approve",
            headerName: "Approve",
            minWidth: 120,
            flex: 0.6,
            renderCell: (params) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => approveProduct(params.row.id)}
                    >
                        Approve
                    </Button>
                );
            },
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 100,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/product/${params.id}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const rows = data
        .filter((item) => !item.approve) // Filter out rows where approve is true
        .map((item) => ({
            id: item._id,
            name: item.name,
            price: "US$ " + item.discountPrice,
            Stock: item.stock,
            approve: item.approve,
        }));

    return (
        <>
            <div className="w-full mx-8 pt-1 mt-10 bg-white">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>
        </>
    );
};

export default ApproveProducts;
