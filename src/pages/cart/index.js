import React, { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { IconAdd } from 'assets/icons/icons';
import { InputSearches } from 'components/atoms/input/inputSearches/input';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getCartsRequest } from 'store/modules/cart/cartSlice';

import Table from './table';
import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseModalAddCart from 'components/molecules/BaseModalAddCart/BaseModalAddCart';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';

const Cart = () => {
  const [showModalDriver, setShowModalDriver] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { data: carts, loading, error } = useSelector((state) => state.cart);

  const INITIAL_STATE_CARD = {
    limit: 10,
    page: 1,
    sort_field: 'cart_models',
    sort_order: 'ASC'
  };

  const [cardQuery, setCardQuery] = useState(INITIAL_STATE_CARD);
  const [search, setSearch] = useState('');

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      dispatch(getCartsRequest(cardQuery));
      return;
    }

    const timer = setTimeout(() => {
      const newQuery = {
        ...cardQuery,
        search: search
      };
      setCardQuery(newQuery);
      dispatch(getCartsRequest(newQuery));
    }, 1200);

    return () => clearTimeout(timer);
  }, [dispatch, search, cardQuery]);

  return (
    <Grid
      container
      padding={1}
      spacing={2}
      minHeight="88vh"
      justifyContent="center"
      alignContent={'flex-start'}
    >
      <Grid item container pl={2} mr={4} justifyContent={'flex-end'}>
        <BaseButton
          onClick={() => setShowModalDriver(true)}
          background={
            'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
          }
          sx={{
            fontSize: '14px',
            color: 'white',
            minWidth: '248px',
            marginRight: '15px'
          }}
        >
          {t('button.add_new_cart')} <IconAdd sx={{ mb: '4px', ml: '10px' }} />
        </BaseButton>
        <InputSearches
          searches
          searchesType={'searches'}
          styles={{ minWidth: '350px' }}
          placeholder={t('placeholder.search_cart')}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('cart.title')}</BaseTitle>
      </BaseContentHeader>

      <Grid
        item
        container
        mb={5}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid
          item
          container
          pl={2}
          mr={4}
          mt={5}
          mb={3}
          justifyContent={'center'}
        >
          <Table
            data={carts}
            query={cardQuery}
            setQuery={setCardQuery}
            error={error}
            loading={loading}
          />
        </Grid>
      </Grid>

      <BaseModalAddCart
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
      />
    </Grid>
  );
};

export default Cart;
