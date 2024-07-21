// import {useAuth} from "../../context/UserContext";
import AccountDropdownMenu from "./AccountDropdownMenu";
import {User} from "../../types/user.type";

interface AccountHeaderDesktopProps {
    user: User;
}

const AccountHeaderDesktop = ({user}: AccountHeaderDesktopProps) => {
    // const { authState } = useAuth();
    // const {user } = authState;

    return (
        <>
            <header className="header-desktop">
                <div className="section__content section__content--p30">
                    <div className="container-fluid">
                        <div className="header-wrap">
                            <div className="header-button">
                                <AccountDropdownMenu user={user}/>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default AccountHeaderDesktop;