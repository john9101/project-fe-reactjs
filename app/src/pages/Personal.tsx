import React, { useState, useEffect } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import AddressSelect from '../components/common/Address';
import '../assets/css/stylePersonal.scss';

const Personal: React.FC = () => {
    const [userData, setUserData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        companyName: '',
        phone: '',
        email: '',
        address: {
            province: '',
            district: '',
            ward: '',
            specific: ''
        }
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData({
                fullName: parsedData.fullName || '',
                dob: parsedData.dob || '',
                gender: parsedData.gender || '',
                companyName: parsedData.companyName || '',
                phone: parsedData.phone || '',
                email: parsedData.email || '',
                address: {
                    province: parsedData.address.province || '',
                    district: parsedData.address.district || '',
                    ward: parsedData.address.ward || '',
                    specific: parsedData.address.specific || ''
                }
            });
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const formatAddress = (address: any) => {
        const { specific, ward, district, province } = address;
        return [specific, ward, district, province].filter(part => part).join(' - ');
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
                <span className='titleInput'>Địa chỉ:</span>
                <TextField
                    className='inputArea'
                    placeholder='Địa chỉ'
                    value={formatAddress(userData.address)}
                    onChange={(e) => {
                        const addressParts = e.target.value.split(' - ');
                        setUserData({
                            ...userData,
                            address: {
                                specific: addressParts[0] || '',
                                ward: addressParts[1] || '',
                                district: addressParts[2] || '',
                                province: addressParts[3] || ''
                            }
                        });
                    }}
                />
                <div className='footerButton'>
                    <Button className='btnUpdateInformation' type='submit' variant='contained'>
                        Chỉnh sửa thông tin
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Personal;
