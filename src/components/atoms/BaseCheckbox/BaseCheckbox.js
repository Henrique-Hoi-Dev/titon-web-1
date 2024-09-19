import React from 'react'
import { Checkbox, FormControlLabel, FormControl } from '@mui/material'

const BaseCheckbox = ({ label, checked, onChange, sx }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl component="fieldset" variant="standard">
        <FormControlLabel
          sx={{ transform: 'translateY(15px)', p: '2px 5px 0 5px' }}
          control={
            <Checkbox checked={checked} onChange={onChange} name={'checkbox'} />
          }
          label={label}
        />
      </FormControl>
    </div>
  )
}

export default BaseCheckbox
