import { Grid, Paper } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from 'services/requests/useLogin'
import { signInRequest } from 'store/modules/auth/actions'

import Button from 'components/atoms/BaseButton/BaseButton'
import Loading from 'components/atoms/loading/loading'
import Text from 'components/atoms/BaseText/BaseText'
import logo from '../../assets/logo.png'

import { Wrapper } from './styles'
import { InputDark } from 'components/atoms/input/inputDark/input'

const INITIAL_STATE = {
  username: null,
  password: null
}

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

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
    dispatch(signInRequest(email, password))
  }

  return (
    <Wrapper>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        height="100vh"
      >
        <Paper
          elevation={3}
          sx={{
            backgroundColor: 'transparent!important',
            boxShadow: 'none',
            height: '100%',
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
              width: '600px',
              height: '90%',
              background: '#2B2B2C',
              border: '1px solid #F1F3F9',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              borderRadius: '32px'
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
            <Text
              fontSize={'14px'}
              sx={{
                width: '360px',
                height: '32px',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: '100%',
                textAlign: 'center'
              }}
              color={'#FFFFFF'}
            >
              Agora insira as informações da sua empresa e já tenha acesso ao
              melhor gerenciador de frotda.
            </Text>

            <Grid
              container
              justifyContent="center"
              alignItems={'center'}
              direction="column"
              rowSpacing={3}
              p={4}
              minWidth="200px"
              maxWidth="400px"
              width="400px"
            >
              <Grid item>
                <InputDark
                  required
                  type="text"
                  label={'E-mail'}
                  styles={{ minWidth: '350px' }}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </Grid>
              <Grid item>
                <InputDark
                  required
                  label={'Senha'}
                  type={showPassword ? 'text' : 'password'}
                  styles={{ minWidth: '350px' }}
                  onChange={(ev) => setPassword(ev.target.value)}
                  isPassword
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Grid>
              {!showLoading && (
                <Grid item>
                  <Button
                    disableElevation
                    background={
                      'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                    }
                    sx={{
                      fontSize: '14px',
                      color: 'white',
                      width: '168px',
                      height: '50px'
                    }}
                    fullWidth
                    type="submit"
                  >
                    Login
                  </Button>
                </Grid>
              )}
              {showLoading && <Loading color={'white'} />}
              {showError && !showLoading && (
                <Text center sx={{ mt: '10px' }} type="warning">
                  Usuário e/ou senha incorretos
                </Text>
              )}
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Wrapper>
  )
}

export default Login
