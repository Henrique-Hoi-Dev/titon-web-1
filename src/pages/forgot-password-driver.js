import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'
import { forgotPasswordDriverRequest } from 'store/modules/driver/driverSlice'

import BaseInput from 'components/molecules/BaseInput/BaseInput'
import BaseButton from 'components/atoms/BaseButton/BaseButton'
import Loading from '@/components/atoms/BaseLoading/BaseLoading'
import { Container, Content, Logo } from './styles'

const ForgotPasswordDriver = () => {
  const [email, setEmail] = useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.driver)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(forgotPasswordDriverRequest({ email }))
  }

  return (
    <Container>
      <Content>
        <Logo src="/logo.png" alt="Logo" />
        <Typography variant="h4" component="h1" gutterBottom>
          {t('forgot_password.title')}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t('forgot_password.description')}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <BaseInput
                required
                label={t('forgot_password.placeholder.email')}
                labelText={t('forgot_password.label.email')}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <BaseButton
                type="submit"
                color="success"
                background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '100%',
                  height: '49px',
                }}
              >
                {t('button.send')}
              </BaseButton>
            </Grid>
          </Grid>
        </form>
      </Content>
      {loading && <Loading />}
    </Container>
  )
}

export default ForgotPasswordDriver
