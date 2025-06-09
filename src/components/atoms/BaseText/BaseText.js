import { Typography } from '@mui/material'
import React from 'react'

const BaseText = ({
  children,
  center,
  sx,
  font_weight,
  fontsize = '18px',
  whiteSpace,
  maxWidth,
  color = '#FFFFFF',
}) => {
  return (
    <Typography
      variant="body1"
      align={center && 'center'}
      sx={{
        ...sx,
        maxWidth: `${maxWidth}`,
        fontSize: `${fontsize}`,
        whiteSpace: `${whiteSpace}`,
        color: `${color}`,
        fontWeight: `${font_weight}`,
      }}
    >
      {children}
    </Typography>
  )
}

export default BaseText
