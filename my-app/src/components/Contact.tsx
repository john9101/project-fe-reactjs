import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import colors from '../assets/color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { data } from '../translate/VnLanguage';
const CustomDiv = styled('div')({
  backgroundColor: colors.contact_background,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden'
});
const CustomButtons = styled('div')({
  backgroundColor: colors.contact_background,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: '10%',
});

const CustomButton = styled(Button)({
  color: colors.contact_text,
  textTransform: 'none',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  minWidth: 'fit-content',
  padding: '10px 15px',
  margin: '0px',
  '&:first-of-type': {
    // CSS cho Tab đầu tiên
    backgroundColor: colors.contact_phone,
    borderRadius: '5px',

  },
});


const Contact: React.FC = () => {
  return (
    <CustomDiv>
      <CustomButtons>
        <CustomButton>
          <FontAwesomeIcon icon={faPhone} /> {data.phoneNumber}
        </CustomButton>
        <CustomButton>
          <FontAwesomeIcon icon={faLocationDot} /> {data.location}
        </CustomButton>
        <CustomButton>
          <FontAwesomeIcon icon={faEnvelope} /> {data.email}
        </CustomButton>
      </CustomButtons>
    </CustomDiv >
  );
}
export default Contact;
