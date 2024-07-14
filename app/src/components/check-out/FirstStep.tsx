import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

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

function FirstStep() {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvinceID, setSelectedProvinceID] = useState<number | null>(null);
    const [selectedDistrictID, setSelectedDistrictID] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string | null>(null);
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

    const token = '7e2513c5-ed99-11ee-983e-5a49fc0dd8ec';

    useEffect(() => {
        axios
            .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                headers: {
                    'Token': token,
                },
            })
            .then((response) => {
                if (response.data.code === 200) {
                    setProvinces(response.data.data);
                } else {
                    console.error('Error fetching provinces', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching provinces', error);
            });
    }, []);

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceID = parseInt(e.target.value, 10);
        setSelectedProvinceID(provinceID);
        setSelectedDistrictID(null);
        setWards([]);
        axios
            .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                headers: {
                    'Token': token,
                },
                params: {
                    province_id: provinceID,
                },
            })
            .then((response) => {
                if (response.data.code === 200) {
                    setDistricts(response.data.data);
                } else {
                    console.error('Error fetching districts', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching districts', error);
            });
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtID = parseInt(e.target.value, 10);
        setSelectedDistrictID(districtID);
        setSelectedWardCode(null);
        axios
            .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                headers: {
                    'Token': token,
                },
                params: {
                    district_id: districtID,
                },
            })
            .then((response) => {
                if (response.data.code === 200) {
                    setWards(response.data.data);
                } else {
                    console.error('Error fetching wards', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching wards', error);
            });
    };

    const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const wardCode = e.target.value;
        setSelectedWardCode(wardCode);
        calculateShippingFee(selectedDistrictID, wardCode);
    };

    const calculateShippingFee = (toDistrictID: number | null, toWardCode: string | null) => {
        if (!toDistrictID || !toWardCode) return;

        const fromDistrictID = 1542;
        const serviceTypeID = 1;
        const weight = 1000;
        const length = 15;
        const width = 15;
        const height = 15;
        axios
            .post(
                'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
                {
                    service_type_id: serviceTypeID,
                    insurance_value: 0,
                    coupon: null,
                    from_district_id: fromDistrictID,
                    to_district_id: toDistrictID,
                    to_ward_code: toWardCode,
                    height,
                    length,
                    weight,
                    width,
                },
                {
                    headers: {
                        'token': token,
                        'shop_id': 4982538,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 200) {
                    setDeliveryFee(response.data.data.total);
                } else {
                    console.error('Error calculating fee', response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error calculating fee', error);
            });
    };

    return (
        <div className="mb-4 container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div className="d-flex flex-row align-items-center">
                    <h4 className="text-uppercase mt-1">Thông tin thanh toán</h4>

                </div>
                <NavLink to={"/cart"}>Hủy bỏ</NavLink>
            </div>
            <div className="row">
                <form className={"row"}>
                    <div className="col-md-6 form-group">
                        <label>Tên đầy đủ</label>
                        <input className="form-control" type="text" placeholder="VD: Nguyễn Văn A" required/>
                    </div>
                    <div className="col-md-6 form-group">
                        <label>Số điện thoại</label>
                        <input className="form-control" type="text" placeholder="VD: 0901323999"/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label>E-mail</label>
                        <input className="form-control" type="text" placeholder="example@email.com"/>
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Địa chỉ cụ thể</label>
                        <input className="form-control" type="text" placeholder="VD: 123 Nguyễn Trãi"/>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <select className="form-select form-control" id="province-select" name="province"
                                onChange={handleProvinceChange}>
                            <option value="">--Chọn Tỉnh Thành--</option>
                            {provinces.map((province) => (
                                <option key={province.ProvinceID} value={province.ProvinceID}>
                                    {province.ProvinceName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Chọn quận huyện</label>
                        <select
                            className="form-select form-control"
                            id="district-select"
                            name="district"
                            onChange={handleDistrictChange}
                            disabled={!selectedProvinceID}
                        >
                            <option value="">--Chọn Quận huyện--</option>
                            {districts.map((district) => (
                                <option key={district.DistrictID} value={district.DistrictID}>
                                    {district.DistrictName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 form-group">
                        <label>Chọn Phường xã</label>
                        <select
                            className="form-select form-control"
                            id="ward-select"
                            name="ward"
                            onChange={handleWardChange}
                            disabled={!selectedDistrictID}
                        >
                            <option value="">--Chọn Phường/Xã--</option>
                            {wards.map((ward) => (
                                <option key={ward.WardCode} value={ward.WardCode}>
                                    {ward.WardName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12 form-group">
                        <label>Ghi chú thêm</label>
                        <input className="form-control" type="text" placeholder="VD: Giao giờ hành chính"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FirstStep;
