import React, { useEffect, useState } from 'react';
import { Grid, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { signInRequest } from 'store/modules/auth/authSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Text from 'components/atoms/BaseText/BaseText';
import logo from '../assets/logo.png';
import bannerLogin from '../assets/background-login.png';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseLink from 'components/atoms/BaseLink/BaseLink';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const auth = useSelector(
    (state) => state?.auth || { loading: false, token: null }
  );
  const { token, loading } = auth;

  useEffect(() => {
    if (token) {
      navigate('/home', { replace: true });
    }
  }, [token, navigate]);

  const validateForm = (form) => {
    const newErrors = {};
    const email = form.get('email');
    const password = form.get('password');

    if (!email) {
      newErrors.email = t('validation.email_required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('validation.email_invalid');
    }

    if (!password) {
      newErrors.password = t('validation.password_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    if (validateForm(form)) {
      dispatch(
        signInRequest({
          email: form.get('email'),
          password: form.get('password')
        })
      );
    }
  };

  return (
    <Grid
      container
      item
      justifyContent="space-between"
      alignItems="center"
      flexWrap="nowrap"
    >
      <Grid container height="100vh" width="auto">
        <Paper
          elevation={3}
          sx={{
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
              alignItems="center"
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
                  name="email"
                  labelText={t('label.email')}
                  label={t('placeholder.login_email')}
                  styles={{ minWidth: '350px' }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item>
                <BaseInput
                  required
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  labelText={t('label.password')}
                  label={t('placeholder.login_password')}
                  styles={{ minWidth: '350px' }}
                  error={!!errors.password}
                  helperText={errors.password}
                  isPassword
                  onClick={() => setShowPassword(!showPassword)}
                />
              </Grid>

              <Grid item container justifyContent="flex-end">
                <BaseLink
                  label={t('label.forgot_password')}
                  to="/forgot-password"
                />
              </Grid>

              <Grid item>
                <Button
                  disableElevation
                  background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                  sx={{
                    fontSize: '14px',
                    color: 'white',
                    width: '168px',
                    height: '50px'
                  }}
                  fullWidth
                  type="submit"
                  disabled={loading}
                >
                  {loading ? t('button.loading') : t('field.login')}
                </Button>
              </Grid>
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
  );
};

export default Login;
