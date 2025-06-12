import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { IconSearchIcon } from 'assets/icons/icons';

const BaseInputSearches = ({
  isInvalid,
  isInvalidMsg,
  holder,
  onClick,
  placeholder,
  label,
  type,
  searches,
  searchesType,
  minLength,
  maxLength,
  styles,
  error,
  min,
  ...props
}) => {
  const Label = {};
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {holder}
        <TextField
          {...props}
          fullWidth
          type={type}
          error={error}
          size={props.size ? props.size : 'small'}
          placeholder={placeholder}
          label={label}
          sx={{
            fontWeight: 'bold',
            ...styles,
            background: '#2B2B2C',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '8px',
            '& .css-igs3ac': { border: '2px solid #F1F3F9!important' },
            '& .css-segi59': { color: '#F1F3F9!important' },
            '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              border: '2px solid #F1F3F9!important',
            },
            '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
              color: '#F1F3F9!important',
            },
            '& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root': {
              color: '#F1F3F9!important',
            },
            '& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root': {
              color: '#F1F3F9!important',
            },
          }}
          inputProps={{
            minLength: `${minLength}`,
            maxLength: `${maxLength}`,
            min: min,
            ...props.inputProps,
          }}
          InputProps={{
            min: min,
            minLength: `${minLength}`,
            maxLength: `${maxLength}`,
            endAdornment: searches && (
              <InputAdornment position="end">
                <IconButton onClick={onClick} edge="end">
                  {searchesType === 'searches' && <IconSearchIcon sx={{ color: '#F1F3F9' }} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {isInvalid && <Label error>{isInvalidMsg}</Label>}
      </div>
    </>
  );
};

export default BaseInputSearches;
