import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Alert, Snackbar, Fade } from '@mui/material';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext'; // Import useAuth hook
import '../assets/css/styleLogin.scss';
import http from '../util/http';

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
    const navigate = useNavigate();
    const { login } = useAuth(); 

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
        tempErrors.password = password ? '' : 'Vui lòng nhập mật khẩu của bạn';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await http.post('login', { username, password });
                const user = response.data;
                login(user); 
                setSuccessMessage(true);
                setFailureMessage(false);
                navigate('/');
            } catch (error) {
                setSuccessMessage(false);
                setFailureMessage(true);
                console.error('Login failed:', error);
            }
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
