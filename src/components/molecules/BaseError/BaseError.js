import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'

import BaseText from 'components/atoms/BaseText/BaseText'
import error404 from '../../../assets/error-404.png'

export default function BaseError() {
  const { t } = useTranslation()

  return (
    <Grid container item justifyContent="center" alignItems="center" pt={5}>
      <BaseText fontSize={'28px'} center color={'#939395'}>
        {t('messages.unknown_error')}
        <img
          src={error404}
          alt="img"
          width={'60px'}
          style={{
            verticalAlign: 'middle',
            marginLeft: '20px',
          }}
        />
      </BaseText>
    </Grid>
  )
}
