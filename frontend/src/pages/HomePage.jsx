import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <div className=" w-[1400px] h-1 my-20 bg-amber-900  rounded-full m-auto"></div>
            <Categories />
            <div className=" w-[1400px] h-1 my-20 bg-amber-900  rounded-full m-auto"></div>

            <BestDeals />
            <div className=" w-[1400px] h-1 my-20 bg-amber-900  rounded-full m-auto"></div>
            <Events />
            <div className=" w-[1400px] h-1 my-20 bg-amber-900  rounded-full m-auto"></div>
            <FeaturedProduct />
            {/* <Sponsored /> */}
            <Footer />
        </div>
    );
};

export default HomePage;
