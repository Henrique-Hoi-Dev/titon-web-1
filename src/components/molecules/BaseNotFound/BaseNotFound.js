import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

import BaseText from 'components/atoms/BaseText/BaseText';
import imgNotFound from '../../../assets/NotFound.png';

const BaseNotFound = () => {
  const { t } = useTranslation();

  return (
    <Grid container item justifyContent="center" alignItems="center" p={5}>
      <BaseText fontSize={'28px'} center color={'#939395'}>
        {t('messages.result_not_found')}...{' '}
        <img
          src={imgNotFound}
          alt="img"
          width={'60px'}
          style={{
            verticalAlign: 'middle',
            marginLeft: '20px'
          }}
        />
      </BaseText>
    </Grid>
  );
};

export default BaseNotFound;
