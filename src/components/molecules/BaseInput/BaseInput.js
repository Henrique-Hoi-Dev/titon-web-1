import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import BaseText from 'components/atoms/BaseText/BaseText'

const BaseInput = ({
  onClick,
  isPassword,
  placeholder,
  label,
  labelText,
  type,
  minLength,
  maxLength,
  styles,
  helperText,
  error,
  min,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BaseText fontsize={'14px'} color={'#1877F2'}>
        {labelText}
      </BaseText>

      <TextField
        {...props}
        fullWidth
        variant="filled"
        type={type}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        label={label}
        color="primary"
        sx={{
          fontWeight: 'bold',
          ...styles,
          mt: '5px',
          color: '#fff',
          background: '#31363F',
          borderRadius: '8px 8px 0px 0px',
          '& .MuiFilledInput-input': {
            color: '#fff',
            opacity: '0.5',
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
            opacity: '0.5',
          },
          '& .MuiFilledInput-underline:before': {
            borderBottomColor: '#1877F2',
          },
          '& .MuiFilledInput-underline:after': {
            borderBottomColor: '#1877F2',
          },
          '& .MuiFilledInput-underline:hover:after': {
            borderBottomColor: '#1877F2!important',
          },
          '& .MuiFilledInput-underline:hover:before': {
            borderBottomColor: '#1877F2!important',
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
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton
                onClick={onClick}
                edge="end"
                sx={{
                  color: '#fff',
                  opacity: '0.5',
                }}
              >
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default BaseInput
