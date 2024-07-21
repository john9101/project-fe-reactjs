import React, {useEffect, useState} from 'react'
import '../../assets/css/styleLogo.scss'
import logo1 from '../../assets/img/uniform-logo-1.png'
import logo2 from '../../assets/img/uniform-logo-2.svg'
import {useLocation} from "react-router-dom";
import {PathNamesConstant} from "../../constants/pathNames.constant";

const Logo = () => {
    const {pathname} = useLocation()
    const [logo, setLogo] = useState<string>(logo1)
    const [width, setWidth] = useState(150)

    useEffect(() => {
        if(pathname.includes(PathNamesConstant.login) || pathname.includes(PathNamesConstant.register)){
            setLogo(logo2)
            setWidth(250)
        }else {
            setLogo(logo1)
            setWidth(150)
        }
    }, [pathname])

    return (
        <div className='Logo'>
            <img src={logo} style={{width: `${width}px`}}/>
        </div>
    )
}
export default Logo;