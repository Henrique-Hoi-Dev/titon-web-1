import React from 'react';
import { TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/lab';

const BasePickerDateTime = ({ minWidth, value, onChange, size, label, ...props }) => {
  return (
    <MobileDateTimePicker
      {...props}
      label={label}
      value={value}
      onChange={onChange}
      ampm={false}
      ampmInClock={false}
      inputFormat="yyyy-MM-dd HH:mm"
      renderInput={(props) => (
        <TextField
          size={`${size === 'medium' ? 'medium' : 'small'}`}
          {...props}
          sx={{
            width: `${minWidth ? minWidth : '100%'}`,
            '& .MuiSvgIcon-root': {
              color: 'black !important',
            },
            '& .MuiIconButton-root': {
              color: 'black !important',
            },
            '& .MuiOutlinedInput-root': {
              color: 'black !important',
            },
          }}
        />
      )}
    />
  );
};

export default BasePickerDateTime;
