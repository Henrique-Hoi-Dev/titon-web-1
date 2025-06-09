import { Grid } from '@mui/material'
import React from 'react'

const ContentMain = ({ children }) => {
  return (
    <Grid mt={1} justifyContent="center" alignItems="center">
      {children}
    </Grid>
  )
}

export default ContentMain
