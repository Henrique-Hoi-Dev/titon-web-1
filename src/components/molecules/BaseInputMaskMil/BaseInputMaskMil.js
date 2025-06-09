import React from 'react'
import { InputAdornment, IconButton, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { NumericFormat } from 'react-number-format'
import Text from 'components/atoms/BaseText/BaseText'

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, name, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      thousandSeparator="."
      decimalSeparator=","
      allowNegative={false}
      valueIsNumericString
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.floatValue,
          },
        })
      }}
    />
  )
})

const BaseInputMaskMil = ({
  labelText,
  label,
  error,
  helperText,
  type = 'text',
  isPassword,
  onClick,
  styles,
  value,
  onChange,
  name,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {labelText && (
        <Text fontsize={'14px'} color={'#1877F2'}>
          {labelText}
        </Text>
      )}

      <TextField
        {...props}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        label={label} // <-- Isso faz o label animar corretamente
        variant="filled"
        fullWidth
        inputProps={{
          inputMode: 'numeric',
        }}
        InputProps={{
          inputComponent: NumberFormatCustom,
          endAdornment: isPassword && (
            <InputAdornment position="end">
              <IconButton onClick={onClick} edge="end" sx={{ color: '#fff', opacity: 0.5 }}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          fontWeight: 'bold',
          mt: '5px',
          background: '#31363F',
          borderRadius: '8px 8px 0px 0px',
          ...styles,
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
      />
    </div>
  )
}

export default BaseInputMaskMil
