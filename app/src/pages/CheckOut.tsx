import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import FirstStepCheckout from "../components/check-out/FirstStepCheckout";
import Button from "react-bootstrap/Button";
import SecondStepCheckout from "../components/check-out/SecondStepCheckout";
import ThirdStep from "../components/check-out/ThirdStep";
import { useState } from "react";
import {useLocation} from "react-router-dom";

const steps: string[] = ['Thông tin thanh toán', 'Phương thức thanh toán', 'Kiểm tra hóa đơn'];

export interface CheckoutFormType {
    fullName: string;
    email: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    specificAddress: string;
    note?: string;
    paymentMethod: string;
}

export default function CheckOut() {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormType | null>(null);
    const {state} = useLocation();
    const isStepOptional = (step: number) => step === 1;
    const isStepSkipped = (step: number) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };
    const handleReset = () => setActiveStep(0);
    const handleCheckFormDataChange = (newCheckoutFormData: CheckoutFormType) => setCheckoutFormData(newCheckoutFormData);

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <FirstStepCheckout
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    handleCheckFormDataChange={handleCheckFormDataChange}
                />;
            case 1:
                return <SecondStepCheckout
                    setActiveStep={setActiveStep}
                    checkoutFormData={checkoutFormData!}
                    handleCheckFormDataChange={handleCheckFormDataChange}
                    totalPrice={state.totalPrice}
                />;
            case 2:
                return <ThirdStep checkoutFormData={checkoutFormData!}
                                  voucherCode={state.voucherCode}
                                  totalDiscount={state.totalDiscount}
                    totalPrice={state.totalPrice}
                />;
            default:
                return <FirstStepCheckout
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    handleCheckFormDataChange={handleCheckFormDataChange}
                />;
        }
    };

    console.log(checkoutFormData);

    return (
        <Box sx={{ width: '100%' }} className={"container"}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps} StepIconProps={{ style: { color: '#D19C97' } }}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        {getStepContent(activeStep)}
                    </Typography>
                </React.Fragment>
            )}
        </Box>
    );
}
