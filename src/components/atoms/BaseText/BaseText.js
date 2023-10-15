import { Typography } from '@mui/material'
import React from 'react'

const BaseText = ({
  children,
  center,
  sx,
  font_weight,
  fontsize,
  whiteSpace,
  color
}) => {
  return (
    <Typography
      variant="p"
      align={center && 'center'}
      sx={{
        ...sx,
        fontSize: `${fontsize ? fontsize : '18px'}`,
        whiteSpace: `${whiteSpace}`,
        color: `${color}`,
        fontWeight: `${font_weight}`
      }}
    >
      {children}
    </Typography>
  )
}

export default BaseText
