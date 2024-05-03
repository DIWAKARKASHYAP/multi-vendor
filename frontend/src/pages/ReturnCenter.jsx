import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import SidebarLink from "../components/SidebarLink";

const ReturCenter = () => {
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
                        Retur Center
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
                        <p className="text-lg mb-6">
                            At the heart of Modcub is Viral Production Studio, a
                            forward-thinking collective committed to fostering
                            innovation and originality in the digital sphere.
                            With a keen eye for emerging trends and a commitment
                            to excellence, our team tirelessly curates a diverse
                            array of products that inspire and delight.
                        </p>
                        <p className="text-lg mb-6">
                            Our vision is to redefine the online shopping
                            experience by connecting discerning shoppers with
                            unique products that spark joy and inspire
                            imagination. By empowering independent sellers and
                            fostering collaboration, we create a vibrant
                            ecosystem where creativity thrives and boundaries
                            are broken.
                        </p>
                        <p className="text-lg mb-6">
                            Quality is our top priority. Every product featured
                            on [Platform Name] undergoes a rigorous selection
                            process to ensure it meets our standards of
                            excellence. From the finest materials to impeccable
                            craftsmanship, we stand behind the quality and
                            authenticity of each item available for purchase.
                        </p>
                        <p className="text-lg mb-6">
                            We believe in the power of small businesses and
                            independent creators to make a big impact. That's
                            why we're dedicated to providing a platform where
                            sellers can showcase their talents and reach a
                            global audience. With customizable storefronts and
                            marketing resources, we're here to help you turn
                            your passion into profit.
                        </p>
                        <p className="text-lg mb-6">
                            Shopping with Modcub is a seamless experience. Our
                            user-friendly interface, advanced search filters,
                            personalized recommendations, and secure payment
                            options make it easy to find and enjoy your new
                            favorites. Plus, with fast and reliable shipping,
                            your treasures will be on their way to you in no
                            time.
                        </p>
                        <p className="text-lg mb-6">
                            Join the Modcub community today and discover a world
                            of possibilities. Whether you're a seller looking to
                            expand your reach or a shopper in search of
                            something special, we invite you to be a part of our
                            growing community of creators and connoisseurs.
                            Welcome to Modcub. Welcome to the future of
                            e-commerce.
                        </p>{" "}
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

export default ReturCenter;
