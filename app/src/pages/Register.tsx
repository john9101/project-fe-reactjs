import React, { useEffect, useState } from 'react';
import '../assets/css/styleRegister.scss';
import Link from '@mui/material/Link';
import { Alert, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField } from '@mui/material';
import Address from '../components/common/Address';
import ReplyIcon from '@mui/icons-material/Reply';
import http from '../util/http';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Errors {
    username?: string;
    password?: string;
    rePassword?: string;
    fullName?: string;
    phone?: string;
    email?: string;
    termsAccepted?: string;
}

interface AddressData {
    province: string | null;
    district: string | null;
    ward: string | null;
    specificAddress: string;
}

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');
    const [nameCompany, setNameCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [addressData, setAddressData] = useState<AddressData>({
        province: null,
        district: null,
        ward: null,
        specificAddress: '',
    });
    const [avatar, setAvatar] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const [errors, setErrors] = useState<Errors>({});
    const [alert, setAlert] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    useEffect(() => {
        if (alert.type) {
            const timer = setTimeout(() => {
                setAlert({ type: null, message: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const validate = () => {
        let tempErrors: Errors = {};
        tempErrors.username = username ? '' : 'Vui lòng nhập tên đăng nhập của bạn';
        tempErrors.password = passwordValidator(password);
        tempErrors.rePassword = comparePassword(password, rePassword);
        tempErrors.fullName = fullName ? '' : 'Vui lòng nhập họ và tên';
        tempErrors.phone = validatePhone(phone);
        tempErrors.email = validateEmail(email);
        tempErrors.termsAccepted = termsAccepted ? '' : 'Bạn phải đồng ý với điều khoản của chúng tôi';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const comparePassword = (password: string, rePassword: string) => {
        const passwordError = passwordValidator(rePassword);
        if (passwordError) return passwordError;
        if (password !== rePassword) {
            return 'Mật khẩu không khớp';
        }
        return '';
    };

    const passwordValidator = (password: string) => {
        if (password.length === 0) {
            return 'Vui lòng nhập mật khẩu của bạn';
        }
        if (password.length < 8) {
            return 'Mật khẩu phải nhiều hơn 8 kí tự';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Mật khẩu phải có ít nhất một kí tự in hoa';
        }
        if (!/[a-z]/.test(password)) {
            return 'Mật khẩu phải có ít nhất một kí tự là chữ';
        }
        if (!/[0-9]/.test(password)) {
            return 'Mật khẩu phải có ít nhất một kí tự là số';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Mật khẩu phải có ít nhất một kí tự đặc biệt';
        }
        return '';
    };

    const validatePhone = (value: string) => {
        const phoneRegex = /^0\d{9}$/;
        if (value.trim() === '') {
            return 'Vui lòng nhập số điện thoại';
        }
        if (!phoneRegex.test(value)) {
            return 'Số điện thoại phải gồm 10 chữ số bắt đầu từ số 0';
        }
        return '';
    };

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim() === '') {
            return 'Vui lòng nhập email công ty hoặc email của bạn';
        }
        if (!emailRegex.test(value)) {
            return 'Email không hợp lệ!';
        }
        return '';
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await http.post('register', {
                    username,
                    password,
                    fullName,
                    dob,
                    gender,
                    nameCompany,
                    phone,
                    email,
                    address: addressData,
                    avatar,
                });
                if (response.status === 201 || response.status === 200) {
                    setAlert({ type: 'success', message: 'Đăng ký thành công.' });
                } else {
                    setAlert({ type: 'error', message: 'Đăng ký thất bại.' });
                }
            } catch (error) {
                setAlert({ type: 'error', message: 'Đăng ký thất bại.' });
                console.log('Register Failed', error);
            }
        } else {
            setAlert({ type: 'error', message: 'Đăng ký thất bại.' });
        }
    };

    const handleAddressChange = (address: AddressData) => {
        setAddressData(address);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [showRePassword, setShowRePassword] = useState(false);
    const handleClickShowRePassword = () => setShowRePassword((show) => !show);
    const handleMouseDownRePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <div>
            {alert.type && (
                <Alert severity={alert.type} className='showAlert'>
                    {alert.message}
                </Alert>
            )}
            <form onSubmit={handleSubmit} className='componentRegister'>
                <Link className='backToLogin' href="/account/login"><ReplyIcon />Về trang đăng nhập</Link>
                <span className='titleRegister'>Đăng ký</span>
                <span className='titleInput'>Tên đăng nhập: <span className='note'> *</span></span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên đăng nhập của bạn'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <span className='titleInput'>Mật khẩu: <span className='note'> *</span></span>
                <OutlinedInput
                    className='inputArea'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Nhập mật khẩu'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <span className='titleInput'>Nhập lại mật khẩu: <span className='note'> *</span></span>
                <OutlinedInput
                    className='inputArea'
                    type={showRePassword ? 'text' : 'password'}
                    placeholder='Nhập lại mật khẩu'
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    error={!!errors.rePassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowRePassword}
                                onMouseDown={handleMouseDownRePassword}
                                edge="end"
                            >
                                {showRePassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <span className='titleInput'>Họ và tên người đại diện: <span className='note'> *</span></span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập họ và tên'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                />
                <div className='chooseArea'>
                    <div className="chooseDOB">
                        <span className='titleInput'>Ngày sinh:</span>
                        <TextField
                            className='inputArea'
                            type='date'
                            value={dob}
                            onChange={(e) => setDOB(e.target.value)}

                        />
                    </div>
                    <div className="chooseGender">
                        <span className='titleInput'>Giới tính: </span>
                        <RadioGroup
                            className='groupGender'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Nữ" />
                            <FormControlLabel value="0" control={<Radio />} label="Nam" />
                        </RadioGroup>
                    </div>
                </div>
                <span className='titleInput'>Tên công ty:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên công ty của bạn'
                    value={nameCompany}
                    onChange={(e) => setNameCompany(e.target.value)}
                />
                <span className='titleInput'>Số điện thoại: <span className='note'> *</span></span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <span className='titleInput'>Email: <span className='note'> *</span></span>
                <TextField
                    className='inputArea'
                    placeholder='Ví dụ: example@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <span className='titleInput'>Địa chỉ:</span>
                <Address onChange={handleAddressChange} />
                <div className='checkboxAgree'>
                    <FormControlLabel
                        className='labelAgree'
                        control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />}
                        label="Tôi đồng ý với điều khoản sử dụng của dịch vụ."
                        style={{ color: errors.termsAccepted ? 'red' : 'inherit' }}
                    />
                </div>
                <Button className='btnRegister' type='submit' variant='contained'>
                    Đăng ký
                </Button>
            </form>
        </div>
    );
};

export default Register;
