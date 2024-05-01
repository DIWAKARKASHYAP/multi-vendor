import React from "react";
import styles from "../styles/styles";
import { Link } from "react-router-dom";

const SidebarLink = () => {
    const SideLinks = ({ label, href }) => {
        return (
            <li className="mb-2">
                <Link
                    to={href}
                    className={`${styles.sidebarLink} hover:${styles.sidebarLinkHover}`}
                >
                    {label}
                </Link>
            </li>
        );
    };
    return (
        <>
            <div className="">
                <ul>
                    <SideLinks label="About Us" href="/about" />
                    <SideLinks label="Terms" href="/terms" />
                    <SideLinks label="Privacy Policy" href="/privacy" />
                    <SideLinks label="Store Location" href="/store-location" />
                    {/* Additional sidebar links here */}
                </ul>
            </div>
        </>
    );
};
export default SidebarLink;
