import React from 'react'
import { Grid } from '@mui/material'

const BaseContentHeader = ({ children, mt, sx }) => {
  return (
    <Grid
      item
      container
      paddingLeft={3}
      mt={mt}
      justifyContent="center"
      alignItems="center"
      sx={{ ...sx }}
    >
      {children}
    </Grid>
  )
}

export default BaseContentHeader
