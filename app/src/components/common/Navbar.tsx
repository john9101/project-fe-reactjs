import {NavLink, useLocation, useNavigate} from "react-router-dom";
import Logo from "./Logo";
import Banner from "./Banner";
import React, {useEffect, useState} from "react";
import CategoriesMenu from "./CategoriesMenu";
import {PathNamesConstant} from "../../constants/pathNames.constant";
import {useAuth} from "../../context/UserContext";
// import {Avatar, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
// import {ExpandLess, ExpandMore} from "@mui/icons-material";
// import Typography from "@mui/material/Typography";
// import defaultAvatar from '../../assets/img/default-avatar.jpg'
import AccountDropdownMenu from "../user/AccountDropdownMenu";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {User} from "../../types/user.type";

const Navbar = () => {
    const location = useLocation();
    const {user: userFromStore} = useSelector((state: RootState) => state.users);
    const userFromLocalStorage = localStorage.getItem('user')
    const user = userFromStore ? userFromStore : JSON.parse(userFromLocalStorage!) as User;
    // const { authState, logout } = useAuth();
    // const { isAuthenticated, user } = authState;
    // const [, setAnchorElUser] = useState<null | HTMLElement>(null);
    // const [open, setOpen] = useState(false);

    // useEffect(() => {
    //     // const storedUser = localStorage.getItem('user');
    //     // if (storedUser) {
    //     //     const parsedUser = JSON.parse(storedUser);
    //     //     authState.user = parsedUser;
    //     // }
    //
    //     if (!user){
    //
    //     }
    // });

    // const handleClick = () => {
    //     setOpen(!open);
    // };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    // const handleLogout = () => {
    //     logout();
    //     // handleCloseUserMenu();
    //     navigate('/');
    // };

    // const handleListItemClick = (action?: () => void) => {
    //     if (action) {
    //         action();
    //     }
    //     setOpen(false); // Đóng danh sách khi click vào ListItemButton
    // };

    // const settings = [
    //     { label: 'Profile', path: `/personal/${user?._id}` },
    //     { label: 'Đơn hàng của tôi', path: '/orders' },
    //     { label: 'Nhận xét của tôi', path: '/reviews' },
    //     { label: 'Sản phẩm đã xem', path: '/viewed-products' },
    //     { label: 'Logout', action: handleLogout }
    // ];

    return (
        <div className="container-fluid">
            <div className="row border-top px-xl-5">
                <CategoriesMenu/>
                <div className="col-lg-9">
                    <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                        <NavLink to={PathNamesConstant.home} className="d-lg-none">
                            <Logo/>
                        </NavLink>
                        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto py-0">
                                <NavLink to={PathNamesConstant.home} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Trang chủ</NavLink>
                                <NavLink to={PathNamesConstant.shop} state={{resetCollection: true}} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Cửa hàng</NavLink>
                                <NavLink to={PathNamesConstant.aboutUs} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Giới thiệu</NavLink>
                                <NavLink to={PathNamesConstant.contactUs} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Liên hệ</NavLink>
                            </div>
                            {/*{isAuthenticated && user ? (*/}
                            {/*    // <List*/}
                            {/*    //     component="nav"*/}
                            {/*    //     aria-labelledby="nested-list-subheader"*/}
                            {/*    // >*/}
                            {/*    //     <ListItemButton onClick={handleClick} style={{ display: 'flex', columnGap: '5px' }}>*/}
                            {/*    //         <span>{user.fullName}</span>*/}
                            {/*    //         <Avatar alt={user.fullName} src={user.avatar || defaultAvatar} />*/}
                            {/*    //         <ListItemText />*/}
                            {/*    //         {open ? <ExpandLess /> : <ExpandMore />}*/}
                            {/*    //     </ListItemButton>*/}
                            {/*    //     <Collapse in={open} timeout="auto" unmountOnExit>*/}
                            {/*    //         <List component="div" disablePadding style={{ position: 'absolute', zIndex: '999', width: '100%' }}>*/}
                            {/*    //             {settings.map((item, index) => (*/}
                            {/*    //                 <ListItemButton*/}
                            {/*    //                     key={index}*/}
                            {/*    //                     style={{ borderBottom: '1px solid #d3ebff', backgroundColor: 'white' }}*/}
                            {/*    //                     onClick={() => handleListItemClick(item.action)}*/}
                            {/*    //                 >*/}
                            {/*    //                     <ListItemText>*/}
                            {/*    //                         {item.path ? (*/}
                            {/*    //                             <NavLink*/}
                            {/*    //                                 to={item.path}*/}
                            {/*    //                                 style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'left' }}*/}
                            {/*    //                             >*/}
                            {/*    //                                 <Typography textAlign="left">{item.label}</Typography>*/}
                            {/*    //                             </NavLink>*/}
                            {/*    //                         ) : (*/}
                            {/*    //                             <Typography textAlign="left">{item.label}</Typography>*/}
                            {/*    //                         )}*/}
                            {/*    //                     </ListItemText>*/}
                            {/*    //                 </ListItemButton>*/}
                            {/*    //             ))}*/}
                            {/*    //         </List>*/}
                            {/*    //     </Collapse>*/}
                            {/*    // </List>*/}
                            {/*    <AccountDropdownMenu user={user}/>*/}
                            {/*) : (*/}
                            {/*    <div className="navbar-nav ml-auto py-0">*/}
                            {/*        <NavLink to={PathNamesConstant.login} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng nhập</NavLink>*/}
                            {/*        <NavLink to={PathNamesConstant.register} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng ký</NavLink>*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            {user ? (
                                <AccountDropdownMenu user={user}/>
                            ) : (
                                <div className="navbar-nav ml-auto py-0">
                                    <NavLink to={PathNamesConstant.login} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng nhập</NavLink>
                                    <NavLink to={PathNamesConstant.register} className={({isActive}) => (isActive ? "nav-item nav-link active": "nav-item nav-link")} >Đăng ký</NavLink>
                                </div>
                            )}
                        </div>
                    </nav>
                    {location.pathname === PathNamesConstant.home && <Banner/>}
                </div>
            </div>
        </div>
    )
}

export default Navbar;