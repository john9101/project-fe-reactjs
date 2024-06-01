import React from 'react'
import { Outlet } from "react-router-dom";
import Logo from '../components/common/Logo';
import Link from '@mui/material/Link';
import '../assets/css/styleAccount.scss'
const FormLayout = () => {
    return (
        <div className='tabLogin'>
            <Link href="/" className='backToHomePage'><Logo /></Link>
            <Outlet />
        </div>

    )
}
export default FormLayout;