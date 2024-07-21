import React, { useState, useEffect } from 'react';
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Avatar } from '@mui/material';
import '../assets/css/stylePersonal.scss';
import EditDialog from '../components/common/DialogUpdate';
import DefaultAvatar from '../assets/img/default-avatar.jpg'

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
        },
        avatar: '' 
    });
    const [isDialogOpen, setDialogOpen] = useState(false);

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
                },
                avatar: parsedData.avatar || '' 
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
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Avatar
                    alt="Remy Sharp"
                    src={userData.avatar || DefaultAvatar}
                    sx={{ width: 200, height: 200 }}
                />
                </div>
                <span className='titleInput'>Họ và tên:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập họ và tên'
                    value={userData.fullName}
                    InputProps={{ readOnly: true }}
                />
                <div className='chooseArea'>
                    <div className="chooseDOB">
                        <span className='titleInput'>Ngày sinh:</span>
                        <TextField
                            className='inputArea'
                            type='date'
                            value={userData.dob}
                            InputProps={{ readOnly: true }}
                        />
                    </div>
                    <div className="chooseGender">
                        <span className='titleInput'>Giới tính: </span>
                        <RadioGroup
                            className='groupGender'
                            value={userData.gender}
                        >
                            <FormControlLabel value="1" control={<Radio disabled />} label="Nam" />
                            <FormControlLabel value="0" control={<Radio disabled />} label="Nữ" />
                        </RadioGroup>
                    </div>
                </div>
                <span className='titleInput'>Tên công ty:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên công ty của bạn'
                    value={userData.companyName}
                    InputProps={{ readOnly: true }}
                />
                <span className='titleInput'>Số điện thoại:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
                    value={userData.phone}
                    InputProps={{ readOnly: true }}
                />
                <span className='titleInput'>Email:</span>
                <TextField
                    className='inputArea'
                    placeholder='Ví dụ: example@gmail.com'
                    value={userData.email}
                    InputProps={{ readOnly: true }}
                />
                <span className='titleInput'>Địa chỉ:</span>
                <TextField
                    className='inputArea'
                    placeholder='Địa chỉ'
                    value={formatAddress(userData.address)}
                    InputProps={{ readOnly: true }}
                />
                <div className='footerButton'>
                    <Button 
                    className='btnUpdateInformation' 
                    type='submit' 
                    variant='contained'
                    onClick={() => setDialogOpen(true)}>
                        Chỉnh sửa thông tin
                    </Button>
                </div>
            </form>
            <EditDialog open={isDialogOpen} onClose={() => setDialogOpen(false)} />
        </div>
    );
};

export default Personal;
