import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import Text from 'components/atoms/BaseText/BaseText'

const BaseInput = ({
  isInvalid,
  isInvalidMsg,
  holder,
  password,
  showPassword,
  onClick,
  isPassword,
  placeholder,
  label,
  labelText,
  type,
  dark,
  searches,
  searchesType,
  minLength,
  maxLength,
  styles,
  error,
  min,
  ...props
}) => {
  const Label = {}
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text fontsize={'14px'} color={'#1877F2'}>
        {labelText}
      </Text>

      <TextField
        {...props}
        fullWidth
        variant="filled"
        type={type}
        error={error}
        placeholder={placeholder}
        label={label}
        color="primary"
        sx={{
          fontWeight: 'bold',
          ...styles,
          mt: '5px',
          color: '#FFFFFF',
          background: '#31363F',
          borderRadius: '8px 8px 0px 0px',
          '& .css-10botns-MuiInputBase-input-MuiFilledInput-input': {
            color: '#FFF!important',
            opacity: '0.5'
          },
          '& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root': {
            color: '#FFF!important',
            opacity: '0.5'
          },
          '& .css-o943dk-MuiFormLabel-root-MuiInputLabel-root': {
            color: '#FFF!important',
            opacity: '0.5'
          }
        }}
        inputProps={{
          minLength: `${minLength}`,
          maxLength: `${maxLength}`,
          min: min,
          ...props.inputProps
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
                  color: '#FFFFFF!important'
                }}
              >
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {isInvalid && <Label error>{isInvalidMsg}</Label>}
    </div>
  )
}

export default BaseInput
