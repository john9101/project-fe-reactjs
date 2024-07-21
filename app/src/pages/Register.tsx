import React, {useEffect, useState} from 'react';
import '../assets/css/styleRegister.scss';
import {Button, Form, FormGroup} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {PathNamesConstant} from "../constants/pathNames.constant";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {User} from "../types/user.type";
import _ from 'lodash';
import {yupResolver} from "@hookform/resolvers/yup";
import {Gender} from "../constants/gender.constant";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {registerAccount} from "../store/user.slice";
// import Link from '@mui/material/Link';
// import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, InputAdornment, OutlinedInput, Radio, RadioGroup, TextField } from '@mui/material';
// import Address from '../components/common/Address';
// import ReplyIcon from '@mui/icons-material/Reply';
// import http from '../util/http';
// import { Visibility, VisibilityOff, CheckCircleOutline } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import thankyou from '../assets/img/thankyou.gif';

// interface Errors {
//     username?: string;
//     password?: string;
//     rePassword?: string;
//     fullName?: string;
//     phone?: string;
//     email?: string;
//     termsAccepted?: string;
// }
//
// interface AddressData {
//     province: string | null;
//     district: string | null;
//     ward: string | null;
//     specific: string;
// }

export interface RegisterFormType {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    phone: string;
    fullName: string;
    gender?: number;
    province: string;
    district: string;
    ward: string;
    specificAddress: string;
    companyName?: string;
    birthDate?: Date;
}

const registerFormSchema = Yup.object().shape({
    username: Yup.string()
        .required('Tên người dùng không được bỏ trống'),
    password: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Mẫu khẩu nhập lại không khớp')
        .required('Mật khẩu lặp lại không được bỏ trống'),
    email: Yup.string()
        .email('Địa chỉ email không hợp lệ')
        .required('Địa chỉ email không được bỏ trống'),
    phone: Yup.string()
        .required('Số điện thoại không được bỏ trống'),
    fullName: Yup.string()
        .required('Họ và tên không được bỏ trống'),
    province: Yup.string()
        .required('Tỉnh / Thành phố không được bỏ trống'),
    district: Yup.string()
        .required('Quận / Huyện không được bỏ trống'),
    ward: Yup.string()
        .required('Xã / Phường không được bỏ trống'),
    specificAddress: Yup.string()
        .required('Địa chỉ cụ thể không được bỏ trống'),
    birthdate: Yup.date(),
    companyName: Yup.string(),
    gender: Yup.number(),
})

const Register = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [rePassword, setRePassword] = useState('');
    // const [fullName, setFullName] = useState('');
    // const [dob, setDOB] = useState('');
    // const [gender, setGender] = useState('');
    // const [companyName, setCompanyName] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [addressData, setAddressData] = useState<AddressData>({
    //     province: null,
    //     district: null,
    //     ward: null,
    //     specific: '',
    // });
    // const [avatar,] = useState('');
    // const [termsAccepted, setTermsAccepted] = useState(false);
    //
    // const [errors, setErrors] = useState<Errors>({});
    // const [alert, setAlert] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    // const [open, setOpen] = useState(false);
    // const navigate = useNavigate();
    //
    // const validateUsername = (value: string) => {
    //     if (value.length < 8) {
    //         return 'Tên đăng nhập phải có ít nhất 8 kí tự';
    //     }
    //     return value ? '' : 'Vui lòng nhập tên đăng nhập của bạn';
    // };
    //
    // const validateFullName = (value: string) => {
    //     return value ? '' : 'Vui lòng nhập họ và tên';
    // };
    //
    // const comparePassword = (password: string, rePassword: string) => {
    //     if (password !== rePassword) {
    //         return 'Mật khẩu không khớp';
    //     }
    //     return '';
    // };
    //
    // const passwordValidator = (password: string) => {
    //     if (password.length === 0) {
    //         return 'Vui lòng nhập mật khẩu của bạn';
    //     }
    //     if (password.length < 8) {
    //         return 'Mật khẩu phải nhiều hơn 8 kí tự';
    //     }
    //     if (!/[A-Z]/.test(password)) {
    //         return 'Mật khẩu phải có ít nhất một kí tự in hoa';
    //     }
    //     if (!/[a-z]/.test(password)) {
    //         return 'Mật khẩu phải có ít nhất một kí tự là chữ';
    //     }
    //     if (!/[0-9]/.test(password)) {
    //         return 'Mật khẩu phải có ít nhất một kí tự là số';
    //     }
    //     if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //         return 'Mật khẩu phải có ít nhất một kí tự đặc biệt';
    //     }
    //     return '';
    // };

    // const validatePhone = (value: string) => {
    //     const phoneRegex = /^0\d{9}$/;
    //     if (value.trim() === '') {
    //         return 'Vui lòng nhập số điện thoại';
    //     }
    //     if (!phoneRegex.test(value)) {
    //         return 'Số điện thoại phải gồm 10 chữ số bắt đầu từ số 0';
    //     }
    //     return '';
    // };
    //
    // const validateEmail = (value: string) => {
    //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (value.trim() === '') {
    //         return 'Vui lòng nhập email công ty hoặc email của bạn';
    //     }
    //     if (!emailRegex.test(value)) {
    //         return 'Email không hợp lệ!';
    //     }
    //     return '';
    // };
    //
    // const validate = () => {
    //     let tempErrors: Errors = {};
    //     tempErrors.username = validateUsername(username);
    //     tempErrors.password = passwordValidator(password);
    //     tempErrors.rePassword = comparePassword(password, rePassword);
    //     tempErrors.fullName = validateFullName(fullName);
    //     tempErrors.phone = validatePhone(phone);
    //     tempErrors.email = validateEmail(email);
    //     tempErrors.termsAccepted = termsAccepted ? '' : '*';
    //     setErrors(tempErrors);
    //     return Object.values(tempErrors).every(x => x === '');
    // };
    //
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (validate()) {
    //         try {
    //             const response = await http.post('register', {
    //                 username,
    //                 password,
    //                 fullName,
    //                 dob,
    //                 gender,
    //                 companyName,
    //                 phone,
    //                 email,
    //                 address: addressData,
    //                 avatar,
    //             });
    //             if (response.status === 201 || response.status === 200) {
    //                 setAlert({ type: 'success', message: 'Đăng ký thành công.' });
    //                 setOpen(true);
    //             } else {
    //                 setAlert({ type: 'error', message: 'Đăng ký thất bại.' });
    //             }
    //         } catch (error) {
    //             setAlert({ type: 'error', message: 'Đăng ký thất bại.' });
    //             console.log('Register Failed', error);
    //         }
    //     } else {
    //         setAlert({ type: 'error', message: 'Đăng ký thất bại.' });
    //     }
    //
    // };
    //
    // const handleAddressChange = (address: AddressData) => {
    //     setAddressData(address);
    // };
    //
    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    //
    // const [showRePassword, setShowRePassword] = useState(false);
    // const handleClickShowRePassword = () => setShowRePassword((show) => !show);
    // const handleMouseDownRePassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };
    //
    // const handleClose = () => {
    //
    // };
    //
    // const handleRedirectToLogin = () => {
    //     navigate('/account/login');
    // };
    //
    // const handleRedirectToHome = () => {
    //     navigate('/');
    // };

    // return (
    //     <div>
    //         {alert.type && (
    //             <Alert severity={alert.type} className='showAlert'>
    //                 {alert.message}
    //             </Alert>
    //         )}
    //         <form onSubmit={handleSubmit} className='componentRegister'>
    //             <Link className='backToLogin' href="/account/login"><ReplyIcon />Về trang đăng nhập</Link>
    //             <span className='titleRegister'>Đăng ký</span>
    //             <span className='titleInput'>Tên đăng nhập: <span className='note'> *</span></span>
    //             <TextField
    //                 className='inputArea'
    //                 placeholder='Nhập tên đăng nhập của bạn'
    //                 value={username}
    //                 onChange={(e) => setUsername(e.target.value)}
    //                 onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, username: validateUsername(username) }))}
    //                 error={!!errors.username}
    //                 helperText={errors.username}
    //                 InputProps={{
    //                     endAdornment: (
    //                         username && !errors.username ? (
    //                             <InputAdornment position="end">
    //                                 <CheckCircleOutline style={{ color: 'green' }} />
    //                             </InputAdornment>
    //                         ) : null
    //                     )
    //                 }}
    //             />
    //             <span className='titleInput'>Mật khẩu: <span className='note'> *</span></span>
    //             <OutlinedInput
    //                 className='inputArea'
    //                 type={showPassword ? 'text' : 'password'}
    //                 placeholder='Nhập mật khẩu'
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, password: passwordValidator(password) }))}
    //                 error={!!errors.password}
    //                 endAdornment={
    //                     <InputAdornment position="end">
    //                         <IconButton
    //                             aria-label="toggle password visibility"
    //                             onClick={handleClickShowPassword}
    //                             onMouseDown={handleMouseDownPassword}
    //                             edge="end"
    //                         >
    //                             {showPassword ? <VisibilityOff /> : <Visibility />}
    //                         </IconButton>
    //                     </InputAdornment>
    //                 }
    //             />
    //             {errors.password && <span className='errorAlert'>{errors.password}</span>}
    //             <span className='titleInput'>Nhập lại mật khẩu: <span className='note'> *</span></span>
    //             <OutlinedInput
    //                 className='inputArea'
    //                 type={showRePassword ? 'text' : 'password'}
    //                 placeholder='Nhập lại mật khẩu'
    //                 value={rePassword}
    //                 onChange={(e) => setRePassword(e.target.value)}
    //                 onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, rePassword: comparePassword(password, rePassword) }))}
    //                 error={!!errors.rePassword}
    //                 endAdornment={
    //                     <InputAdornment position="end">
    //                         <IconButton
    //                             aria-label="toggle password visibility"
    //                             onClick={handleClickShowRePassword}
    //                             onMouseDown={handleMouseDownRePassword}
    //                             edge="end"
    //                         >
    //                             {showRePassword ? <VisibilityOff /> : <Visibility />}
    //                         </IconButton>
    //                     </InputAdornment>
    //                 }
    //             />
    //             {errors.rePassword && <span className='errorAlert'>{errors.rePassword}</span>}
    //             <span className='titleInput'>Họ và tên người đại diện: <span className='note'> *</span></span>
    //             <TextField
    //                 className='inputArea'
    //                 placeholder='Nhập họ và tên'
    //                 value={fullName}
    //                 onChange={(e) => setFullName(e.target.value)}
    //                 onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, fullName: validateFullName(fullName) }))}
    //                 error={!!errors.fullName}
    //                 helperText={errors.fullName}
    //                 InputProps={{
    //                     endAdornment: (
    //                         fullName && !errors.fullName ? (
    //                             <InputAdornment position="end">
    //                                 <CheckCircleOutline style={{ color: 'green' }} />
    //                             </InputAdornment>
    //                         ) : null
    //                     )
    //                 }}
    //             />
    //             <div className='chooseArea'>
    //                 <div className="chooseDOB">
    //                     <span className='titleInput'>Ngày sinh:</span>
    //                     <TextField
    //                         className='inputArea'
    //                         type='date'
    //                         value={dob}
    //                         onChange={(e) => setDOB(e.target.value)}
    //                     />
    //                 </div>
    //                 <div className="chooseGender">
    //                     <span className='titleInput'>Giới tính: </span>
    //                     <RadioGroup
    //                         className='groupGender'
    //                         value={gender}
    //                         onChange={(e) => setGender(e.target.value)}
    //                     >
    //                         <FormControlLabel value="1" control={<Radio />} label="Nam" />
    //                         <FormControlLabel value="0" control={<Radio />} label="Nữ" />
    //                     </RadioGroup>
    //                 </div>
    //             </div>
    //             <span className='titleInput'>Tên công ty:</span>
    //             <TextField
    //                 className='inputArea'
    //                 placeholder='Nhập tên công ty của bạn'
    //                 value={companyName}
    //                 onChange={(e) => setCompanyName(e.target.value)}
    //             />
    //             <span className='titleInput'>Số điện thoại: <span className='note'> *</span></span>
    //             <TextField
    //                 className='inputArea'
    //                 placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
    //                 value={phone}
    //                 onChange={(e) => setPhone(e.target.value)}
    //                 onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, phone: validatePhone(phone) }))}
    //                 error={!!errors.phone}
    //                 helperText={errors.phone}
    //                 InputProps={{
    //                     endAdornment: (
    //                         phone && !errors.phone ? (
    //                             <InputAdornment position="end">
    //                                 <CheckCircleOutline style={{ color: 'green' }} />
    //                             </InputAdornment>
    //                         ) : null
    //                     )
    //                 }}
    //             />
    //             <span className='titleInput'>Email: <span className='note'> *</span></span>
    //             <TextField
    //                 className='inputArea'
    //                 placeholder='Ví dụ: example@gmail.com'
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(email) }))}
    //                 error={!!errors.email}
    //                 helperText={errors.email}
    //                 InputProps={{
    //                     endAdornment: (
    //                         email && !errors.email ? (
    //                             <InputAdornment position="end">
    //                                 <CheckCircleOutline style={{ color: 'green' }} />
    //                             </InputAdornment>
    //                         ) : null
    //                     )
    //                 }}
    //             />
    //             <span className='titleInput'>Địa chỉ:</span>
    //             <Address onChange={handleAddressChange} />
    //             <div className='checkboxAgree'>
    //                 <FormControlLabel
    //                     className='labelAgree'
    //                     control={<Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
    //                         style={{ display: 'flex', flexDirection: 'column' }} />}
    //                     label="Tôi đồng ý với điều khoản sử dụng của dịch vụ."
    //                     style={{
    //                         color: errors.termsAccepted ? 'red' : 'inherit',
    //                     }}
    //                 />
    //                 {errors.termsAccepted && (
    //                     <span style={{ color: 'red' }}>{errors.termsAccepted}</span>
    //                 )}
    //             </div>
    //             <Button className='btnRegister' type='submit' variant='contained'>
    //                 Đăng ký
    //             </Button>
    //         </form>
    //         <Dialog open={open} onClose={handleClose}>
    //             <DialogTitle className='titleDialog'>Đăng ký thành công</DialogTitle>
    //             <DialogContent>
    //                 <DialogContentText>
    //                     {/*<img src={thankyou} alt="Thank you" className='imageThankyou' />*/}
    //                 </DialogContentText>
    //             </DialogContent>
    //             <DialogActions className='footerButton'>
    //                 <Button variant="contained" onClick={handleRedirectToLogin} color="primary">
    //                     Về trang đăng nhập
    //                 </Button>
    //                 <Button variant="contained" onClick={handleRedirectToHome} color="primary">
    //                     Về trang chủ
    //                 </Button>
    //             </DialogActions>
    //         </Dialog>
    //
    //     </div>
    // );

    const dispatch = useDispatch<AppDispatch>();
    const { error, user} = useSelector((state: RootState) => state.users)
    const navigate = useNavigate()

    const {
        register: registerFormRegister,
        handleSubmit: handleSubmitRegisterForm,
        formState: {errors: registerFormErrors},
        clearErrors: clearErrorsRegisterForm,
    } = useForm<RegisterFormType>({
        resolver: yupResolver(registerFormSchema)
    })

    const onSubmitRegisterForm = (data: RegisterFormType) => {
        const registerData: User = {
            username: data.username,
            password: data.password,
            email: data.email,
            phone: data.phone,
            fullName: data.fullName,
            gender: data?.gender,
            companyName: data.companyName,
            avatar: '',
            birthDate: data?.birthDate,
            address: {
                province: data.province,
                district: data.province,
                ward: data.ward,
                specific: data.specificAddress
            }
        }
        dispatch(registerAccount(registerData))
    }

    // useEffect(() => {
    //     if(user && !error){
    //         navigate(PathNamesConstant.login)
    //     }
    // }, [user, user])

    const handleClearErrorExistUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(error?.username)
        if (error?.username) {
            clearErrorsRegisterForm('username')
        }
    }

    return (
        <>
            <Form className='mb-3' onSubmit={handleSubmitRegisterForm(onSubmitRegisterForm)}>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Tên người dùng <span className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='text' className='form-control'
                        placeholder='Nhập tên người dùng'
                        autoFocus
                        {...registerFormRegister('username')}
                        isInvalid={!!registerFormErrors.username || !!error?.username}
                        onChange={handleClearErrorExistUsername}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.username && error?.username}
                        {registerFormErrors.username && registerFormErrors.username.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Mật khẩu <span className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='password'
                        className='form-control'
                        placeholder='Nhập mật khẩu'
                        autoFocus
                        {...registerFormRegister('password')}
                        isInvalid={!!registerFormErrors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.password && registerFormErrors.password.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Nhập lại mật khẩu <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='password'
                        className='form-control'
                        placeholder='Nhập lại mật khẩu'
                        autoFocus
                        {...registerFormRegister('confirmPassword')}
                        isInvalid={!!registerFormErrors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.confirmPassword && registerFormErrors.confirmPassword.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Địa chỉ email <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Nhập lại mật khẩu'
                        autoFocus
                        {...registerFormRegister('email')}
                        isInvalid={!!registerFormErrors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.email && registerFormErrors.email.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Số điện thoại <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Nhập lại mật khẩu'
                        autoFocus
                        {...registerFormRegister('phone')}
                        isInvalid={!!registerFormErrors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.phone && registerFormErrors.phone.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Họ và tên <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Nhập lại mật khẩu'
                        autoFocus
                        {...registerFormRegister('fullName')}
                        isInvalid={!!registerFormErrors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.fullName && registerFormErrors.fullName.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Giới tính</Form.Label>
                    <Form.Select
                        className='form-control'
                        autoFocus
                        {...registerFormRegister('gender')}
                    >
                        {
                            Object.values(Gender).map((gender, index) => (
                                <option key={index} value={String(gender.value)}>{gender.label}</option>
                            ))
                        }
                    </Form.Select>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Ngày sinh</Form.Label>
                    <Form.Control
                        type='date'
                        className='form-control'
                        placeholder='Nhập ngày sinh'
                        autoFocus
                        {...registerFormRegister('birthDate')}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Tên công ty</Form.Label>
                    <Form.Control
                        type='text'
                        className='form-control'
                        placeholder='Nhập tên công ty'
                        autoFocus
                        {...registerFormRegister('companyName')}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Tỉnh / Thành phố <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Select
                        className='form-control'
                        autoFocus
                        {...registerFormRegister('province')}
                        isInvalid={!!registerFormErrors.province}
                        style={{backgroundImage: 'unset'}}
                    >
                        <option>1</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.district && registerFormErrors.district.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Quận / Huyện <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Select
                        className='form-control'
                        autoFocus
                        {...registerFormRegister('district')}
                        isInvalid={!!registerFormErrors.district}
                        style={{backgroundImage: 'unset'}}
                    >
                        <option>1</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.district && registerFormErrors.district.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Xã / Phường <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Select
                        className='form-control'
                        autoFocus
                        {...registerFormRegister('ward')}
                        isInvalid={!!registerFormErrors.ward}
                        style={{backgroundImage: 'unset'}}
                    >
                        <option>1</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.ward && registerFormErrors.ward.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-5">
                    <Form.Label className='font-weight-semi-bold'>Địa chỉ cụ thể <span className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={4}
                        className='form-control'
                        placeholder='Nhập địa chỉ cụ thể'
                        autoFocus
                        {...registerFormRegister('specificAddress')}
                        isInvalid={!!registerFormErrors.specificAddress}
                    />
                    <Form.Control.Feedback type="invalid">
                        {registerFormErrors.specificAddress && registerFormErrors.specificAddress.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <Button type='submit' className="btn-lg btn-primary w-100">Đăng ký</Button>
            </Form>

            <div className="row m-auto">
                <span>Bạn đã có tài khoản? <NavLink to={PathNamesConstant.login} className='font-weight-semi-bold'>Đăng nhập ngay</NavLink></span>
            </div>
        </>
    )
};

export default Register;
