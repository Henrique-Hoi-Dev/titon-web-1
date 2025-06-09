import React from 'react';
import { TextField } from '@mui/material';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

const PickerTime = ({
  minWidth,
  value,
  onChange,
  size,
  label,
  readOnly,
  height,
  ...props
}) => {
  return (
    <MobileTimePicker
      {...props}
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      inputFormat="HH:mm"
      renderInput={(props) => (
        <TextField
          size={`${size === 'medium' ? 'medium' : 'small'}`}
          {...props}
          sx={{
            width: `${minWidth ? minWidth : '100%'}`,
            '& .MuiSvgIcon-root': {
              color: 'black !important',
              height: `${height}`
            },
            '& .MuiIconButton-root': {
              color: 'black !important',
              height: `${height}`
            },
            '& .MuiOutlinedInput-root': {
              color: 'black !important',
              height: `${height}`
            }
          }}
        />
      )}
    />
  );
};

export default PickerTime;
