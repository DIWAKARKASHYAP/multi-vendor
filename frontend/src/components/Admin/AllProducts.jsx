import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

const AllProducts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`${server}/product/admin-all-products`, {
                withCredentials: true,
            })
            .then((res) => {
                setData(res.data.products);
            });
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`${server}/product/delete-product/${id}`)
            .then((res) => {
                if (res.data.success) {
                    // Remove the deleted product from the data
                    setData(data.filter((product) => product._id !== id));
                    console.log(res.data.message);
                } else {
                    console.error(res.data.message);
                }
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
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
            field: "status",
            headerName: "Status",
            minWidth: 120,
            flex: 0.6,
            renderCell: (params) => {
                return params.row.approve ? "Approved" : "Unapproved";
            },
        },
        {
            field: "Preview",
            flex: 0.8,
            minWidth: 50,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/product/${params.id}`}>
                        <Button>
                            <AiOutlineEye size={20} />
                        </Button>
                    </Link>
                );
            },
        },
        {
            field: "delete",
            headerName: "Delete",
            minWidth: 50,
            flex: 0.6,
            renderCell: (params) => {
                return (
                    <Button onClick={() => handleDelete(params.row.id)}>
                        <AiOutlineDelete size={20} />
                    </Button>
                );
            },
        },
    ];

    const rows = data.map((item) => ({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        approve: item.approve,
    }));

    return (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
            {data.length === 0 ? (
                <p>Loading Products...</p>
            ) : (
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                />
            )}
        </div>
    );
};

export default AllProducts;
