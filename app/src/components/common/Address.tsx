import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../../assets/css/styleRegister.scss'
interface Address {
    id: number;
    province: string;
    district: string[];
    ward: string[];
}

const address: Address[] = [
    {
        id: 0,
        province: 'TP. Hồ Chí Minh',
        district: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'TP Thủ Đức'],
        ward: ['Linh Trung', 'Linh Xuân', 'Linh Đông', 'Linh Tây', 'Bình Trưng Đông']
    },
    {
        id: 1,
        province: 'Hà Nội',
        district: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'TP Thủ Đức'],
        ward: ['Linh Trung', 'Linh Xuân', 'Linh Đông', 'Linh Tây', 'Bình Trưng Đông']
    }
];

interface Errors {
    province?: string;
    district?: string;
    ward?: string;
    specificAddress?: string;
}

export default function ComboBox() {
    const [selectedProvince, setSelectedProvince] = useState<Address | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [specificAddress, setSpecificAddress] = useState<string>('');
    const [errors, setErrors] = useState<Errors>({});

    const getDistricts = (province: Address | null): string[] => {
        if (!province) return [];
        return province.district;
    };

    const getWards = (province: Address | null, district: string | null): string[] => {
        if (!province || !district) return [];
        return province.ward;
    };

    const validate = () => {
        let tempErrors: Errors = {};
        tempErrors.province = selectedProvince ? '' : 'Vui lòng chọn tỉnh/thành phố';
        tempErrors.district = selectedDistrict ? '' : 'Vui lòng chọn quận/huyện';
        tempErrors.ward = selectedWard ? '' : 'Vui lòng chọn phường/xã';
        tempErrors.specificAddress = specificAddress ? '' : 'Vui lòng nhập địa chỉ cụ thể';
        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === '');
    };


    return (
        <div className='inputAddress'>
            <div className='inputAddress'>
                <Autocomplete className='inputArea'
                    disablePortal
                    id="province-combo-box"
                    options={address}
                    sx={{ width: 300, marginBottom: 2 }}
                    getOptionLabel={(option) => option.province}
                    onChange={(event, value) => {
                        setSelectedProvince(value);
                        setSelectedDistrict(null);
                        setSelectedWard(null);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tỉnh/Thành Phố"
                            error={!!errors.province}
                            helperText={errors.province}
                        />
                    )}
                />
                <Autocomplete className='inputArea'
                    disablePortal
                    id="district-combo-box"
                    options={getDistricts(selectedProvince)}
                    sx={{ width: 300, marginBottom: 2 }}
                    value={selectedDistrict}
                    onChange={(event, value) => {
                        setSelectedDistrict(value);
                        setSelectedWard(null);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Quận/Huyện"
                            error={!!errors.district}
                            helperText={errors.district}
                        />
                    )}
                    disabled={!selectedProvince}
                />
                <Autocomplete className='inputArea'
                    disablePortal
                    id="ward-combo-box"
                    options={getWards(selectedProvince, selectedDistrict)}
                    sx={{ width: 300, marginBottom: 2 }}
                    value={selectedWard}
                    onChange={(event, value) => setSelectedWard(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Phường/Xã"
                            error={!!errors.ward}
                            helperText={errors.ward}
                        />
                    )}
                    disabled={!selectedDistrict}
                />
            </div>
            <TextField className='inputArea'
                id="outlined-basic"
                label="Địa chỉ cụ thể"
                sx={{ width: 300 }}
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
                error={!!errors.specificAddress}
                helperText={errors.specificAddress}
            />
        </div>
    );
}
