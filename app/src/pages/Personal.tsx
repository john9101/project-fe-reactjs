import React, { useState, useEffect } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import '../assets/css/stylePersonal.scss';
// import Address, { AddressData } from '../components/common/Address'; 

const convertDateFormat = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
};

const Personal: React.FC = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState({
        fullName: '',
        dob: '',
        gender: '',
        companyName: '',
        phone: '',
        email: '',
        // Thêm dữ liệu địa chỉ vào state
        address: {
            province: '',
            district: '',
            ward: '',
            specificAddress: ''
        }
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.id === id) {
                setUserData({
                    fullName: user.fullName,
                    dob: user.dob ? convertDateFormat(user.dob) : '',
                    gender: user.gender === '1' ? 'male' : 'female',
                    companyName: user.companyName || '',
                    phone: user.phone || '',
                    email: user.email || '',
                    address: {
                        province: user.address.province || '',
                        district: user.address.district || '',
                        ward: user.address.ward || '',
                        specificAddress: user.address.specificAddress || ''
                    }
                });
            }
        }
    }, [id]);

    const handleSubmit = () => {
        // Handle form submission
    };

    // const handleAddressDataChange = (data: AddressData) => {
    //     setUserData({
    //         ...userData,
    //         address: {
    //             province: data.province || '',
    //             district: data.district || '',
    //             ward: data.ward || '',
    //             specificAddress: data.specificAddress || ''
    //         }
    //     });
    // };

    return (
        <div className='pagePersonal'>
            <div className='btnLogoutArea'><Button>Đăng xuất</Button></div>
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
                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
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
                {/* <Address
                    errors={{}}
                    setAddressData={handleAddressDataChange}
                    setAddressErrors={() => { }}
                    addressData={userData.address}
                /> */}
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
