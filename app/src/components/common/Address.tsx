import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { fetchProvinces, fetchDistricts, fetchWards } from '../../util/apiAddress';

interface AddressProps {
    onChange: (address: AddressData) => void;
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

interface AddressData {
    province: string | null;
    district: string | null;
    ward: string | null;
    specific: string;
}

const AddressSelect: React.FC<AddressProps> = ({ onChange }) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
    const [specific, setspecific] = useState<string>('');

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
                const province = provinces.find(p => p.ProvinceName === selectedProvince);
                if (province) {
                    const data = await fetchDistricts(province.ProvinceID);
                    setDistricts(data);
                    setWards([]);
                    setSelectedDistrict(null);
                    setSelectedWard(null);
                }
            };
            getDistricts();
        }
    }, [selectedProvince, provinces]);

    useEffect(() => {
        if (selectedDistrict) {
            const getWards = async () => {
                const district = districts.find(d => d.DistrictName === selectedDistrict);
                if (district) {
                    const data = await fetchWards(district.DistrictID);
                    setWards(data);
                    setSelectedWard(null);
                }
            };
            getWards();
        }
    }, [selectedDistrict, districts]);

    useEffect(() => {
        if (onChange) {
            onChange({
                province: selectedProvince,
                district: selectedDistrict,
                ward: selectedWard,
                specific,
            });
        }
    }, [selectedProvince, selectedDistrict, selectedWard, specific, onChange]);

    return (
        <div className="address-select">
            <InputLabel htmlFor="province-native">Tỉnh/Thành phố</InputLabel>
            <Select className="optionSelect" style={{width: '100%', marginBottom: '20px'}}
                value={selectedProvince || ''}
                onChange={(event) => setSelectedProvince(event.target.value as string)}
                inputProps={{
                    name: 'province',
                    id: 'province-native',
                }}
            >
                <MenuItem value="">Chọn Tỉnh/Thành phố</MenuItem>
                {provinces.map((province) => (
                    <MenuItem key={province.ProvinceID} value={province.ProvinceName}>
                        {province.ProvinceName}
                    </MenuItem>
                ))}
            </Select>

            <InputLabel htmlFor="district-native">Quận/Huyện</InputLabel>
            <Select className="optionSelect" style={{width: '100%', marginBottom: '20px'}}
                value={selectedDistrict || ''}
                onChange={(event) => setSelectedDistrict(event.target.value as string)}
                inputProps={{
                    name: 'district',
                    id: 'district-native',
                }}
                disabled={!selectedProvince}
            >
                <MenuItem value="">Chọn Quận/Huyện</MenuItem>
                {districts.map((district) => (
                    <MenuItem key={district.DistrictID} value={district.DistrictName}>
                        {district.DistrictName}
                    </MenuItem>
                ))}
            </Select>

            <InputLabel htmlFor="ward-native">Phường/Xã</InputLabel>
            <Select className="optionSelect" style={{width: '100%', marginBottom: '20px'}}
                value={selectedWard || ''}
                onChange={(event) => setSelectedWard(event.target.value as string)}
                inputProps={{
                    name: 'ward',
                    id: 'ward-native',
                }}
                disabled={!selectedDistrict}
            >
                <MenuItem value="">Chọn Phường/Xã</MenuItem>
                {wards.map((ward) => (
                    <MenuItem key={ward.WardCode} value={ward.WardName}>
                        {ward.WardName}
                    </MenuItem>
                ))}
            </Select>

            <TextField
                style={{width: '100%'}}
                className='inputArea'
                id="outlined-basic"
                label="Địa chỉ cụ thể"
                sx={{ width: 300 }}
                value={specific}
                onChange={(e) => setspecific(e.target.value)}
            />
        </div>
    );
};

export default AddressSelect;
