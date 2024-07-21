import Logo from "../common/Logo";
import {NavLink} from "react-router-dom";
import {PathNamesConstant} from "../../constants/pathNames.constant";

const AccountHeaderMobile = () => {
    return (
        <header className="header-mobile d-block d-lg-none">
            <div className="header-mobile__bar">
                <div className="container-fluid">
                    <div className="header-mobile-inner">
                        <NavLink className="logo" to={PathNamesConstant.home}>
                            <Logo/>
                        </NavLink>
                        <button className="hamburger hamburger--slider" type="button">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <nav className="navbar-mobile">
                <div className="container-fluid">
                    <ul className="navbar-mobile__list list-unstyled">
                        <li className="has-sub">
                            <NavLink
                                to={`/${PathNamesConstant.account.parent}/${PathNamesConstant.account.children.profile}`}>
                                <i className="fas fa-tachometer-alt"></i> Hồ sơ của tôi
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default AccountHeaderMobile;