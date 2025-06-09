import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import logo from '../../../assets/logo.png';
import jwt_decode from 'jwt-decode';
import BseText from '../BaseText/BaseText';

const BaseTokenProtectedRoute = ({ children }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Se não houver token na URL, exibe erro
  if (!token) {
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
          <BseText
            id="title"
            sx={{
              marginBottom: '14px!important'
            }}
          >
            <img src={logo} alt="img" width={300} height={50} />
          </BseText>
          <div style={{ color: '#fff', fontSize: 20 }}>
            {t('error.expired_error_token')}
          </div>
        </Grid>
      </Grid>
    );
  }

  // Se for um JWT, podemos decodificar e checar a expiração
  try {
    const decodedToken = jwt_decode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
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
            <BseText
              id="title"
              sx={{
                marginBottom: '14px!important'
              }}
            >
              <img src={logo} alt="img" width={300} height={50} />
            </BseText>
            <div style={{ color: '#fff', fontSize: 20 }}>
              {t('error.expired_token')}
            </div>
          </Grid>
        </Grid>
      );
    }
  } catch (error) {
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
          <BseText
            id="title"
            sx={{
              marginBottom: '14px!important'
            }}
          >
            <img src={logo} alt="img" width={300} height={50} />
          </BseText>
          <div style={{ color: '#fff', fontSize: 20 }}>{t('error.token')}</div>
        </Grid>
      </Grid>
    );
  }

  return children;
};

export default BaseTokenProtectedRoute;
