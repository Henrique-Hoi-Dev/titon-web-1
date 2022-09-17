import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";
import Loading from "components/atoms/loading/loading";

const Autocomplete = ({
  placeholder,
  sx,
  options,
  getOptionLabel,
  disabled,
  onChange,
  required,
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
          sx={{ background: "white!important" }}
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
  );
};

export default Autocomplete;
