import React, {useEffect, useState} from 'react'
import {NavLink, Outlet, useLocation} from "react-router-dom";
// import Logo from '../components/common/Logo';
// import Link from '@mui/material/Link';
import '../assets/css/styleAccount.scss'
import Logo from "../components/common/Logo";
import {PathNamesConstant} from "../constants/pathNames.constant";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
const FormLayout = () => {
    const {pathname} = useLocation()
    const [authTitle, setAuthTitle] = useState<string | null>(null)

    useEffect(() => {
        if(pathname.includes(PathNamesConstant.login)){
            setAuthTitle("Đăng nhập tài khoản")
        }else if(pathname.includes(PathNamesConstant.register)){
            setAuthTitle("Đăng ký tài khoản")
        }
    }, [pathname])

    return (
        // <div className='tabLogin'>
        //     {/*<Link href="/" className='backToHomePage'><Logo /></Link>*/}
        //     <Outlet/>
        // </div>

        <div className="container my-5 d-flex justify-content-center align-items-center min-vh-100">
            <div className="row border rounded-5 p-3 bg-white shadow box-area">
                <div
                    className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                    style={{background: "var(--primary)"}}>
                    <div className="featured-image">
                        <Logo/>
                    </div>
                </div>
                <div className="col-md-6 right-box">
                    <div className="row align-items-center m-auto">
                        <NavLink to={PathNamesConstant.home}
                                 className='mb-3 text-primary text-decoration-none font-weight-bold py-3 px-4 bg-dark rounded-5'
                                 style={{fontSize: '1.4rem'}}>
                            <FontAwesomeIcon icon={faChevronLeft} className='mr-2'/> Quay lại lại trang chủ
                        </NavLink>
                        <div className="header-text mb-3">
                            <h2 className='font-weight-semi-bold'>Chào mừng bạn đến với Uniform Young's Style</h2>
                            <p>Rất nhiều đặc quyền và quyền lợi mua sắm đang chờ bạn</p>
                            <h3 className='text-primary font-weight-bold'>{authTitle}</h3>
                        </div>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormLayout;