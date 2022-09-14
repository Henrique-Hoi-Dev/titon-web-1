import { useEffect, useState } from "react";
import { Grid, Autocomplete, TextField } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const SelectWithInput = ({
  selectValue,
  setSelectValue,
  options,
  inputValue,
  setInputValue,
  placeholder,
  type,
  xs,
  md,
  lg
}) => {
  const isMobile = useMediaQuery({ maxWidth: 500});

  return (
    <Grid container item xs={xs ? xs : isMobile ? 12 : 6} md={md ? md : 4} lg={ lg ? lg : 2} direction={"row"} sx={{ flexWrap: "nowrap" }} >
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option?.label ?? ""}
        isOptionEqualToValue={(option, value) => option.value === value}
        disableClearable
        sx={{
          minHeight: 55,
          "& .MuiInputBase-root.MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRightWidth: "none"
          },
        }}
        defaultValue={selectValue}
        onChange={(ev, newValue) => setSelectValue(newValue.value)}
        renderInput={(params) => <TextField {...params} />}
      />
      <TextField
        label={placeholder}
        type={type}
        sx={{
          flex: 1,
          height: "2.4rem",
          "& .MuiInputBase-root.MuiOutlinedInput-root": {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          },
        }}
        value={inputValue}
        onChange={(ev) => setInputValue(ev.target.value)}
      />
    </Grid>
  );
};

export default SelectWithInput;