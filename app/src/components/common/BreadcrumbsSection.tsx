import {Breadcrumbs} from "@mui/material";
import {NavLink} from "react-router-dom";
import Typography from "@mui/material/Typography";
import React from "react";

interface BreadcrumbsSectionProps {
    destBreadcrumb: string
}

const BreadcrumbsSection = ({destBreadcrumb}: BreadcrumbsSectionProps) => {
    return (
        <div className="container-fluid bg-secondary mb-5">
            <div className="d-flex flex-column align-items-center justify-content-center"
                 style={{minHeight: "300px"}}>
                <h1 className="font-weight-semi-bold text-uppercase mb-3">{destBreadcrumb}</h1>
                <Breadcrumbs
                    className='d-inline-flex display-2'
                    sx={{fontFamily: 'Manrope', letterSpacing: '-0.5px'}}
                >
                    <NavLink className='m-0 text-primary' to='/'>Trang chủ</NavLink>
                    <Typography className='m-0'
                                sx={{fontFamily: 'Manrope', letterSpacing: '-0.5px'}}>{destBreadcrumb}</Typography>
                </Breadcrumbs>
            </div>
        </div>
    )
}

export default BreadcrumbsSection;