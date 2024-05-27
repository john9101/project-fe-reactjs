import React, { useEffect, useState } from 'react';
import '../assets/css/styleRegister.scss';
import Link from '@mui/material/Link';
import Logo from '../components/common/Logo';
import { Alert, Button, Checkbox, Fade, FormControlLabel, Snackbar, TextField } from '@mui/material';
import Address from '../components/common/Address';
import ReplyIcon from '@mui/icons-material/Reply';

interface Errors {
    username?: string;
    password?: string;
    representative?: string;
    birthdate?: string;
    cccd?: string;
    companyName?: string;
    companyPhone?: string;
    companyEmail?: string;
    termsAccepted1?: string;
    termsAccepted2?: string;
}

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [representative, setRepresentative] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [cccd, setCccd] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [termsAccepted1, setTermsAccepted1] = useState(false);
    const [termsAccepted2, setTermsAccepted2] = useState(false);
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
        tempErrors.username = username ? '' : 'Vui lòng nhập email hoặc số điện thoại';
        tempErrors.password = password ? '' : 'Vui lòng nhập mật khẩu';
        tempErrors.representative = representative ? '' : 'Vui lòng nhập họ và tên';
        tempErrors.birthdate = birthdate ? '' : 'Vui lòng chọn ngày sinh';
        tempErrors.cccd = cccd ? '' : 'Vui lòng nhập số căn cước công dân của bạn';
        tempErrors.companyName = companyName ? '' : 'Vui lòng nhập tên công ty của bạn';
        tempErrors.companyPhone = companyPhone ? '' : 'Vui lòng nhập số điện thoại của công ty của bạn';
        tempErrors.companyEmail = companyEmail ? '' : 'Vui lòng nhập email của công ty của bạn';
        tempErrors.termsAccepted1 = termsAccepted1 ? '' : 'Bạn phải đảm bảo thông tin cung cấp là đúng';
        tempErrors.termsAccepted2 = termsAccepted2 ? '' : 'Bạn phải đồng ý với điều khoản';
        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            <Link href="/" className='backToHomePage'><Logo /></Link>
            <Snackbar className='showAlert'
                open={successMessage}
                autoHideDuration={5000}
                TransitionComponent={Fade}
                onClose={() => setSuccessMessage(false)}
            >
                <Alert className='alertSuccess' variant="outlined" severity="success" >
                    Tạo tài khoản thành công.
                </Alert>
            </Snackbar>
            <Snackbar className='showAlert'
                open={failureMessage}
                autoHideDuration={5000}
                TransitionComponent={Fade}
                onClose={() => setFailureMessage(false)}
            >
                <Alert className='alertFail' variant="outlined" severity="error" >
                    Tạo tài khoản thất bại
                </Alert>
            </Snackbar>
            <form onSubmit={handleSubmit} className='componentRegister'>
                <Link className='backToLogin' href="/account/login"><ReplyIcon />Về trang đăng nhập</Link>
                <span className='titleRegister'>Đăng ký</span>
                <span className='titleInput'>Tên đăng nhập:</span>
                <TextField className='inputArea'
                    placeholder='Vui lòng nhập số điện thoại của bạn'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                />

                <span className='titleInput'>Mật khẩu:</span>
                <TextField className='inputArea'
                    type='password'
                    placeholder='Vui lòng nhập mật khẩu'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <span className='titleInput'>Người đại diện:</span>
                <TextField className='inputArea'
                    placeholder='Vui lòng nhập họ và tên'
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    error={!!errors.representative}
                    helperText={errors.representative}
                />

                <span className='titleInput'>Ngày sinh:</span>
                <TextField className='inputArea'
                    type='date'
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    error={!!errors.birthdate}
                    helperText={errors.birthdate}
                />

                <span className='titleInput'>Số CCCD:</span>
                <TextField className='inputArea'
                    placeholder='Vui lòng nhập số căn cước công dân của bạn'
                    value={cccd}
                    onChange={(e) => setCccd(e.target.value)}
                    error={!!errors.cccd}
                    helperText={errors.cccd}
                />

                <span className='titleInput'>Tên công ty:</span>
                <TextField className='inputArea'
                    placeholder='Vui lòng nhập tên công ty của bạn'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    error={!!errors.companyName}
                    helperText={errors.companyName}
                />

                <span className='titleInput'>Số điện thoại công ty:</span>
                <TextField className='inputArea'
                    placeholder='Vui lòng nhập số điện thoại của công ty của bạn'
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    error={!!errors.companyPhone}
                    helperText={errors.companyPhone}
                />

                <span className='titleInput'>Email công ty:</span>
                <TextField className='inputArea'
                    placeholder='Vui lòng nhập email của công ty của bạn'
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    error={!!errors.companyEmail}
                    helperText={errors.companyEmail}
                />

                <span className='titleInput'>Địa chỉ công ty:</span>
                <Address />

                <div className='checkboxAgree'>
                    <FormControlLabel
                        control={<Checkbox checked={termsAccepted1} onChange={(e) => setTermsAccepted1(e.target.checked)} />}
                        label="Tôi cam đoan những thông tin trên là đúng sự thật"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={termsAccepted2} onChange={(e) => setTermsAccepted2(e.target.checked)} />}
                        label="Tôi đồng ý với với các điều khoản của cửa hàng"
                    />
                    {errors.termsAccepted1 && <p className="error">{errors.termsAccepted1}</p>}
                    {errors.termsAccepted2 && <p className="error">{errors.termsAccepted2}</p>}
                </div>

                <Button className='btnRegister' type="submit" variant="contained">Đăng ký</Button>
            </form>
        </div>
    );
};

export default Register;
