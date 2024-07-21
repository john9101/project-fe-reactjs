import Logo from "../common/Logo";
import {NavLink} from "react-router-dom";
import {PathNamesConstant} from "../../constants/pathNames.constant";
import {faBox, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

const AccountSidebar = () => {
    return (
        <>
            <aside className="menu-sidebar d-none d-lg-block">
                <div className="logo">
                    <NavLink to={PathNamesConstant.home}>
                        <Logo/>
                    </NavLink>
                </div>
                <div className="menu-sidebar__content">
                    <nav className="navbar-sidebar">
                        <ul className="list-unstyled navbar__list">
                            <li className="active">
                                <NavLink
                                    to={`/${PathNamesConstant.account.parent}/${PathNamesConstant.account.children.profile}`}>
                                    <FontAwesomeIcon icon={faUser} className='mr-2'/> Hồ sơ của tôi
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default AccountSidebar;