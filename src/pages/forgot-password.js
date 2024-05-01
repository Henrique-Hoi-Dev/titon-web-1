import { Grid, Paper } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'services/requests/useLogin'
import { signInRequest } from 'store/modules/auth/actions'
import { useTranslation } from 'react-i18next'

import Button from 'components/atoms/BaseButton/BaseButton'
import Loading from 'components/atoms/loading/loading'
import Text from 'components/atoms/BaseText/BaseText'
import logo from '../assets/logo.png'
import bannerLogin from '../assets/background-login.png'
import BaseInput from 'components/molecules/BaseInput/BaseInput'
import BaseLink from 'components/atoms/BaseLink/BaseLink'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const INITIAL_STATE = {
  username: null,
  password: null
}

const ForgotPassword = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState(null)

  const [userData, setUserData] = useState(INITIAL_STATE)

  const { error } = useLogin(userData)

  const auth = useSelector((state) => state.auth)

  const token = auth?.token
  const loading = auth?.loading

  const showLoading = loading
  const showError = error

  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true })
    }
  }, [auth, token, navigate])

  useEffect(() => {
    error && setUserData(INITIAL_STATE)
  }, [error])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(signInRequest(email))
  }

  return (
    <Grid
      container
      item
      justifyContent="space-between"
      alignItems="center"
      flexWrap={'nowrap'}
    >
      <Grid container height="100vh" width={'auto'}>
        <Grid container m={4} color="#fff" alignItems={'center'} gap={1}>
          <ArrowBackIcon />
          <BaseLink label={t('label.to_go_back')} color="#fff" to={'/login'} />
        </Grid>
        <Paper
          elevation={3}
          sx={{
            boxShadow: 'none',
            height: '90%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              width: '700px',
              height: '100%',
              background: '#2B2B2C',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <Text
              id="title"
              sx={{
                marginBottom: '14px!important'
              }}
            >
              <img src={logo} alt="img" />
            </Text>

            <Grid
              container
              justifyContent="center"
              alignItems={'center'}
              direction="column"
              rowSpacing={3}
              p={4}
              gap={2}
              minWidth="200px"
              maxWidth="400px"
              width="400px"
            >
              <Grid item>
                <BaseInput
                  required
                  type="text"
                  labelText={t('label.email')}
                  label={t('placeholder.login_email')}
                  styles={{ minWidth: '350px' }}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </Grid>

              {!showLoading && (
                <Grid item>
                  <Button
                    disableElevation
                    background={
                      'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                    }
                    disabled
                    sx={{
                      fontSize: '14px',
                      color: 'white',
                      width: '168px',
                      height: '50px'
                    }}
                    fullWidth
                    type="submit"
                  >
                    {t('field.send')}
                  </Button>
                </Grid>
              )}
              {showLoading && <Loading color={'white'} />}
              {showError && !showLoading && (
                <Text center sx={{ mt: '10px' }} type="warning">
                  {t('error.login_error')}
                </Text>
              )}
            </Grid>
          </Box>
        </Paper>
      </Grid>

      <Grid
        item
        container
        height="100vh"
        sx={{
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }}
      >
        <img
          src={bannerLogin}
          alt="img"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Grid>
    </Grid>
  )
}

export default ForgotPassword
