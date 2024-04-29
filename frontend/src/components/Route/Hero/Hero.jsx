import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { Carousel } from "flowbite-react";

const Hero = () => {
    return (
        <div className={`relative min-h-[70vh] sm:min-h-[80vh] bg-no-repeat`}>
            <div className="h-[400px] sm:h-[600px]">
                <Carousel indicators={false}>
                    <img
                        src="https://img.freepik.com/premium-photo/glass-wall-modern-office-lobby-interior_6091-4326.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714089600&semt=ais"
                        alt="..."
                    />
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww"
                        alt="..."
                    />
                    <img
                        src="https://i.pinimg.com/564x/69/87/6a/69876a2c445a4d4c95775610b9ad8bf8.jpg"
                        alt="..."
                    />
                    <img
                        src="https://img.freepik.com/premium-photo/glass-wall-modern-office-lobby-interior_6091-4326.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1714089600&semt=ais"
                        alt="..."
                    />
                </Carousel>
            </div>
            <div
                className={`${styles.section} w-[90%] sm:w-[60%] sm:absolute top-1/4 left-1/4`}
            >
                <h1
                    className={`text-[25px] sm:text-[35px] md:text-[40px] lg:text-[60px] leading-[1.2] text-[#3d3a3a] font-[600] capitalize`}
                >
                    Best Collection for <br /> home Decoration
                </h1>
                <p className="pt-5 text-[14px] sm:text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Beatae, assumenda? Quisquam itaque <br /> exercitationem
                    labore vel, dolore quidem asperiores, laudantium temporibus
                    soluta optio consequatur <br /> aliquam deserunt officia.
                    Dolorum saepe nulla provident.
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[14px] sm:text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;
