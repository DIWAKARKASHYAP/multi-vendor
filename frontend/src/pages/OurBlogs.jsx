import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import SidebarLink from "../components/SidebarLink";
import Blog from "../components/Blog";

const OurBlogs = () => {
    // Placeholder data until backend integration
    const demoImages = [
        "https://media.istockphoto.com/id/1501103626/photo/defocused-background-image-of-a-spacious-hallway-in-a-modern-office.webp?b=1&s=170667a&w=0&k=20&c=3HUg5TdHHWq4rmYJ7lA0Jn9koAesfCrO4lFiEaUFKuI=",
        "https://www.maidwale.com/images/about/istockphoto-1283119095-170667a.jpg",
        "https://www.maidwale.com/images/about/istockphoto-1283119095-170667a.jpg",
    ];

    return (
        <>
            <div className="font-Poppins">
                <Header activeHeading={0} />
                <div className="relative">
                    <img
                        src={`${demoImages[0]}`}
                        alt="Demo Image 1"
                        className="w-full h-auto rounded-md mb-6 md:mb-0 h-[700px]"
                    />
                    <div className="absolute bottom-10 md:bottom-56 left-4 md:left-40 text-gray-100 text-5xl md:text-6xl font-Poppins font-bold">
                        Our Blogs
                        <div className="text-base md:text-xl font-medium">
                            Learn what we are all about
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-8 flex flex-col md:flex-row">
                    <div className="max-w-4xl mx-auto px-4">
                        <Blog />
                        <Blog />
                        <Blog />
                        <Blog />
                    </div>

                    {/* Show sidebar only on medium and larger screens */}
                    <div className="w-full md:w-1/4 ml-0 md:ml-8">
                        <SidebarLink />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default OurBlogs;
