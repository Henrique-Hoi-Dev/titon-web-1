import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';

export default function InputAutocomplete(
  { 
    options, 
    getOptionLabel, 
    onChange,
    value
  }) {

  return (
    <label>
      <Autocomplete
        sx={{
          display: 'inline-block',
          '& input': {
            bgcolor: 'transparent',
            color: '#9c98a6',
          },
        }}
        id="custom-input-demo"
        options={options}
        getOptionLabel={getOptionLabel}
        onChange={onChange}
        value={value}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input type="text" {...params.inputProps} />
          </div>
        )}
      />
    </label>
  );
}
