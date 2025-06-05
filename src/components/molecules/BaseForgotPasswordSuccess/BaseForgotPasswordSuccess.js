import { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/logo.png';
import BaseText from '../../atoms/BaseText/BaseText';
import BaseButton from '../../atoms/BaseButton/BaseButton';

const BaseForgotPasswordSuccess = () => {
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
        <BaseText
          id="title"
          sx={{
            marginBottom: '14px!important'
          }}
        >
          <img src={logo} alt="img" width={300} height={50} />
        </BaseText>
        <div>
          <h2 style={{ color: '#07bc0c' }}>
            {t('messages.password_changed_successfully')}
          </h2>
          <p style={{ color: '#fff' }}>
            {t('messages.password_reset_success')}
          </p>
        </div>
        <BaseButton
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
        </BaseButton>
      </Grid>
    </Grid>
  );
};

export default BaseForgotPasswordSuccess;
