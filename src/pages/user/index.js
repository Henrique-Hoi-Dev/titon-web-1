import React, { useEffect } from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from 'store/modules/user/userSlice';
import { IconAdd } from '@/assets/icons/icons';
import { useTranslation } from 'react-i18next';

import BaseModalAddUser from '../../components/molecules/BaseModalAddUser/BaseModalAddUser';
import Table from './table';
import initialStateQuery from '@/utils/initialStateQuery';
import BaseContentHeader from '@/components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from '@/components/atoms/BaseTitle/BaseTitle';
import BaseButton from '@/components/atoms/BaseButton/BaseButton';
import BaseInputSearches from '@/components/atoms/BaseInputSearches/BaseInputSearches';

const User = () => {
  const dispatch = useDispatch();
  const { data: users, loading } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const [showModalUser, setShowModalUser] = useState(false);
  const [
    //search,
    setSearch
  ] = useState('');

  const [userQuery, setUserQuery] = useState(
    initialStateQuery.INITIAL_STATE_USER
  );

  useEffect(() => {
    dispatch(getUsersRequest(userQuery));
  }, [dispatch, userQuery]);

  return (
    <Grid
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
        xs={12}
        md={12}
        lg={12}
        flexWrap="nowrap"
        justifyContent="flex-end"
      >
        <Grid item container pl={2} mr={4} justifyContent={'flex-end'}>
          <BaseButton
            onClick={() => setShowModalUser(true)}
            background="linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
            sx={{
              fontSize: '14px',
              color: 'white',
              minWidth: '248px',
              marginRight: '15px'
            }}
          >
            {t('button.add_new_user')}
            <IconAdd sx={{ mb: '4px', ml: '10px' }} />
          </BaseButton>

          <BaseInputSearches
            searches
            searchesType="searches"
            styles={{ minWidth: '350px' }}
            placeholder={t('placeholder.name_driver')}
            onChange={(ev) => setSearch(ev.target.value)}
          />
        </Grid>
      </Grid>

      <BaseContentHeader>
        <BaseTitle>{t('title.user')}</BaseTitle>
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
            data={users}
            query={userQuery}
            setQuery={setUserQuery}
            loading={loading}
          />
        </Grid>
      </Grid>

      {showModalUser && (
        <BaseModalAddUser
          setShowModal={setShowModalUser}
          showModal={showModalUser}
        />
      )}
    </Grid>
  );
};

export default User;
