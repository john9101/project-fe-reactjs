import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import '../../assets/css/styleRegister.scss';

interface AddressProps {
    errors: Errors;
    setAddressData: (data: AddressData) => void;
    setAddressErrors: (errors: Errors) => void;
}

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

interface AddressData {
    province: string | null;
    district: string | null;
    ward: string | null;
    specificAddress: string;
}

const ComboBox: React.FC<AddressProps> = ({ errors, setAddressData, setAddressErrors }) => {
    const [selectedProvince, setSelectedProvince] = useState<Address | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [specificAddress, setSpecificAddress] = useState<string>('');

    useEffect(() => {
        setAddressData({
            province: selectedProvince ? selectedProvince.province : null,
            district: selectedDistrict,
            ward: selectedWard,
            specificAddress: specificAddress
        });
    }, [selectedProvince, selectedDistrict, selectedWard, specificAddress, setAddressData]);

    const getDistricts = (province: Address | null): string[] => {
        if (!province) return [];
        return province.district;
    };

    const getWards = (province: Address | null, district: string | null): string[] => {
        if (!province || !district) return [];
        return province.ward;
    };

    return (
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
                onChange={(event, value) => {
                    setSelectedWard(value);
                }}
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
            <TextField className='inputArea'
                id="outlined-basic"
                label="Địa chỉ cụ thể"
                sx={{ width: 300 }}
                value={specificAddress}
                onChange={(e) => {
                    setSpecificAddress(e.target.value);
                }}
                error={!!errors.specificAddress}
                helperText={errors.specificAddress}
            />
        </div>
    );
};

export default ComboBox;
