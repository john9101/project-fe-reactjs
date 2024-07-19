import {Outlet, useLocation} from "react-router-dom";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import {useEffect, useState} from "react";
import Navbar from "../components/common/Navbar";
import BreadcrumbsSection from "../components/common/BreadcrumbsSection";
import {PathNamesConstant} from "../constants/pathNames.constant";

const MainLayout = () => {
    const [destBreadcrumb, setDestBreadcrumb] = useState<string | null>(null);
    const {pathname} = useLocation()

    useEffect(() => {
        if(pathname.includes(PathNamesConstant.uniform)){
            setDestBreadcrumb("Chi tiết đồng phục")
        }else if(pathname.includes(PathNamesConstant.aboutUs)){
            setDestBreadcrumb("Giới thiệu")
        }else if(pathname.includes(PathNamesConstant.contactUs)){
            setDestBreadcrumb("Liên hệ")
        }
    }, [pathname])

    return (
        <>
            <Topbar/>
            <Navbar/>
            {
                pathname !== PathNamesConstant.home && !pathname.includes(PathNamesConstant.feature) &&
                !pathname.includes(PathNamesConstant.category) && !pathname.includes(PathNamesConstant.shop) &&
                !pathname.includes(PathNamesConstant.search) &&
                <BreadcrumbsSection destBreadcrumb={destBreadcrumb!}/>
            }
            <Outlet/>
            <Footer/>
        </>
    )
}


export default MainLayout