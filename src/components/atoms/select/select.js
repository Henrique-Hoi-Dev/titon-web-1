import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import { Grid, TextField, Autocomplete } from '@mui/material'

const SelectComponent = ({
  filterValue,
  setFilterValue,
  options,
  placeholder,
  loading,
  required,
  disabled,
  sx,
}) => {
  return (
    <Grid>
      <Autocomplete
        id="tags-outlined"
        options={options}
        getOptionLabel={(option) => option?.name || ''}
        isOptionEqualToValue={(option) => option.value}
        defaultValue={filterValue}
        disabled={disabled}
        loading={loading}
        sx={{ sx }}
        onChange={(event, newValue) => {
          setFilterValue(newValue?.value)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            required={required}
            label={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <Loading size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Grid>
  )
}

export default SelectComponent
