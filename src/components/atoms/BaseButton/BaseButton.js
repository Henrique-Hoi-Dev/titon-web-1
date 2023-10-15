import React from 'react'
import { CircularProgress } from '@mui/material'
import { Button as ButtonComponent } from '@mui/material'

const BaseButton = ({
  disabled,
  children,
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
          sx={{
            ...sx,
            // position: "relative",
            paddingTop: '8px',
            lineHeight: '0px',
            fontSize: `${fontsize ? fontsize : '14px'}`,
            background: `${background}`
          }}
          {...props}
        >
          {children}
        </ButtonComponent>
      )}
      {loading && (
        <ButtonComponent
          disableElevation
          variant={variant ? variant : 'default'}
          sx={{
            background: '#fff',
            position: 'relative',
            fontSize: '14px'
          }}
          fullWidth
          {...props}
        >
          <CircularProgress
            size={24}
            sx={{
              background: '#fff',
              color: 'text.disabled',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px'
            }}
          />
        </ButtonComponent>
      )}
    </>
  )
}

export default BaseButton
