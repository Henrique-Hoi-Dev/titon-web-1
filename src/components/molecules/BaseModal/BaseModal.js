import { Grid, Modal as MuiModal } from '@mui/material'
import Button from 'components/atoms/BaseButton/BaseButton'
import { IconClose } from 'assets/icons/icons'
import Text from 'components/atoms/BaseText/BaseText'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

const BaseModal = ({
  title,
  sx,
  open,
  onClose,
  showReturn,
  children,
  component,
  onSubmit,
  showCloseIcon = true,
  height,
  maxWidth,
  maxHeight,
  minheight,
  sxGridModal
}) => {
  const { t } = useTranslation()

  const isDesktop = useMediaQuery({ maxWidth: '1400px' })
  const isSmallDesktop = useMediaQuery({ maxWidth: '910px' })
  const isTable = useMediaQuery({ maxWidth: '610px' })
  const isMobile = useMediaQuery({ maxWidth: '430px' })

  return (
    <MuiModal open={open} onClose={onClose} onBackdropClick={onClose}>
      <Grid
        item
        container
        sx={{
          ...sx,
          m: '0 10px 0 10px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#2B2B2C',
          height: `${height ? height : 'auto'}`,
          minHeight: minheight,
          maxWidth: `${
            (isMobile ? '370px' : maxWidth ?? '1100px') ||
            (isTable ? '470px' : maxWidth ?? '1100px') ||
            (isSmallDesktop ? '700px' : maxWidth ?? '1100px') ||
            (isDesktop ? '1000px' : maxWidth ?? '1100px')
          }`,
          maxHeight: `${isDesktop ? '650px' : maxHeight ?? '600px'}`,
          padding: '10px',
          borderRadius: '20px'
        }}
        direction="column"
        component={component}
        onSubmit={onSubmit}
      >
        <Grid
          item
          container
          justifyContent="center"
          direction="row"
          spacing={1}
          p={1}
          sx={{ ...sxGridModal, overflowY: 'auto' }}
        >
          {showCloseIcon && (
            <Grid
              item
              sx={{
                display: `${isMobile ? 'none' : ''}`,
                position: 'absolute',
                top: `${isMobile ? '3px' : '5px'}`,
                right: `${isMobile ? 0 : '5px'}`
              }}
            >
              <Button
                sx={{
                  height: '40px',
                  width: '20px',
                  backgroundColor: 'transparent',
                  ':hover': {
                    backgroundColor: 'transparent'
                  }
                }}
                onClick={onClose}
              >
                <IconClose sx={{ height: '32px' }} />
              </Button>
            </Grid>
          )}
          <Grid item container>
            <Text>{title}</Text>
          </Grid>
          <Grid item container spacing={2} justifyContent="center">
            {children}
          </Grid>
        </Grid>
        {showReturn && (
          <Grid item p={1}>
            {showReturn && (
              <Button onClick={onClose}>{t('button.return')}</Button>
            )}
          </Grid>
        )}
      </Grid>
    </MuiModal>
  )
}

export default BaseModal
