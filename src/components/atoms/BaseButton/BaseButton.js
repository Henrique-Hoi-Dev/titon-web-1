import React from 'react'

import { Button as ButtonComponent, CircularProgress } from '@mui/material'

const BaseButton = ({
  disabled,
  children,
  color,
  loading,
  variant,
  background,
  sx,
  fontsize,
  ...props
}) => {
  return (
    <>
      {!loading && (
        <ButtonComponent
          disabled={disabled}
          disableElevation
          variant={variant ? variant : 'default'}
          color={color}
          sx={{
            ...sx,
            paddingTop: '8px',
            lineHeight: '0px',
            fontSize: `${fontsize ? fontsize : '14px'}`,
            background: `${background}`,
          }}
          {...props}
        >
          {children}
        </ButtonComponent>
      )}
      {loading && (
        <ButtonComponent
          disabled={disabled}
          disableElevation
          variant={variant ? variant : 'default'}
          color={color}
          sx={{
            ...sx,
            paddingTop: '8px',
            lineHeight: '0px',
            fontSize: `${fontsize ? fontsize : '14px'}`,
            background: `${background}`,
          }}
          {...props}
        >
          <CircularProgress
            sx={{
              color: `${color ? color : '#F1F3F9'}`,
              width: '25px!important',
              height: '25px!important',
            }}
          />
        </ButtonComponent>
      )}
    </>
  )
}

export default BaseButton
