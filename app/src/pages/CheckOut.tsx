import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FirstStep from "../components/check-out/FirstStep";
import Buttonb from "react-bootstrap/Button";
import SecondStep from "../components/check-out/SecondStep";
import ThirdStep from "../components/check-out/ThirdStep";
import { useForm } from 'react-hook-form';

const steps: string[] = ['Thông tin thanh toán', 'Phương thức thanh toán', 'Kiểm tra hóa đơn'];

export default function CheckOut() {
    const { handleSubmit, formState } = useForm();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const onSubmit = (data: any) => {
        // Handle form submission here, e.g., submit data to backend
        console.log(data);
        // Proceed to the next step
        handleNext();
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <FirstStep />;
            case 1:
                return <SecondStep />;
            case 2:
                return <ThirdStep />;
            default:
                return <FirstStep />;
        }
    };

    return (
        <Box sx={{ width: '100%' }} className={"container"}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}
                                       StepIconProps={{
                                           style: { color: '#D19C97' }
                                       }}>{label}</StepLabel>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Buttonb
                                    variant={"secondary"}
                                    disabled={activeStep === 0 || activeStep === steps.length - 1}
                                    onClick={handleBack}
                                    className={"mr-1"}
                                >
                                    Quay lại
                                </Buttonb>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Buttonb variant="primary" className={"fa-pull-right"} type="submit" disabled={!formState.isValid}>
                                    {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp tục'}
                                </Buttonb>
                            </Box>
                        </form>
                    </Typography>
                </React.Fragment>
            )}
        </Box>
    );
}
