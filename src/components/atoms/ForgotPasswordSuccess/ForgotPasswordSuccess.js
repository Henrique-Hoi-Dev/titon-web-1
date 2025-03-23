import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import Text from '../BaseText/BaseText';
import logo from '../../../assets/logo.png';
import Button from '../BaseButton/BaseButton';
import { useEffect } from 'react';

const ForgotPasswordSuccess = () => {
  const { t } = useTranslation();

  const handleReturnToApp = () => {
    window.location.href = 'seuapp://home';
  };

  useEffect(() => {
    // Redirecionar automaticamente após alguns segundos.
    const timer = setTimeout(handleReturnToApp, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Grid container height={'100vh'} justifyContent={'center'}>
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
        <div>
          <h2 style={{ color: '#07bc0c' }}>
            {t('messages.password_changed_successfully')}
          </h2>
          <p style={{ color: '#fff' }}>
            {t('messages.password_reset_success')}
          </p>
        </div>
        <Button
          disableElevation
          background={
            'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
          }
          onClick={(ev) => handleReturnToApp(ev)}
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
          {t('button.access')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordSuccess;
