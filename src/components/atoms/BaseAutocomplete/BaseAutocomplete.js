import { Autocomplete as MuiAutocomplete, TextField } from '@mui/material'
import Loading from 'components/atoms/loading/loading'

const BaseAutocomplete = ({
  placeholder,
  sx,
  options,
  getOptionLabel,
  disabled,
  onChange,
  required,
  dark,
  loading,
  ...props
}) => {
  return (
    <MuiAutocomplete
      sx={sx}
      disabled={disabled}
      options={options}
      getOptionLabel={getOptionLabel}
      onChange={onChange}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            background: 'white!important',
            '& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
              color: 'black!important'
            },
            '& .css-igs3ac': {
              border: `2px solid ${
                dark ? '#FFFFFF!important' : '#2B2B2C!important'
              }`
            },
            '& .css-p0rm37': {
              top: '-6px'
            },
            ' .css-u9osun.Mui-focused': {
              color: 'black!important'
            },
            '& .css-segi59.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: `2px solid ${
                dark ? '#FFFFFF!important' : '#2B2B2C!important'
              }`,
              color: 'black!important'
            },
            '& .css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
              border: `2px solid ${
                dark ? '#FFFFFF!important' : '#2B2B2C!important'
              }`
            },
            '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
              marginTop: '-5px!important'
            }
          }}
          required={required}
          label={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <Loading size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  )
}

export default BaseAutocomplete
