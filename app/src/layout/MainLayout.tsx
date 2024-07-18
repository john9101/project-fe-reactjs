import {Outlet, useLocation} from "react-router-dom";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import {useEffect, useState} from "react";
import Navbar from "../components/common/Navbar";
import BreadcrumbsSection from "../components/common/BreadcrumbsSection";

const MainLayout = () => {
    const [destBreadcrumb, setDestBreadcrumb] = useState<string | null>(null);
    const {pathname} = useLocation()

    useEffect(() => {
        if(pathname.includes("products")){
            setDestBreadcrumb("Chi tiết sản phẩm")
        }else if(pathname.includes("about-us")){
            setDestBreadcrumb("Giới thiệu")
        }else if(pathname.includes('contact-us')){
            setDestBreadcrumb("Liên hệ")
        }
    }, [pathname])

    return (
        <>
            <Topbar/>
            <Navbar/>
            {
                pathname !== '/' && !pathname.includes('feature') && !pathname.includes('category') &&
                !pathname.includes('shop') && !pathname.includes('search') &&
                <BreadcrumbsSection destBreadcrumb={destBreadcrumb!}/>
            }
            <Outlet/>
            <Footer/>
        </>
    )
}


export default MainLayout