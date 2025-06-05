import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { IconAdd } from 'assets/icons/icons';
import { useTranslation } from 'react-i18next';

import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseButton from 'components/atoms/BaseButton/BaseButton';

const Freight = () => {
  const [, setShowModalCheck] = useState();
  const [, setCheckQuery] = useState();
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckQuery((state) => ({
        ...state,
        search: search
      }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Grid
      item
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid
        item
        container
        pl={2}
        pb={7}
        mr={4}
        mt={-6.5}
        justifyContent={'flex-end'}
      >
        <BaseButton
          onClick={() => setShowModalCheck(true)}
          background={
            'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
          }
          fontsize={'12px'}
          sx={{
            color: 'white',
            width: '248px',
            height: '40px',
            marginRight: '15px'
          }}
        >
          {t('check.button.title')} <IconAdd sx={{ mt: -0.7 }} />
        </BaseButton>
        <BaseInputSearches
          searches
          searchesType={'searches'}
          styles={{ minWidth: '350px' }}
          placeholder={'Modelo'}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('check.title')}</BaseTitle>
      </BaseContentHeader>
    </Grid>
  );
};

export default Freight;
