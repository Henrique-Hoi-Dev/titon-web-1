import {
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { evaluateStrongPassword } from 'utils/passwordVerify';
import { useUpdateForgotPassword } from 'services/requests/useUpdateForgot';
import { errorNotification, successNotification } from 'utils/notification';

import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from 'components/atoms/loading/loading';
import Text from 'components/atoms/BaseText/BaseText';
import logo from '../assets/logo.png';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import jwt_decode from 'jwt-decode';

const ForgotPasswordDriver = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const decodedToken = jwt_decode(token);

  const [body, setBody] = useState({
    cpf: decodedToken?.cpf ? decodedToken.cpf : ''
  });

  const [data, setData] = useState({});

  const [fetch, setFetch] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const {
    data: newPassword,
    error: errorNewPassword,
    isFetching
  } = useUpdateForgotPassword(
    'driver/forgot-password',
    data,
    fetch,
    setFetch,
    token
  );

  useEffect(() => {
    setData((state) => ({
      ...state,
      cpf: body?.cpf?.replace(/\D/g, ''),
      password: body?.password,
      confirmPassword: confirmPassword
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body, confirmPassword]);

  useEffect(() => {
    if (newPassword) {
      successNotification(t('messages.success_msg'));
      navigate('/driver/forgot-password-success', { replace: true });
    }

    if (errorNewPassword) {
      if (errorNewPassword?.response?.data?.error) {
        errorNotification(errorNewPassword?.response?.data?.error);
      } else {
        errorNotification(errorNewPassword?.response?.data?.mgs);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPassword, errorNewPassword]);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    setFetch(true);
    setPasswordError(false);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 2,
      backgroundColor: evaluateStrongPassword(body.password).color
    }
  }));

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', height: '100vh' }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          justifyContent="center"
          alignItems={'center'}
          direction="column"
          p={4}
          gap={2}
        >
          <Text
            id="title"
            sx={{
              marginBottom: '14px!important'
            }}
          >
            <img src={logo} alt="img" width={300} height={50} />
          </Text>
          <Grid item>
            <BaseInput
              required
              type={showPassword ? 'text' : 'password'}
              labelText={t('label.new_password')}
              label={t('placeholder.login_password')}
              styles={{ minWidth: '300px' }}
              value={body?.password ?? ''}
              error={passwordError}
              helperText={passwordError ? t('error.passwords_not_match') : ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value
                }))
              }
              isPassword
              onClick={() => setShowPassword(!showPassword)}
            />

            <br />
            <BorderLinearProgress
              variant="determinate"
              value={evaluateStrongPassword(body.password).progress}
            />
            <br />
          </Grid>

          <Grid item>
            <BaseInput
              required
              isPassword
              type={showConfirmPassword ? 'text' : 'password'}
              labelText={t('field.confirm_password')}
              label={t('placeholder.create_password')}
              styles={{ minWidth: '300px' }}
              value={confirmPassword ?? ''}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </Grid>

          {!isFetching && (
            <Grid item>
              <Button
                disableElevation
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                onClick={(ev) => handleSubmit(ev)}
                sx={{
                  mt: '10px',
                  fontSize: '14px',
                  color: 'white',
                  width: '168px',
                  height: '50px'
                }}
                fullWidth
                type="submit"
              >
                {t('button.to_alter')}
              </Button>
            </Grid>
          )}
          {isFetching && <Loading color={'white'} />}
        </Grid>
      </Grid>
    </form>
  );
};

export default ForgotPasswordDriver;
