import React, { useEffect, useState } from 'react';
import '../assets/css/styleRegister.scss';
import Link from '@mui/material/Link';
import { Alert, Button, Checkbox, Fade, FormControlLabel, Snackbar, TextField } from '@mui/material';
import Address from '../components/common/Address';
import ReplyIcon from '@mui/icons-material/Reply';

interface Errors {
    username?: string;
    password?: string;
    rePassword?: string;
    representative?: string;
    companyPhone?: string;
    companyEmail?: string;
    termsAccepted?: string;
    province?: string;
    district?: string;
    ward?: string;
    specificAddress?: string;
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
    const [representative, setRepresentative] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [termsAccepted, settermsAccepted] = useState(false);
    const [errors, setErrors] = useState<Errors>({});
    const [addressData, setAddressData] = useState<AddressData>({
        province: null,
        district: null,
        ward: null,
        specificAddress: '',
    });
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const [failureMessage, setFailureMessage] = useState<boolean>(false);

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
        tempErrors.username = username ? '' : 'Vui lòng nhập tên đănng nhập của bạn';
        tempErrors.password = passwordValidator(password)
        tempErrors.rePassword = comparePasword(password, rePassword);
        tempErrors.representative = representative ? '' : 'Vui lòng nhập họ và tên';
        tempErrors.companyPhone = validatePhone(companyPhone)
        tempErrors.companyEmail = validateEmail(companyEmail)
        tempErrors.termsAccepted = termsAccepted ? '' : 'Bạn phải đồng ý với điều khoản của chúng tôi';
        tempErrors.province = addressData.province ? '' : 'Vui lòng chọn Tỉnh/Thành Phố';
        tempErrors.district = addressData.district ? '' : 'Vui lòng chọn Quận/Huyện';
        tempErrors.ward = addressData.ward ? '' : 'Vui lòng chọn Phường/Xã';
        tempErrors.specificAddress = addressData.specificAddress ? '' : 'Vui lòng nhập địa chỉ cụ thể';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };
    const comparePasword = (password: string, rePassword: string) => {
        passwordValidator(rePassword)
        if (password !== rePassword) {
            return 'Mật khẩu không khớp';
        }
        return '';
    }
    const passwordValidator = (password: string) => {
        // Password length should be at least 8 characters
        if (password.length < 8) {
            if (password.length === 0) {
                return 'Vui lòng nhập mật khẩu của bạn';
            }
            return 'Mật khẩu phải nhiều hơn 8 kí tự';
        }
        // Password should contain at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return 'Mật khẩu phải có ít nhất một kí tự in hoa';
        }
        // Password should contain at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return 'Mật khẩu phải có ít nhất 1 kí tự là chữ';
        }
        // Password should contain at least one number
        if (!/[0-9]/.test(password)) {
            return 'Mật khẩu phải có ít nhất một kí tự là số';
        }
        // Password should contain at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Mật khẩu phải có ít một kí tự đặt biệt';
        }
        return '';
    };
    const validatePhone = (value: string) => {
        const phoneRegex = /^\d{10,15}$/;
        if (phoneRegex.test(value)) {
            return '';
        }
        else if (value === '') {
            return 'Vui lòng nhập số điện thoại công ty hoặc số điện thoại của bạn'
        }
    };
    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Email của bạn có vấn đề';
        }
        else if (value === '') {
            return 'Vui lòng nhập email công ty hoặc email của bạn'
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            setSuccessMessage(true);
            setFailureMessage(false);
        } else {
            setSuccessMessage(false);
            setFailureMessage(true);
        }
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
                    Tạo tài khoản thành công.
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
                    Tạo tài khoản thất bại
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
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    error={!!errors.representative}
                    helperText={errors.representative}
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
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    error={!!errors.companyPhone}
                    helperText={errors.companyPhone}
                />
                <span className='titleInput'>Email:</span>
                <TextField
                    className='inputArea'
                    placeholder='Nhập email của công ty hoặc email cá nhân'
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    error={!!errors.companyEmail}
                    helperText={errors.companyEmail}
                />
                <span className='titleInput'>Địa chỉ:</span>
                <Address
                    errors={errors}
                    setAddressData={setAddressData}
                    setAddressErrors={(addressErrors) => setErrors(prevErrors => ({ ...prevErrors, ...addressErrors }))}
                />
                <div className='checkboxAgree'>
                    <FormControlLabel
                        control={<Checkbox checked={termsAccepted} onChange={(e) => settermsAccepted(e.target.checked)} />}
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
