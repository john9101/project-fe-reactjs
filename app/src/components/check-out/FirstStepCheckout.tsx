import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";
import {CheckoutFormType} from "../../pages/CheckOut";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import {Form} from "react-bootstrap";

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

const firstStepCheckoutSchema = Yup.object().shape({
    fullName: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    province: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
    district: Yup.string().required('Vui lòng chọn quận/huyện'),
    ward: Yup.string().required('Vui lòng chọn phường/xã'),
    specificAddress: Yup.string().required('Vui lòng nhập địa chỉ cụ thể'),
    note: Yup.string(),
});

interface FirstStepCheckoutProps {
    handleCheckFormDataChange: (newCheckoutFormData: CheckoutFormType) => void;
    activeStep: number;
    setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

const FirstStepCheckout = ({handleCheckFormDataChange, activeStep, setActiveStep}: FirstStepCheckoutProps) => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvinceID, setSelectedProvinceID] = useState<number | null>(null);
    const [selectedDistrictID, setSelectedDistrictID] = useState<number | null>(null);
    const [selectedWardCode, setSelectedWardCode] = useState<string | null>(null);
    const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

    const {
        register: firstStepCheckoutRegister,
        handleSubmit: handleSubmitFirstStepCheckout,
        formState: {errors: firstStepCheckoutErrors},
        reset
    } = useForm<Omit<CheckoutFormType, 'paymentMethod'>>({
        resolver: yupResolver(firstStepCheckoutSchema)
    });

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
        e.preventDefault();
        const provinceID = parseInt(e.target.value);
        setSelectedProvinceID(provinceID);
        setDistricts([]);
        setWards([]);
        setSelectedDistrictID(null);
        setSelectedWardCode(null);
        // setValue('province', provinceID.toString());
        // clearErrors('province');
        reset({district: '', ward: ''});
        if (provinceID) {
            axios
                .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/district', {
                    headers: {'Token': token},
                    params: {province_id: provinceID},
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
        } else {
            // trigger('province');
        }
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const districtID = parseInt(e.target.value);
        setSelectedDistrictID(districtID);
        setWards([]);
        setSelectedWardCode(null);
        reset({ward: ''});
        // setValue('district', districtID.toString());
        // clearErrors('district');
        if (districtID) {
            axios
                .get('https://online-gateway.ghn.vn/shiip/public-api/master-data/ward', {
                    headers: {'Token': token},
                    params: {district_id: districtID},
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
        } else {
            // trigger('district');
        }
    };

    const handleWardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const wardCode = e.target.value;
        setSelectedWardCode(wardCode);
        // setValue('ward', wardCode);
        // clearErrors('ward');
        if (!wardCode) {
            // trigger('ward');
        }
        // calculateShippingFee(selectedDistrictID, wardCode);
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

    const onSubmitFirstStepCheckout = (firstStepCheckoutData: Omit<CheckoutFormType, 'paymentMethod'>) => {
        const selectedProvince = provinces.find((province) => province.ProvinceID === selectedProvinceID);
        const selectedDistrict = districts.find((district) => district.DistrictID === selectedDistrictID);
        const selectedWard = wards.find((ward) => ward.WardCode === selectedWardCode);

        firstStepCheckoutData.province = selectedProvince?.ProvinceName!;
        firstStepCheckoutData.district = selectedDistrict?.DistrictName!;
        firstStepCheckoutData.ward = selectedWard?.WardName!;
        handleCheckFormDataChange({...firstStepCheckoutData, paymentMethod: ''});
        setActiveStep((prevStep) => prevStep + 1);
    }

    return (
        <div className="mb-4 container">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div className="d-flex flex-row align-items-center">
                    <h4 className="text-uppercase mt-1">Thông tin thanh toán</h4>
                </div>
                <NavLink to={"/cart"}>Quay về giỏ hàng</NavLink>
            </div>
            <Form className={"row"} onSubmit={handleSubmitFirstStepCheckout(onSubmitFirstStepCheckout)}>
                <Form.Group className="col-md-6 mb-2">
                    <Form.Label>Họ và tên <span className="text-danger">*</span></Form.Label>
                    <Form.Control {...firstStepCheckoutRegister('fullName')} className="form-control" type="text"
                                  placeholder="VD: Nguyễn Văn A" isInvalid={!!firstStepCheckoutErrors.fullName}/>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.fullName?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-6 mb-2">
                    <Form.Label>Số điện thoại <span className="text-danger">*</span></Form.Label>
                    <Form.Control {...firstStepCheckoutRegister('phone')} className="form-control" type="text"
                                  placeholder="VD: 0901323999" isInvalid={!!firstStepCheckoutErrors.phone}/>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.phone?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-12 mb-3">
                    <Form.Label>Địa chỉ email <span className="text-danger">*</span></Form.Label>
                    <Form.Control {...firstStepCheckoutRegister('email')} className="form-control" type="text"
                                  placeholder="example@email.com" isInvalid={!!firstStepCheckoutErrors.email}/>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.email?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                    <Form.Label>Chọn tỉnh thành <span className="text-danger">*</span></Form.Label>
                    <Form.Select {...firstStepCheckoutRegister('province')}
                                 className="form-select form-control" id="province-select" name="province"
                                 onChange={handleProvinceChange}
                                 isInvalid={!!firstStepCheckoutErrors.province}
                                 style={{backgroundImage: 'unset'}}
                    >
                        <option value="">--Chọn Tỉnh Thành--</option>
                        {provinces.map((province) => (
                            <option key={province.ProvinceID} value={province.ProvinceID}>
                                {province.ProvinceName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.province?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                    <Form.Label>Chọn quận huyện <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                        {...firstStepCheckoutRegister('district')}
                        className="form-select form-control"
                        id="district-select"
                        name="district"
                        onChange={handleDistrictChange}
                        disabled={!selectedProvinceID}
                        isInvalid={!!firstStepCheckoutErrors.district}
                        style={{backgroundImage: 'unset'}}
                    >
                        <option value="">--Chọn Quận huyện--</option>
                        {districts.map((district) => (
                            <option key={district.DistrictID} value={district.DistrictID}>
                                {district.DistrictName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.district?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-4 mb-2">
                    <Form.Label>Chọn Phường xã <span className="text-danger">*</span></Form.Label>
                    <Form.Select
                        {...firstStepCheckoutRegister('ward')}
                        className="form-select form-control"
                        id="ward-select"
                        name="ward"
                        onChange={handleWardChange}
                        disabled={!selectedDistrictID}
                        isInvalid={!!firstStepCheckoutErrors.ward}
                        style={{backgroundImage: 'unset'}}
                    >
                        <option value="">--Chọn Phường/Xã--</option>
                        {wards.map((ward) => (
                            <option key={ward.WardCode} value={ward.WardCode}>
                                {ward.WardName}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.ward?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-12 mb-2">
                    <Form.Label>Địa chỉ cụ thể <span className="text-danger">*</span></Form.Label>
                    <Form.Control className="form-control" type="text" {...firstStepCheckoutRegister('specificAddress')}
                                  placeholder="VD: 123 Nguyễn Trãi"
                                  isInvalid={!!firstStepCheckoutErrors.specificAddress}/>
                    <Form.Control.Feedback type='invalid'>
                        {firstStepCheckoutErrors.specificAddress?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-12 mb-2">
                    <Form.Label>Ghi chú thêm</Form.Label>
                    <Form.Control className="form-control" type="text"
                                  placeholder="VD: Giao giờ hành chính" {...firstStepCheckoutRegister('note')}/>
                </Form.Group>
                <Box className={"col-12"} sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                    <Box sx={{flex: '1  auto'}}/>
                    <Button variant="primary" className={"fa-pull-right"} type="submit">
                        Tiếp tục
                    </Button>
                </Box>
            </Form>
        </div>
    );
}

export default FirstStepCheckout;