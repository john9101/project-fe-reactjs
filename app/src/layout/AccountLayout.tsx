import AccountHeaderMobile from "../components/user/AccountHeaderMobile";
import AccountSidebar from "../components/user/AccountSidebar";
import AccountContainer from "../components/user/AccountContainer";

const AccountLayout = () => {

    return (
        <div>
            <div className="page-wrapper">
                <AccountHeaderMobile/>
                <AccountSidebar/>
                <AccountContainer/>
            </div>
        </div>
    )
}

export default AccountLayout;