import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import HomeCarosel from "../carousel/HomeCarousel";
import React, { useState, useEffect } from "react";
import CategoryList from "./CategoriesList";
import { useAuth } from "../../context/UserContext";
import defaultAvatar from '../../assets/img/default-avatar.jpg';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { authState, logout } = useAuth();
    const { isAuthenticated, user } = authState;
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            authState.user = parsedUser;
        }
    },);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        logout();
        handleCloseUserMenu();
        navigate('/');
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
                            <div className="navbar-nav ml-auto py-0">
                                {isAuthenticated && user ? (
                                    <div className="nav-item" >
                                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '5px', cursor: 'pointer' }} onClick={handleOpenUserMenu}>
                                            <span>{user.fullName}</span>
                                            <Tooltip title="Open settings">
                                                <IconButton sx={{ p: 0 }}>
                                                    <Avatar alt={user.fullName} src={user.avatar || defaultAvatar} />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id="menu-appbar"
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting, index) => (
                                                <MenuItem key={index} onClick={setting.action || handleCloseUserMenu}>
                                                    {setting.path ? (
                                                        <NavLink onClick={setting.action || handleCloseUserMenu}
                                                            to={setting.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'left' }}>
                                                            <Typography textAlign="left">{setting.label}</Typography>
                                                        </NavLink>
                                                    ) : (
                                                        <Typography textAlign="left">{setting.label}</Typography>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                ) : (
                                    <>
                                        <NavLink to="/account/login" className="nav-item nav-link">Đăng nhập</NavLink>
                                        <NavLink to="/account/register" className="nav-item nav-link">Đăng ký</NavLink>
                                    </>
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
