import React, { useState } from "react";
import {
    AiFillHeart,
    AiFillStar,
    AiOutlineEye,
    AiOutlineHeart,
    AiOutlineShoppingCart,
    AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
    addToWishlist,
    removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { Button } from "flowbite-react";

const ProductCard = ({ data, isEvent }) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (wishlist && wishlist.find((i) => i._id === data._id)) {
            setClick(true);
        } else {
            setClick(false);
        }
    }, [wishlist]);

    const removeFromWishlistHandler = (data) => {
        setClick(!click);
        dispatch(removeFromWishlist(data));
    };

    const addToWishlistHandler = (data) => {
        setClick(!click);
        dispatch(addToWishlist(data));
    };

    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (isItemExists) {
            toast.error("Item already in cart!");
        } else {
            if (data.stock < 1) {
                toast.error("Product stock limited!");
            } else {
                const cartData = { ...data, qty: 1 };
                dispatch(addTocart(cartData));
                toast.success("Item added to cart successfully!");
            }
        }
    };

    return (
        <>
            <div className="w-full h-[370px] bg-orange-50 shadow-xl rounded-lg  p-3 relative cursor-pointer">
                <div className="flex justify-end"></div>
                <Link
                    to={`${
                        isEvent === true
                            ? `/product/${data._id}?isEvent=true`
                            : `/product/${data._id}`
                    }`}
                >
                    <img
                        src={`${data.images && data.images[0]?.url}`}
                        alt=""
                        className="w-full h-[170px] object-contain"
                    />
                </Link>
                <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>
                <Link
                    to={`${
                        isEvent === true
                            ? `/product/${data._id}?isEvent=true`
                            : `/product/${data._id}`
                    }`}
                >
                    <h4 className="pb-3 font-[500]">
                        {data.name.length > 40
                            ? data.name.slice(0, 40) + "..."
                            : data.name}
                    </h4>

                    <div className="flex">
                        <Ratings rating={data?.ratings} />
                    </div>

                    <div className="py-2 flex items-center justify-between">
                        <div className="flex">
                            <h5 className={`${styles.productDiscountPrice}`}>
                                {data.originalPrice === 0
                                    ? data.originalPrice
                                    : data.discountPrice}{" "}
                                Rs
                            </h5>
                            <h4 className={`${styles.price}`}>
                                {data.originalPrice
                                    ? data.originalPrice + " " + " Rs"
                                    : null}
                            </h4>
                        </div>
                        {/* <span className="font-[400] text-[17px] text-[#68d284]">
                            {data?.sold_out} sold
                        </span> */}
                        <button
                            type="button"
                            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                        >
                            Buy
                        </button>{" "}
                    </div>
                </Link>

                {/* side options */}
                <div>
                    {click ? (
                        <AiFillHeart
                            size={22}
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={() => removeFromWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Remove from wishlist"
                        />
                    ) : (
                        <AiOutlineHeart
                            size={22}
                            className="cursor-pointer absolute right-2 top-5"
                            onClick={() => addToWishlistHandler(data)}
                            color={click ? "red" : "#333"}
                            title="Add to wishlist"
                        />
                    )}
                    <AiOutlineEye
                        size={22}
                        className="cursor-pointer absolute right-2 top-14"
                        onClick={() => setOpen(!open)}
                        color="#333"
                        title="Quick view"
                    />
                    <AiOutlineShoppingCart
                        size={25}
                        className="cursor-pointer absolute right-2 top-24"
                        onClick={() => addToCartHandler(data._id)}
                        color="#444"
                        title="Add to cart"
                    />
                    {open ? (
                        <ProductDetailsCard setOpen={setOpen} data={data} />
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default ProductCard;
