import React, { useRef } from 'react'
import { Fab, Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'

const BaseImagePreview = (props) => {
  const { t } = useTranslation()
  const fileInputRef = useRef()

  const handleClick = (event) => {
    event.preventDefault()

    fileInputRef.current.click()
  }

  const setMedia = (e) => {
    const selectedFile = e.target.files[0]

    const reader = new FileReader()

    reader.onloadend = () => {
      props.setPreviewMedia(reader.result)
    }

    reader.readAsDataURL(selectedFile)
  }

  const removeMedia = () => {
    props.setPreviewMedia(null)
  }

  return (
    <>
      {props.preview ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            style={{
              maxHeight: 182,
              maxWidth: 392,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              src={props.preview}
              alt="Uploaded img"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Button disableElevation size="medium" variant="outlined" onClick={removeMedia}>
              {t('field.remove')}
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            margin: '15px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '23rem',
            height: '10rem',
            border: '0.5px dashed #cccccc',
          }}
        >
          <input
            onChange={(e) => setMedia(e)}
            accept={'image'}
            ref={fileInputRef}
            style={{ display: 'none' }}
            id="icon-button-file"
            type="file"
          />

          <label htmlFor="icon-button-file">
            <Fab
              elevation="disable"
              onClick={handleClick}
              sx={{
                width: '56px',
                height: '56px',
                marginTop: '16px',
                marginBottom: '32px',
                color: '#FFF',
                backgroundColor: '#009C6D',
                transform: 'translatey(-10px)',
                '&:hover': {
                  backgroundColor: '#009C6D',
                  opacity: 0.8,
                },
              }}
              color="secondary"
              aria-label="upload multimedia"
              component="span"
            >
              <AddIcon sx={{ fontSize: 55 }} />
            </Fab>
          </label>

          <Typography> {t('messages.add_logo')}</Typography>
        </Box>
      )}
    </>
  )
}

export default BaseImagePreview
