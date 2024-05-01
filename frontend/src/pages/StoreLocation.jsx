import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import SidebarLink from "../components/SidebarLink";

const StoreLocation = () => {
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
                        Store Location
                        <div className="text-base md:text-xl font-medium">
                            Learn what we are all about
                        </div>
                    </div>
                </div>

                <div className="container mx-auto py-8 flex flex-col md:flex-row">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-4">
                            Welcome to Modcub
                        </h1>
                        <p className="text-lg mb-6">
                            Welcome to Modcub, your vibrant multivendor
                            e-commerce destination curated by the passionate
                            team at Viral Production Studio. We're not just
                            another marketplace; we're a dynamic hub where
                            creativity meets convenience, dedicated to
                            championing the talents of independent sellers from
                            around the globe.
                        </p>

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61101.047920689336!2d77.24807685457401!3d28.63368274228338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfce26ec085ef%3A0x441e32f4fa5002fb!2sRed%20Fort!5e0!3m2!1sen!2sin!4v1714538050166!5m2!1sen!2sin"
                            title="Google Maps Embedded Content"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
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

export default StoreLocation;
