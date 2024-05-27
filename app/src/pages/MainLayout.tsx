import {Outlet} from "react-router-dom";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import React from "react";

const MainLayout = () => {

    return (
        <>
            <Topbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}



export default MainLayout