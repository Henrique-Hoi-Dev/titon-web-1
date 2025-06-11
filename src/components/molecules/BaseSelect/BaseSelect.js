import { Autocomplete as MuiAutocomplete, Popper, TextField } from '@mui/material'
import { autocompleteClasses } from '@mui/material/Autocomplete'
import { styled } from '@mui/material/styles'
import { ArrowDownIcon } from '../../../assets/icons/icons'

import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseText from 'components/atoms/BaseText/BaseText'

const StyledPopper = styled(Popper)(() => ({
  [`& .${autocompleteClasses.paper}`]: {
    backgroundColor: '#31363F',
    color: '#fff!important',
  },
  [`& .${autocompleteClasses.listbox}`]: {
    color: '#fff',
  },
  [`& .${autocompleteClasses.noOptions}`]: {
    color: '#fff',
    textAlign: 'center',
  },
}))

const BaseSelect = ({
  placeholder,
  sx,
  options,
  getOptionLabel,
  disabled,
  onChange,
  required,
  labelText,
  loading,
  isOptionEqualToValue,
  ...props
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <BaseText fontsize={'14px'} color={'#1877F2'}>
        {labelText}
      </BaseText>
      <MuiAutocomplete
        sx={{
          ...sx,
          mt: '5px',
        }}
        size="medium"
        popupIcon={<ArrowDownIcon />}
        PopperComponent={StyledPopper}
        disabled={disabled}
        options={options}
        getOptionLabel={getOptionLabel}
        onChange={onChange}
        isOptionEqualToValue={isOptionEqualToValue || ((option, value) => option?.id === value?.id)}
        {...props}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="filled"
            sx={{
              color: '#fff',
              opacity: '0.5',
              background: '#31363F',
              borderRadius: '8px 8px 0px 0px',
              '& .MuiFilledInput-input': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
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
              '& .MuiSvgIcon-root': {
                color: '#1877F2',
              },
            }}
            required={required}
            label={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <BaseLoading size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  )
}

export default BaseSelect
