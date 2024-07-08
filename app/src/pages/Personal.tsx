import { Button, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Address from '../components/common/Address';
import '../assets/css/stylePersonal.scss';

const Personal: React.FC = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        fullName: '',
        fullname: '',
        birthdate: '',
        company: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.id === id) {
                setUserData({
                    fullName: user.fullName,
                    fullname: user.fullname || '',
                    birthdate: user.birthdate || '',
                    company: user.company || '',
                    phone: user.phone || '',
                    email: user.email || ''
                });
            }
        }
    }, [id]);

    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <div className='pagePersonal'>
            <div><Button>Đăng xuất</Button></div>
            <span>Trang thông tin cá nhân</span>
            <form onSubmit={handleSubmit} className='componentRegister'>
                <span className='titleInput'>Tên đăng nhập:</span>
                <TextField
                    className='inputArea'
                    value={userData.fullName}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                />
                <span className='titleInput'>Họ và tên:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập họ và tên'
                    value={userData.fullname}
                    onChange={(e) => setUserData({ ...userData, fullname: e.target.value })}
                />
                <span className='titleInput'>Ngày sinh:</span>
                <TextField
                    className='inputArea'
                    type='date'
                    value={userData.birthdate}
                    onChange={(e) => setUserData({ ...userData, birthdate: e.target.value })}
                />
                <span className='titleInput'>Tên công ty:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên công ty của bạn'
                    value={userData.company}
                    onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                />
                <span className='titleInput'>Số điện thoại:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
                <span className='titleInput'>Email:</span>
                <TextField
                    className='inputArea'
                    placeholder='Ví dụ: example@gmail.com'
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                />
                <span className='titleInput'>Địa chỉ:</span>
                {/* <Address /> */}
                <Button className='btnRegister' type='submit' variant='contained'>
                    Chỉnh sửa thông tin
                </Button>
            </form>
        </div>
    );
}

export default Personal;
