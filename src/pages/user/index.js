import React, { useEffect } from 'react';
import { useState } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRequest } from 'store/modules/user/userSlice';

import BaseModalAddUser from '../../components/molecules/BaseModalAddUser/BaseModalAddUser';
import Table from './table';
import initialStateQuery from '@/utils/initialStateQuery';

const User = () => {
  const dispatch = useDispatch();
  const { data: users, loading } = useSelector((state) => state.user);
  const [showModalDriver, setShowModalDriver] = useState(false);

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

      {showModalDriver && (
        <BaseModalAddUser
          setShowModal={setShowModalDriver}
          showModal={showModalDriver}
        />
      )}
    </Grid>
  );
};

export default User;
