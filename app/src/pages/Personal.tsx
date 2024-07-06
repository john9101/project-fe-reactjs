import { Button, Link, TextField } from '@mui/material';
import React from 'react'
import Address from '../components/common/Address';
import '../assets/css/stylePersonal.scss';


const Personal = () => {
    const handleSubmit = () => {

    }
    return (
        <div className='pagePersonal'>
            <div><Button>Đăng xuất</Button></div>
            <span>Trang thông tin cá nhân</span>
            <form onSubmit={handleSubmit} className='componentRegister'>
                <span className='titleInput'>Tên đăng nhập:</span>
                <TextField
                    className='inputArea'

                />
                <span className='titleInput'>Họ và tên:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập họ và tên'
                />
                <span className='titleInput'>Ngày sinh:</span>
                <TextField
                    className='inputArea'
                    type='date'
                />
                <span className='titleInput'>Tên công ty:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên công ty của bạn'
                />
                <span className='titleInput'>Số điện thoại:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
                />
                <span className='titleInput'>Email:</span>
                <TextField
                    className='inputArea'
                    placeholder='Ví dụ: example@gmail.com'
                />
                <span className='titleInput'>Địa chỉ:</span>
                {/* <Address /> */}
                <Button className='btnRegister' type='submit' variant='contained'>
                    Chỉnh sửa thông tin
                </Button>
            </form>
        </div>
    )
}
export default Personal;