import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import { signInRequest } from 'store/modules/auth/authSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseInput from 'components/molecules/BaseInput/BaseInput';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const { loading, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      navigate('/forgot-password-success', { replace: true });
    }
  }, [success, navigate]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(signInRequest({ email }));
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', background: '#1A1A1A' }}
    >
      <Grid
        container
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          background: '#3A3A3A',
          borderRadius: '8px',
          padding: '32px'
        }}
      >
        <Grid item xs={12}>
          <h1 style={{ color: '#FFF', textAlign: 'center' }}>
            {t('forgot_password.title')}
          </h1>
        </Grid>

        {!loading && (
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <BaseInput
                required
                label={t('forgot_password.placeholder.email')}
                labelText={t('forgot_password.label.email')}
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                error={!!error}
                helperText={
                  error ? t('forgot_password.error.invalid_email') : ''
                }
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                onClick={handleSubmit}
                color="success"
                background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '100%',
                  height: '49px'
                }}
              >
                {t('button.send')}
              </Button>
            </Grid>
          </Grid>
        )}

        {loading && <Loading />}
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
