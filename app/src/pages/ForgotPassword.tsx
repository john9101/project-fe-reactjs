import { Alert, Button, Fade, Link, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import ReplyIcon from '@mui/icons-material/Reply';
import { useNavigate } from 'react-router-dom';
import '../assets/css/styleForgotPassword.scss';

interface Errors {
    email?: string;
}

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const [failureMessage, setFailureMessage] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(5);
    const navigate = useNavigate();

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (successMessage || failureMessage) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            const timeout = setTimeout(() => {
                setSuccessMessage(false);
                setFailureMessage(false);
                if (successMessage) {
                    navigate('/account/login');
                }
            }, 5000);

            return () => {
                clearInterval(timer);
                clearTimeout(timeout);
            };
        }
    }, [successMessage, failureMessage, navigate]);

    useEffect(() => {
        if (countdown <= 0) {
            setSuccessMessage(false);
            setFailureMessage(false);
            navigate('/account/login');
        }
    }, [countdown, navigate]);

    const validate = () => {
        const tempErrors: Errors = {};
        tempErrors.email = validateEmail(email);
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validate()) {
            setSuccessMessage(true);
            setFailureMessage(false);
            setCountdown(5); // Reset countdown to 5 seconds
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
                <Alert
                    className='alertSuccess'
                    variant="outlined"
                    severity="success"
                    action={
                        <Button
                            className='btnBackToLogin'
                            onClick={() => navigate('/account/login')}
                        >
                            Về trang đăng nhập ({countdown})
                        </Button>
                    }
                >
                    Đã gửi lại mật khẩu thành công
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
                    Gửi lại mật khẩu thất bại!
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit} className='componentForgotPassword'>
                <Link className='backToLogin' href="/account/login"><ReplyIcon />Về trang đăng nhập</Link>
                <span className='titleForgotPassword'>Bạn quên mật khẩu?</span>
                <span className='titleInput'>Email:</span>
                <TextField
                    className='inputArea'
                    placeholder='Ví dụ: example@gmail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <Button className='btnSendPassword' variant="contained" type='submit' endIcon={<SendIcon />}>
                    Lấy lại mật khẩu
                </Button>
            </form>
        </div>
    );
}

export default ForgotPassword;
