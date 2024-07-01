import React from 'react'
import '../../assets/css/styleLogo.scss'
import logo from '../../assets/img/Uniform-logo.png'

const Logo = () => {
    return (
        <div className='Logo'>
            <img src={logo} style={{width: '150px'}}/>
        </div>
    )
}
export default Logo;