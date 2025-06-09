import React from 'react'
import { PatternFormat } from 'react-number-format'
import { TextField } from '@mui/material'

const BaseInputMaskPlate = ({ labelText, value, onChange, name, label, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {labelText && (
        <span style={{ color: '#1877F2', fontSize: '14px', marginBottom: 4 }}>{labelText}</span>
      )}

      <PatternFormat
        format="AAA9A99"
        mask="_"
        value={value}
        allowEmptyFormatting
        customInput={TextField}
        fullWidth
        label={label}
        onValueChange={(values) => {
          onChange({
            target: {
              name,
              value: values.value.toUpperCase(),
            },
          })
        }}
        inputProps={{
          style: {
            color: '#fff',
            opacity: 0.8,
          },
        }}
        {...props} // aqui NÃO terá mais labelText
      />
    </div>
  )
}

export default BaseInputMaskPlate
