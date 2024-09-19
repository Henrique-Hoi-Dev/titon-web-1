import { Grid, Autocomplete, TextField } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const SelectWithInput = ({
  selectValue,
  setSelectValue,
  onChangeSelect,
  options,
  value,
  onChange,
  placeholder,
  type,
  dark,
  styles,
  xs,
  md,
  lg,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  return (
    <Grid
      container
      item
      xs={xs ? xs : isMobile ? 12 : 6}
      md={md ? md : 4}
      lg={lg ? lg : 2}
      direction={"row"}
      sx={{ flexWrap: "nowrap" }}
    >
      <Autocomplete
        required
        options={options}
        getOptionLabel={(option) => option?.label ?? ""}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disableClearable
        sx={{
          fontWeight: "bold",
          ...styles,
          color: `${dark ? "#FFFFFF" : "#2B2B2C"}`,
          background: `${dark ? "#2B2B2C" : "#FFFFFF"}`,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "8px",
          "& .css-igs3ac": {
            width: "110px !important",
            border: `2px solid ${
              dark ? "#FFFFFF!important" : "#2B2B2C!important"
            }`,
          },
          "& .css-segi59": {
            paddingRight: "60px !important",
          },
          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            width: "110px !important",
            border: `2px solid ${
              dark ? "#FFFFFF!important" : "#2B2B2C!important"
            }`,
          },
          "& .css-u9osun.Mui-focused": {
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },

          "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },
          "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
            width: "110px !important",
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },
          "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
            width: "110px !important",
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },
        }}
        defaultValue={selectValue}
        onChange={onChangeSelect}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField
        required
        label={placeholder}
        type={type}
        sx={{
          flex: 1,
          height: "1em",
          fontWeight: "bold",
          ...styles,
          color: `${dark ? "#FFFFFF" : "#2B2B2C"}`,
          background: `${dark ? "#2B2B2C" : "#FFFFFF"}`,
          borderRadius: "8px",
          "& .css-igs3ac": {
            border: `2px solid ${
              dark ? "#FFFFFF!important" : "#2B2B2C!important"
            }`,
          },
          "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            border: `2px solid ${
              dark ? "#FFFFFF!important" : "#2B2B2C!important"
            }`,
          },
          "& .css-u9osun.Mui-focused": {
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },

          "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },
          "& .css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },
          "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
            color: `${dark ? "#FFFFFF!important" : "#2B2B2C!important"}`,
          },
        }}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
};

export default SelectWithInput;
