import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { fetchProvinces, fetchDistricts, fetchWards } from '../../util/apiAddress';

interface AddressProps {
    errors: Errors;
    setAddressData: (data: AddressData) => void;
    setAddressErrors: (errors: Errors) => void;
    addressData?: AddressData; // Thêm prop này để nhận dữ liệu địa chỉ ban đầu
}

interface Province {
    ProvinceID: number;
    ProvinceName: string;
}

interface District {
    DistrictID: number;
    DistrictName: string;
}

interface Ward {
    WardCode: string;
    WardName: string;
}

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

const ComboBox: React.FC<AddressProps> = ({ errors, setAddressData, setAddressErrors, addressData }) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
    const [specificAddress, setSpecificAddress] = useState<string>('');

    useEffect(() => {
        const getProvinces = async () => {
            const data = await fetchProvinces();
            setProvinces(data);
        };
        getProvinces();
    }, []);

    useEffect(() => {
        if (selectedProvince) {
            const getDistricts = async () => {
                const data = await fetchDistricts(selectedProvince.ProvinceID);
                setDistricts(data);
                setWards([]);
                setSelectedDistrict(null);
                setSelectedWard(null);
            };
            getDistricts();
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            const getWards = async () => {
                const data = await fetchWards(selectedDistrict.DistrictID);
                setWards(data);
                setSelectedWard(null);
            };
            getWards();
        }
    }, [selectedDistrict]);

    useEffect(() => {
        setAddressData({
            province: selectedProvince ? selectedProvince.ProvinceName : null,
            district: selectedDistrict ? selectedDistrict.DistrictName : null,
            ward: selectedWard ? selectedWard.WardName : null,
            specificAddress: specificAddress,
        });
    }, [selectedProvince, selectedDistrict, selectedWard, specificAddress]);

    // Sử dụng useEffect để nạp dữ liệu địa chỉ ban đầu
    useEffect(() => {
        if (addressData) {
            const { province, district, ward, specificAddress } = addressData;
            setSpecificAddress(specificAddress || '');

            if (province) {
                const selectedProv = provinces.find(p => p.ProvinceName === province);
                setSelectedProvince(selectedProv || null);
            }

            if (district) {
                const fetchAndSetDistricts = async () => {
                    if (selectedProvince) {
                        const districtsData = await fetchDistricts(selectedProvince.ProvinceID);
                        setDistricts(districtsData);
                        const selectedDist = districtsData.find((d: { DistrictName: string; }) => d.DistrictName === district);
                        setSelectedDistrict(selectedDist || null);
                    }
                };
                fetchAndSetDistricts();
            }

            if (ward) {
                const fetchAndSetWards = async () => {
                    if (selectedDistrict) {
                        const wardsData = await fetchWards(selectedDistrict.DistrictID);
                        setWards(wardsData);
                        const selectedWrd = wardsData.find((w: { WardName: string; }) => w.WardName === ward);
                        setSelectedWard(selectedWrd || null);
                    }
                };
                fetchAndSetWards();
            }
        }
    }, [addressData, provinces, selectedProvince, selectedDistrict]);

    return (
        <div className='inputAddress'>
            <Autocomplete
                className='inputArea'
                disablePortal
                id="province-combo-box"
                options={provinces}
                sx={{ width: 300, marginBottom: 2 }}
                getOptionLabel={(option) => option.ProvinceName}
                value={selectedProvince}
                onChange={(event, value) => {
                    setSelectedProvince(value);
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
            <Autocomplete
                className='inputArea'
                disablePortal
                id="district-combo-box"
                options={districts}
                sx={{ width: 300, marginBottom: 2 }}
                getOptionLabel={(option) => option.DistrictName}
                value={selectedDistrict}
                onChange={(event, value) => {
                    setSelectedDistrict(value);
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
            <Autocomplete
                className='inputArea'
                disablePortal
                id="ward-combo-box"
                options={wards}
                sx={{ width: 300, marginBottom: 2 }}
                getOptionLabel={(option) => option.WardName}
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
            <TextField
                className='inputArea'
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
