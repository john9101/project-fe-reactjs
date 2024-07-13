import React, { useEffect, useState } from 'react';
import '../assets/css/styleRegister.scss';
import Link from '@mui/material/Link';
import { Alert, Button, Checkbox, Fade, FormControlLabel, Radio, RadioGroup, Snackbar, TextField } from '@mui/material';
import Address from '../components/common/Address';
import ReplyIcon from '@mui/icons-material/Reply';
import http from '../util/http';

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
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [addressData, setAddressData] = useState<AddressData>({
        province: null,
        district: null,
        ward: null,
        specificAddress: '',
    });
    const [successMessage, setSuccessMessage] = useState(false);
    const [failureMessage, setFailureMessage] = useState(false);

    useEffect(() => {
        if (successMessage || failureMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(false);
                setFailureMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, failureMessage]);

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
                    phone,
                    email,
                    address: addressData,
                });
                if (response.status === 201) {
                    setSuccessMessage(true);
                    setFailureMessage(false);
                } else {
                    setSuccessMessage(false);
                    setFailureMessage(true);
                }
            } catch (error) {
                setSuccessMessage(false);
                setFailureMessage(true);
                console.log('Register Failed', error);
            }
        } else {
            setSuccessMessage(false);
            setFailureMessage(true);
        }
    };

    const handleAddressChange = (address: AddressData) => {
        setAddressData(address);
    };

    return (
        <div>
            <Snackbar
                className='showAlert'
                open={successMessage}
                autoHideDuration={5000}
                TransitionComponent={Fade}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert className='alertSuccess' variant="outlined" severity="success">
                    Đăng ký thành công.
                </Alert>
            </Snackbar>
            <Snackbar
                className='showAlert'
                open={failureMessage}
                autoHideDuration={5000}
                TransitionComponent={Fade}
                onClose={() => setFailureMessage(false)}
            >
                <Alert className='alertFail' variant="outlined" severity="error">
                    Đăng ký thất bại
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit} className='componentRegister'>
                <Link className='backToLogin' href="/account/login"><ReplyIcon />Về trang đăng nhập</Link>
                <span className='titleRegister'>Đăng ký</span>
                <span className='titleInput'>Tên đăng nhập:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên đăng nhập của bạn'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                />
                <span className='titleInput'>Mật khẩu:</span>
                <TextField
                    className='inputArea'
                    type='password'
                    placeholder='Nhập mật khẩu'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <span className='titleInput'>Nhập lại mật khẩu: </span>
                <TextField
                    className='inputArea'
                    type='password'
                    placeholder='Nhập lại mật khẩu'
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    error={!!errors.rePassword}
                    helperText={errors.rePassword}
                />
                <span className='titleInput'>Họ và tên người đại diện:</span>
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
                        />
                    </div>
                    <div className="chooseGender">
                        <span className='titleInput'>Giới tính: </span>
                        <RadioGroup className='groupGender'>
                            <FormControlLabel value="female" control={<Radio />} label="Nam" />
                            <FormControlLabel value="male" control={<Radio />} label="Nữ" />
                        </RadioGroup>
                    </div>
                </div>
                <span className='titleInput'>Tên công ty:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập tên công ty của bạn'
                />
                <span className='titleInput'>Số điện thoại:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <span className='titleInput'>Email:</span>
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
