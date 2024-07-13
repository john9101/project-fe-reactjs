import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
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
    specificAddress: string;
}

const ComboBox: React.FC<AddressProps> = ({ onChange }) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);
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
                specificAddress,
            });
        }
    }, [selectedProvince, selectedDistrict, selectedWard, specificAddress, onChange]);

    return (
        <div className="comboBox">
            <InputLabel className="selectAddress" variant="standard" htmlFor="province-native">
                Tỉnh/Thành phố
            </InputLabel>
            <NativeSelect
                className="optionSelect"
                value={selectedProvince || ''}
                onChange={(event) => setSelectedProvince(event.target.value)}
                inputProps={{
                    name: 'province',
                    id: 'province-native',
                }}
            >
                <option className="option" value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((province) => (
                    <option className="option" key={province.ProvinceID} value={province.ProvinceName}>
                        {province.ProvinceName}
                    </option>
                ))}
            </NativeSelect>

            <InputLabel className="selectAddress" variant="standard" htmlFor="district-native">
                Quận/Huyện
            </InputLabel>
            <NativeSelect
                className="optionSelect"
                value={selectedDistrict || ''}
                onChange={(event) => setSelectedDistrict(event.target.value)}
                inputProps={{
                    name: 'district',
                    id: 'district-native',
                }}
                disabled={!selectedProvince}
            >
                <option className="option" value="">Chọn Quận/Huyện</option>
                {districts.map((district) => (
                    <option className="option" key={district.DistrictID} value={district.DistrictName}>
                        {district.DistrictName}
                    </option>
                ))}
            </NativeSelect>

            <InputLabel className="selectAddress" variant="standard" htmlFor="ward-native">
                Phường/Xã
            </InputLabel>
            <NativeSelect
                className="optionSelect"
                value={selectedWard || ''}
                onChange={(event) => setSelectedWard(event.target.value)}
                inputProps={{
                    name: 'ward',
                    id: 'ward-native',
                }}
                disabled={!selectedDistrict}
            >
                <option className="option" value="">Chọn Phường/Xã</option>
                {wards.map((ward) => (
                    <option className="option" key={ward.WardCode} value={ward.WardName}>
                        {ward.WardName}
                    </option>
                ))}
            </NativeSelect>

            <TextField
                className="inputArea"
                id="outlined-basic"
                label="Địa chỉ cụ thể"
                sx={{ width: 300 }}
                value={specificAddress}
                onChange={(e) => setSpecificAddress(e.target.value)}
            />
        </div>
    );
};

export default ComboBox;
