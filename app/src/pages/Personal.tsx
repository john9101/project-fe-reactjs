import React, { useState, useEffect } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import '../assets/css/stylePersonal.scss';

const Personal: React.FC = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        companyName: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
       
    };

    return (
        <div className='pagePersonal'>
            <span className='titlePersonalPage'>Trang thông tin cá nhân</span>
            <form onSubmit={handleSubmit} className='componentPersonal'>
                <span className='titleInput'>Họ và tên:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập họ và tên'
                    value={userData.fullName}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                />
                <div className='chooseArea'>
                    <div className="chooseDOB">
                        <span className='titleInput'>Ngày sinh:</span>
                        <TextField
                            className='inputArea'
                            type='date'
                            value={userData.dob}
                            onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                        />
                    </div>
                    <div className="chooseGender">
                        <span className='titleInput'>Giới tính: </span>
                        <RadioGroup
                            className='groupGender'
                            value={userData.gender}
                            onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                        >
                            <FormControlLabel value="0" control={<Radio />} label="Nữ" />
                            <FormControlLabel value="1" control={<Radio />} label="Nam" />
                        </RadioGroup>
                    </div>
                </div>
                <span className='titleInput'>Tên công ty:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên công ty của bạn'
                    value={userData.companyName}
                    onChange={(e) => setUserData({ ...userData, companyName: e.target.value })}
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
                {/* Thêm component Address */}
                <span className='titleInput'>Địa chỉ:</span>
                {/* Add Address component here if needed */}

                <div className='footerButton'>
                    <Button className='btnUpdateInformation' type='submit' variant='contained'>
                        Chỉnh sửa thông tin
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Personal;
