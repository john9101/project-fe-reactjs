import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Alert, Snackbar, Fade } from '@mui/material';
import Link from '@mui/material/Link';
import '../assets/css/styleLogin.scss';
import Logo from '../components/common/Logo';

interface Errors {
    emailOrPhone?: string;
    password?: string;
}

const Login: React.FC = () => {
    const [emailOrPhone, setEmailOrPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const [failureMessage, setFailureMessage] = useState<boolean>(false);

    useEffect(() => {
        if (successMessage || failureMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(false);
                setFailureMessage(false);
            }, 50000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, failureMessage]);

    const validateEmailOrPhone = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,15}$/; // Simple phone regex (10-15 digits)
        if (emailRegex.test(value) || phoneRegex.test(value)) {
            return '';
        }
        return 'Vui lòng nhập email hoặc số điện thoại hợp lệ.';
    };

    const validate = () => {
        let tempErrors: Errors = {};
        tempErrors.emailOrPhone = validateEmailOrPhone(emailOrPhone);
        if (!emailOrPhone) {
            tempErrors.emailOrPhone = 'Tên đăng nhập là bắt buộc.';
        }
        if (!password) {
            tempErrors.password = 'Mật khẩu là bắt buộc.';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).filter(key => tempErrors[key as keyof Errors]).length === 0;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validate()) {
            const loginSuccess = Math.random() > 0.5;
            if (loginSuccess) {
                setSuccessMessage(true);
                setFailureMessage(false);
            } else {
                setSuccessMessage(false);
                setFailureMessage(true);
            }
        } else {
            setFailureMessage(true);
        }
    };

    return (
        <div className='tabLogin'>
            <Link href="/" className='backToHomePage'><Logo></Logo></Link>
            <Snackbar className='showAlert'
                open={successMessage}
                autoHideDuration={5000}
                TransitionComponent={Fade}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert className='alertSuccess' variant="outlined" severity="success" >
                    Đăng nhập thành công.
                </Alert>
            </Snackbar>
            <Snackbar className='showAlert'
                open={failureMessage}
                autoHideDuration={5000}
                TransitionComponent={Fade}
                onClose={() => setFailureMessage(false)}
            >
                <Alert className='alertFail' variant="outlined" severity="error" >
                    Đăng nhập thất bại
                </Alert>
            </Snackbar>
            <form className='componentLogin' onSubmit={handleSubmit}>
                <span className='titleLogin'>Đăng nhập</span>
                <span className='titleInput'>Tên đăng nhập:</span>
                <TextField
                    required
                    id="outlined-required"
                    placeholder='Vui lòng nhập số điện thoại của bạn'
                    className='inputArea'
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    error={!!errors.emailOrPhone}
                    helperText={errors.emailOrPhone}
                />
                <span className='titleInput'>Mật khẩu:</span>
                <TextField
                    id="outlined-password-input"
                    type="password"
                    placeholder='Vui lòng nhập mật khẩu'
                    autoComplete="current-password"
                    className='inputArea'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Link href="/forgot-password" underline="none" className='forgotPassword'>
                    Quên mật khẩu?
                </Link>
                <Button variant="contained" className='btnLogin' type="submit">Đăng nhập</Button>
                <span className='titleToRegister'>Bạn chưa có tài khoản? <Link href="/register" underline="none">
                    Tạo tài khoản mới tại đây
                </Link></span>

            </form>
        </div>
    );
}

export default Login;
