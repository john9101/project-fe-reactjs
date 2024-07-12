import {Outlet} from "react-router-dom";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import React from "react";
import Navbar from "../components/common/Navbar";
import Favourite from "../pages/Favourite";

const MainLayout = () => {

    return (
        <>
            <Topbar/>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}


export default MainLayout