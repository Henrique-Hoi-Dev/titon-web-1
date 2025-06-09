import React from 'react'
import { Grid } from '@mui/material'

import logo from '../../../assets/logo.png'

import BaseNotificationsPopover from '@/components/atoms/BaseNotificationsPopover/BaseNotificationsPopover'

const HeaderBar = () => {
  return (
    <>
      <Grid
        item
        container
        xs={12}
        md={12}
        pl={4}
        sx={{
          position: 'fixed',
          background: '#1C1C1C',
          width: '100%',
          height: '64px',
          zIndex: 10,
        }}
        alignItems="center"
        justifyContent={'flex-end'}
      >
        <Grid item container flexWrap="nowrap" alignItems="center" justifyContent={'flex-start'}>
          <img
            width={'200px'}
            height={'30px'}
            src={logo}
            alt="img"
            style={{ marginRight: '40px' }}
          />

          <BaseNotificationsPopover />
        </Grid>
      </Grid>
    </>
  )
}

export default HeaderBar
