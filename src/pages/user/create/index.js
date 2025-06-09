import { Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'

import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseBreadcrumb from '@/components/atoms/BaseBreadcrumb/BaseBreadcrumb'

const CreateUser = () => {
  const { t } = useTranslation()

  return (
    <Grid
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid item xs={12}>
        <BaseBreadcrumb
          links={[
            { label: 'Home', path: '/' },
            { label: 'Usuários', path: '/user' },
            { label: 'Criar Usuário' },
          ]}
        />
        <BaseContentHeader>
          <BaseTitle>{t('title.createUser')}</BaseTitle>
        </BaseContentHeader>
      </Grid>
    </Grid>
  )
}

export default CreateUser
