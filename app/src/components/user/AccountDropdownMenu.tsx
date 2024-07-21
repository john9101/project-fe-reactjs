import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faPowerOff, faCircleUser} from "@fortawesome/free-solid-svg-icons"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {User} from "../../types/user.type";
import {NavLink, useNavigate} from "react-router-dom";
import {PathNamesConstant} from "../../constants/pathNames.constant";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {logoutAccount} from "../../store/user.slice";

interface AccountDropdownMenuProps {
    user: User;
}

const AccountDropdownMenu = ({user}: AccountDropdownMenuProps) => {
    const [isShowAccountDropdownMenu, setIsShowAccountDropdownMenu] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleShowAccountDropdownMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        if(isShowAccountDropdownMenu){
            setIsShowAccountDropdownMenu(false);
        }else {
            setIsShowAccountDropdownMenu(true);
        }
    }

    const handleLogoutAccount = (event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(logoutAccount())
        navigate(PathNamesConstant.home)
    }

    return (
        <div className="account-wrap" onClick={handleShowAccountDropdownMenu}>
            <div className={`account-item ${isShowAccountDropdownMenu ? 'show-dropdown' : ''}`}>
                <div className="image">
                    {user.avatar ? <img src={user.avatar}/> : <FontAwesomeIcon icon={faCircleUser} className='text-primary'/>}
                </div>
                <div className="content">
                    <NavLink className="js-acc-btn" to={`/${PathNamesConstant.account.parent}/${PathNamesConstant.account.children.profile}`}>{user.fullName}</NavLink>
                    <ArrowDropDownIcon/>
                </div>
                <div className="account-dropdown js-dropdown">
                    <div className="info">
                        <div className="image">
                            {user.avatar ? <img src={user.avatar}/> : <FontAwesomeIcon className='text-primary' icon={faCircleUser}/>}
                        </div>
                        <div className="content">
                            <h5 className="name">
                                <NavLink to={`/${PathNamesConstant.account.parent}/${PathNamesConstant.account.children.profile}`}>{user.fullName}</NavLink>
                            </h5>
                            <span className="email">{user.email}</span>
                        </div>
                    </div>
                    <div className="account-dropdown__body">
                        <div className="account-dropdown__item">
                            <NavLink to={`/${PathNamesConstant.account.parent}/${PathNamesConstant.account.children.profile}`}>
                                <FontAwesomeIcon icon={faUser} />Hồ sơ của tôi
                            </NavLink>
                        </div>
                    </div>
                    <div className="account-dropdown__footer">
                        <NavLink onClick={handleLogoutAccount} to={PathNamesConstant.home}>
                            <FontAwesomeIcon icon={faPowerOff} />Đăng xuất
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountDropdownMenu;