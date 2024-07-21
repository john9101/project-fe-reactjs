import React, {useEffect } from 'react';
// import TextField from '@mui/material/TextField';
// import {Alert, Snackbar, Fade, InputAdornment, IconButton, OutlinedInput, FormControl} from '@mui/material';
// import Link from '@mui/material/Link';
import {NavLink, useNavigate} from 'react-router-dom';
// import { useAuth } from '../context/UserContext';
import '../assets/css/styleLogin.scss';
// import http from '../util/http';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import Logo from "../components/common/Logo";
import {PathNamesConstant} from "../constants/pathNames.constant";
import {Form, FormGroup, Button} from "react-bootstrap";
import * as Yup from 'yup'
import {useForm} from "react-hook-form";
import {User} from "../types/user.type";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";
import {loginAccount} from "../store/user.slice";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
// import {method} from "lodash";

// interface Errors {
//     username?: string;
//     password?: string;
// }

const loginFormSchema = Yup.object().shape({
    username: Yup.string()
        .required('Tên người dùng không được bỏ trống'),
    password: Yup.string()
        .required("Mật khẩu không được bỏ trống")
})

const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const {user} = useSelector((state: RootState) => state.users)
    const navigate = useNavigate()

    const {
        register: loginFormRegister,
        handleSubmit: handleSubmitLoginForm,
        formState: {errors: loginFormErrors}
    } = useForm<Pick<User, 'username' | 'password'>>({
        resolver: yupResolver(loginFormSchema)
    })

    const onSubmitLoginForm = (data: Pick<User, 'username' | 'password'>) => {
        dispatch(loginAccount(data))
    }

    useEffect(() => {
        if(user){
            navigate(PathNamesConstant.home)
        }
    }, [user])

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState<Errors>({});
    // const navigate = useNavigate();
    // const { login } = useAuth();
    //
    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if (storedUser) {
    //         const user = JSON.parse(storedUser);
    //         setUsername(user.username);
    //     }
    // }, []);
    //

    //
    // const validate = () => {
    //     let tempErrors: Errors = {};
    //     tempErrors.username = username ? '' : 'Vui lòng nhập tên đăng nhập của bạn';
    //     tempErrors.password = password ? '' : 'Vui lòng nhập mật khẩu của bạn';
    //     setErrors(tempErrors);
    //     return Object.values(tempErrors).every(x => x === '');
    // };
    //
    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     if (validate()) {
    //         try {
    //             const response = await http.post('login', { username, password });
    //             const user = response.data.user;
    //             login(user);
    //             localStorage.setItem('user', JSON.stringify(user));  // Save user data to localStorage
    //             setSuccessMessage(true);
    //             setFailureMessage(false);
    //             navigate('/');
    //         } catch (error) {
    //             setSuccessMessage(false);
    //             setFailureMessage(true);
    //             console.error('Login failed:', error);
    //         }
    //     } else {
    //         setSuccessMessage(false);
    //         setFailureMessage(true);
    //     }
    // };
    //
    // const [showPassword, setShowPassword] = useState(false);
    // const handleClickShowPassword = () => setShowPassword((show) => !show);
    // const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault();
    // };

    return (
        // <div>
        //     <Snackbar
        //         className='showAlert'
        //         open={successMessage}
        //         autoHideDuration={5000}
        //         TransitionComponent={Fade}
        //         onClose={() => setSuccessMessage(false)}
        //     >
        //         <Alert className='alertSuccess' variant="outlined" severity="success">
        //             Đăng nhập thành công.
        //         </Alert>
        //     </Snackbar>
        //     <Snackbar
        //         className='showAlert'
        //         open={failureMessage}
        //         autoHideDuration={5000}
        //         TransitionComponent={Fade}
        //         onClose={() => setFailureMessage(false)}
        //     >
        //         <Alert className='alertFail' variant="outlined" severity="error">
        //             Đăng nhập thất bại
        //         </Alert>
        //     </Snackbar>
        //     <form className='componentLogin' onSubmit={handleSubmit}>
        //         <span className='titleLogin'>Đăng nhập</span>
        //         <span className='titleInput'>Tên đăng nhập: <span className='note'> *</span></span>
        //         <TextField
        //             className='inputArea'
        //             placeholder='Nhập tên đăng nhập của bạn'
        //             value={username}
        //             onChange={(e) => setUsername(e.target.value)}
        //             error={!!errors.username}
        //             helperText={errors.username}
        //         />
        //         <span className='titleInput'>Mật khẩu: <span className='note'> *</span></span>
        //         <OutlinedInput
        //             className='inputArea'
        //             type={showPassword ? 'text' : 'password'}
        //             placeholder='Nhập mật khẩu'
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             error={!!errors.password}
        //             endAdornment={
        //                 <InputAdornment position="end">
        //                     <IconButton
        //                         aria-label="toggle password visibility"
        //                         onClick={handleClickShowPassword}
        //                         onMouseDown={handleMouseDownPassword}
        //                         edge="end"
        //                     >
        //                         {showPassword ? <VisibilityOff /> : <Visibility />}
        //                     </IconButton>
        //                 </InputAdornment>
        //             }
        //         />
        //         <div className="forgotPassArea">
        //             <Link href="/account/forgot-password" underline="none" className='forgotPassword'>
        //                 Quên mật khẩu?
        //             </Link>
        //         </div>
        //         <Button className='btnLogin' type="submit" variant="contained">Đăng nhập</Button>
        //         <span className='titleToRegister'>Bạn chưa có tài khoản? <Link href="/account/register" underline="none">
        //             Tạo tài khoản mới tại đây
        //         </Link></span>
        //     </form>
        // </div>

        <>
            <Form className='mb-3' onSubmit={handleSubmitLoginForm(onSubmitLoginForm)}>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Tên người dùng <span className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='text' className='form-control-lg'
                        placeholder='Nhập tên người dùng'
                        autoFocus
                        {...loginFormRegister('username')}
                        isInvalid={!!loginFormErrors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {loginFormErrors.username && loginFormErrors.username?.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label className='font-weight-semi-bold'>Mật khẩu <span
                        className='text-danger'>*</span></Form.Label>
                    <Form.Control
                        type='password'
                        className='form-control-lg'
                        placeholder='Nhập mật khẩu'
                        autoFocus
                        {...loginFormRegister('password')}
                        isInvalid={!!loginFormErrors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {loginFormErrors.password && loginFormErrors.password?.message}
                    </Form.Control.Feedback>
                </FormGroup>
                <div className="forgot mb-3 d-flex justify-content-start">
                                    <span className='font-weight-semi-bold'><NavLink
                                        to={PathNamesConstant.forgotPassword}>Quên mật khẩu?</NavLink></span>
                </div>
                <Button type='submit' className="btn-lg btn-primary w-100">Đăng nhập</Button>
            </Form>

            <div className="row m-auto">
                <span>Bạn chưa có tài khoản? <NavLink to={PathNamesConstant.register} className='font-weight-semi-bold'>Đăng ký ngay</NavLink></span>
            </div>
        </>
    )
}

export default Login;
