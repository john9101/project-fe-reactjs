import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import Address from './Address';

interface EditDialogProps {
  open: boolean;
  onClose: () => void;
}
interface AddressData {
  province: string | null;
  district: string | null;
  ward: string | null;
  specific: string;
}
interface Errors {
  username?: string;
  password?: string;
  rePassword?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  termsAccepted?: string;
}
const EditDialog: React.FC<EditDialogProps> = ({ open, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressData, setAddressData] = useState<AddressData>({
    province: null,
    district: null,
    ward: null,
    specific: '',
  });
  const [errors, setErrors] = useState<Errors>({});

  const validateFullName = (value: string) => value ? '' : 'Vui lòng nhập họ và tên';

  const validatePhone = (value: string) => {
    const phoneRegex = /^0\d{9}$/;
    if (value.trim() === '') return 'Vui lòng nhập số điện thoại';
    if (!phoneRegex.test(value)) return 'Số điện thoại phải gồm 10 chữ số bắt đầu từ số 0';
    return '';
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') return 'Vui lòng nhập email công ty hoặc email của bạn';
    if (!emailRegex.test(value)) return 'Email không hợp lệ!';
    return '';
  };

  const handleAddressChange = (address: AddressData) => setAddressData(address);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle style={{ textAlign: 'center' }}>Chỉnh sửa thông tin cá nhân</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
        <span className='titleInput' style={{ marginBottom: '10px' }}>Họ và tên người đại diện: <span className='note'> *</span></span>
        <TextField
          style={{ marginBottom: '10px' }}
          className='inputArea'
          placeholder='Nhập họ và tên'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, fullName: validateFullName(fullName) }))}
          error={!!errors.fullName}
          helperText={errors.fullName}
          InputProps={{
            endAdornment: (
              fullName && !errors.fullName ? (
                <InputAdornment position="end">
                  <CheckCircleOutline style={{ color: 'green' }} />
                </InputAdornment>
              ) : null
            )
          }}
        />
        <div className='chooseArea'
        style={{display: 'flex', margin: '10px 0px', justifyContent: 'space-between'}}>
          <div className="chooseDOB"
          style={{display: 'flex', flexDirection: 'column', flexBasis: '40%'}}>
            <span className='titleInput' style={{ marginBottom: '10px' }}>Ngày sinh:</span>
            <TextField
              style={{ marginBottom: '10px' }}
              className='inputArea'
              type='date'
              value={dob}
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>
          <div className="chooseGender"
          style={{display: 'flex', flexDirection: 'column', flexBasis: '40%'}}>
            <span className='titleInput' style={{ marginBottom: '10px' }}>Giới tính: </span>
            <RadioGroup
            style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0px 50px'}}
              className='groupGender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="1" control={<Radio />} label="Nam" />
              <FormControlLabel value="0" control={<Radio />} label="Nữ" />
            </RadioGroup>
          </div>
        </div>
        <span className='titleInput' style={{ marginBottom: '10px' }}>Tên công ty:</span>
        <TextField
          style={{ marginBottom: '10px' }}
          className='inputArea'
          placeholder='Nhập tên công ty của bạn'
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <span className='titleInput' style={{ marginBottom: '10px' }}>Số điện thoại: <span className='note'> *</span></span>
        <TextField
          style={{ marginBottom: '10px' }}
          className='inputArea'
          placeholder='Nhập số điện thoại của công ty hoặc số điện thoại cá nhân'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, phone: validatePhone(phone) }))}
          error={!!errors.phone}
          helperText={errors.phone}
          InputProps={{
            endAdornment: (
              phone && !errors.phone ? (
                <InputAdornment position="end">
                  <CheckCircleOutline style={{ color: 'green' }} />
                </InputAdornment>
              ) : null
            )
          }}
        />
        <span className='titleInput' style={{ marginBottom: '10px' }}>Email: <span className='note'> *</span></span>
        <TextField
          style={{ marginBottom: '10px' }}
          className='inputArea'
          placeholder='Ví dụ: example@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setErrors((prevErrors) => ({ ...prevErrors, email: validateEmail(email) }))}
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            endAdornment: (
              email && !errors.email ? (
                <InputAdornment position="end">
                  <CheckCircleOutline style={{ color: 'green' }} />
                </InputAdornment>
              ) : null
            )
          }}
        />
        <span className='titleInput' style={{ marginBottom: '10px' }}>Địa chỉ:</span>
        <Address onChange={handleAddressChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Hủy
        </Button>
        <Button color="primary">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
