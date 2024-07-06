import React, {useState} from 'react';
import { Grid, Radio, FormControl,RadioGroup, Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CustomRadioButtonProps {
    label: string;
    value: string;
    selectedValue: string | null;
    onChange: (value: string) => void;
}

interface GridRadioButtonsProps{
    arrayValue: string[];
    onSetSelectedOptionName?: (optionName: string | null) => void
    onSetSelectedSize?: (size: string | null) => void
}

const CustomRadioButton = ({ label, value, selectedValue, onChange }: CustomRadioButtonProps) => (
    <Box
        component="label"
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            padding: '8px 16px',
            borderStyle: 'solid',
            borderWidth: value === selectedValue ? '2px' : '1px',
            borderColor: value === selectedValue ? 'var(--primary)' : 'grey.300',
            borderRadius: '8px',
            cursor: 'pointer',
            position: 'relative',
            backgroundColor: value === selectedValue ? 'var(--primary).100' : 'white',
            boxSizing: 'border-box',
            '&:hover': { backgroundColor: 'grey.100'},
        }}

    >
        {value === selectedValue && (
            <CheckCircleIcon
                fontSize={'small'}
                sx={{
                    position: 'absolute',
                    top: '-10px',
                    right: '-10px',
                    color: 'var(--primary)',
                    background: 'white',
                    borderRadius: '50%',
                    zIndex: 2,
                }}
            />
        )}
        <Typography
            sx={{
                overflow: 'hidden',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                WebkitBoxOrient: 'vertical',
                textAlign: "center",
                fontFamily: 'Manrope',
                letterSpacing: '-0.5px',
                fontWeight: '600',
                color: value === selectedValue ? 'var(--primary)' : 'black.500',
            }}
        >
            {label}
        </Typography>
        <Radio
            value={value}
            onClick={() => onChange(value)}
            hidden
            sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: "50%",
                transform: 'translateY(-50%)',
            }}
        />
    </Box>
);

const GridRadioButtons = ({arrayValue, onSetSelectedOptionName, onSetSelectedSize}: GridRadioButtonsProps) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleChange = (value: string) => {
        if(value === selectedValue){
            setSelectedValue(null);
            if(onSetSelectedOptionName){
                onSetSelectedOptionName(null);
            }

            if(onSetSelectedSize){
                onSetSelectedSize(null)
            }
        }else {
            setSelectedValue(value);
            if(onSetSelectedOptionName){
                onSetSelectedOptionName(value)
            }

            if(onSetSelectedSize){
                onSetSelectedSize(value)
            }
        }
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup
                onChange={event => handleChange(event.target.value)}>
                <Grid container spacing={2}>
                    {arrayValue.map((value, index) => (
                        <Grid item key={index}>
                            <CustomRadioButton
                                label={value}
                                value={value}
                                selectedValue={selectedValue}
                                onChange={handleChange}
                            />
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
        </FormControl>
    );
};

export default GridRadioButtons;
