import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Alert, Snackbar, Fade } from '@mui/material';
import Link from '@mui/material/Link';
import '../assets/css/styleLogin.scss';


interface Errors {
    username?: string;
    password?: string;
}

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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


    const validate = () => {
        let tempErrors: Errors = {};
        tempErrors.username = username ? '' : 'Vui lòng nhập tên đănng nhập của bạn';
        tempErrors.password = password ? '' : 'Vui lòng mật khẩu của bạn';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
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
                    Đăng nhập thành công.
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
                    Đăng nhập thất bại
                </Alert>
            </Snackbar>
            <form className='componentLogin' onSubmit={handleSubmit}>
                <span className='titleLogin'>Đăng nhập</span>
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
                <div className="forgotPassArea">
                    <Link href="/account/forgot-password" underline="none" className='forgotPassword'>
                        Quên mật khẩu?
                    </Link>
                </div>
                <Button className='btnLogin' type="submit" variant="contained">Đăng nhập</Button>
                <span className='titleToRegister'>Bạn chưa có tài khoản? <Link href="/account/register" underline="none">
                    Tạo tài khoản mới tại đây
                </Link></span>

            </form>
        </div>
    );
}

export default Login;
