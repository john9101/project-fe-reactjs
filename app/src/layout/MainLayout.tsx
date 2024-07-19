import {Outlet, useLocation} from "react-router-dom";
import Topbar from "../components/common/Topbar";
import Footer from "../components/common/Footer";
import {useEffect, useState} from "react";
import Navbar from "../components/common/Navbar";
import BreadcrumbsSection from "../components/common/BreadcrumbsSection";
import {PathNamesConstant} from "../constants/pathNames.constant";
import BackToTopButton from "../components/common/BackToTopButton";

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
        }else if(pathname.includes(PathNamesConstant.cart)){
            setDestBreadcrumb("Giỏ hàng")
        }else if(pathname.includes(PathNamesConstant.wishlist)){
            setDestBreadcrumb("Đồng phục yêu thích")
        }
    }, [pathname])

    return (
        <>
            <Topbar/>
            <Navbar/>
            {
                pathname !== PathNamesConstant.home && !pathname.includes(PathNamesConstant.feature) &&
                !pathname.includes(PathNamesConstant.category) && !pathname.includes(PathNamesConstant.shop) &&
                !pathname.includes(PathNamesConstant.search) && !pathname.includes(PathNamesConstant.checkout) &&
                <BreadcrumbsSection destBreadcrumb={destBreadcrumb!}/>
            }
            <Outlet/>
            <Footer/>
            <BackToTopButton/>
        </>
    )
}


export default MainLayout