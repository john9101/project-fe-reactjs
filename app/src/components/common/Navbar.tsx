import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import HomeCarosel from "../carousel/HomeCarousel";
import React, { useState, useEffect } from "react";
import CategoryList from "./CategoriesList";
import { useAuth } from "../../context/UserContext";
import defaultAvatar from '../../assets/img/default-avatar.jpg';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authState, logout } = useAuth();
    const { isAuthenticated, user } = authState;
    const [, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            authState.user = parsedUser;
        }
    });

    const handleClick = () => {
        setOpen(!open);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        handleCloseUserMenu();
        navigate('/');
    };

    const handleListItemClick = (action?: () => void) => {
        if (action) {
            action();
        }
        setOpen(false); // Đóng danh sách khi click vào ListItemButton
    };

    const settings = [
        { label: 'Profile', path: `/personal/${user?._id}` },
        { label: 'Đơn hàng của tôi', path: '/orders' },
        { label: 'Nhận xét của tôi', path: '/reviews' },
        { label: 'Sản phẩm đã xem', path: '/viewed-products' },
        { label: 'Logout', action: handleLogout }
    ];

    return (
        <div className="container-fluid mb-5">
            <div className="row border-top px-xl-5">
                <CategoryList />
                <div className="col-lg-8">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <NavLink to="/" className="text-decoration-none d-block d-lg-none">
                            <Logo />
                        </NavLink>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to="/" className="nav-item nav-link active">Trang chủ</NavLink>
                                <NavLink to="/shop" className="nav-item nav-link">Cửa hàng</NavLink>
                                <NavLink to="/about-us" className="nav-item nav-link">Giới thiệu</NavLink>
                                <NavLink to="/contact-us" className="nav-item nav-link">Liên hệ</NavLink>
                            </div>
                            <div>
                                {isAuthenticated && user ? (
                                    <List
                                        component="nav"
                                        aria-labelledby="nested-list-subheader"
                                    >
                                        <ListItemButton onClick={handleClick} style={{ display: 'flex', columnGap: '5px' }}>
                                            <span>{user.fullName}</span>
                                            <Avatar alt={user.fullName} src={user.avatar || defaultAvatar} />
                                            <ListItemText />
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </ListItemButton>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding style={{ position: 'absolute', zIndex: '999', width: '100%' }}>
                                                {settings.map((item, index) => (
                                                    <ListItemButton
                                                        key={index}
                                                        style={{ borderBottom: '1px solid #d3ebff', backgroundColor: 'white' }}
                                                        onClick={() => handleListItemClick(item.action)}
                                                    >
                                                        <ListItemText>
                                                            {item.path ? (
                                                                <NavLink
                                                                    to={item.path}
                                                                    style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'left' }}
                                                                >
                                                                    <Typography textAlign="left">{item.label}</Typography>
                                                                </NavLink>
                                                            ) : (
                                                                <Typography textAlign="left">{item.label}</Typography>
                                                            )}
                                                        </ListItemText>
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Collapse>
                                    </List>
                                ) : (
                                    <div style={{ display: 'flex' }}>
                                        <NavLink to="/account/login" className="nav-item nav-link">Đăng nhập</NavLink>
                                        <NavLink to="/account/register" className="nav-item nav-link">Đăng ký</NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </nav>
                    {location.pathname === '/' && <HomeCarosel />}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
