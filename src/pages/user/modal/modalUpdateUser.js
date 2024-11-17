import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { errorNotification, successNotification } from 'utils/notification';
import { useGet } from 'services/requests/useGet';
import { useUpdate } from 'services/requests/useUpdate';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from 'components/atoms/loading/loading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import { maskCPF } from 'utils/masks';

const ModalUpdateUser = ({ showModal, setShowModal, mutate, props }) => {
  const { t } = useTranslation();

  const users = useSelector((state) => state?.user);

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const typeUser = [
    { value: 'MASTER', name: 'Master' },
    { value: 'director', name: 'Diretor' },
    { value: 'manager', name: 'Gerente' },
    { value: 'collaborator', name: 'Colaborador' }
  ];

  const getTypeUser = () =>
    typeUser.find((item) => item.value === body?.type_position) ?? null;

  const { data: user, isValidating } = useGet(`user/${props.id}`, []);

  const {
    data: userUpdate,
    error: errorUserUpadate,
    isFetching
  } = useUpdate(`user/${props.id}`, body, '', fetch, setFetch);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== body?.confirmPassword) {
      setPasswordError(true);
      return;
    }

    setFetch(true);
    setPasswordError(false);
  };

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      name: user?.dataResult?.name,
      email: user?.dataResult?.email,
      cpf: user?.dataResult?.cpf,
      type_position: user?.dataResult?.type_position
    }));
  }, [user]);

  useEffect(() => {
    if (userUpdate) {
      mutate();
      onClose();
    }

    if (userUpdate) {
      successNotification();
    }

    if (errorUserUpadate) {
      errorNotification(errorUserUpadate?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUpdate, errorUserUpadate]);

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
    >
      <ContentHeader>
        <Title>{t('modal_user.title')}</Title>
      </ContentHeader>

      {!isFetching && !isValidating && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_user.placeholder.name')}
              labelText={t('modal_user.label.name')}
              value={body?.name ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_user.placeholder.email')}
              labelText={t('modal_user.label.email')}
              value={body?.email ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  email: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={users?.data?.userProps?.type_role === 'MASTER' ? 6 : 12}
            lg={users?.data?.userProps?.type_role === 'MASTER' ? 6 : 12}
          >
            <BaseInput
              label={t('modal_user.placeholder.user_cpf')}
              labelText={t('modal_user.label.user_cpf')}
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.cpf ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cpf: maskCPF(ev.target.value)
                }))
              }
            />
          </Grid>

          {users?.data?.userProps?.type_role === 'MASTER' && (
            <Grid item xs={12} md={6} lg={6}>
              <BaseSelect
                labelText={t('modal_user.label.type_user')}
                placeholder={t('messages.select')}
                options={typeUser ?? []}
                getOptionLabel={(option) => option.name ?? ''}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                value={getTypeUser()}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setBody((state) => ({
                      ...state,
                      type_position: newValue.value
                    }));
                  }
                  if (newValue === null) {
                    setBody((state) => ({ ...state, type_position: '' }));
                  }
                }}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_user.placeholder.new_password')}
              labelText={t('modal_user.label.new_password')}
              type={showPassword ? 'text' : 'password'}
              onClick={() => setShowPassword(!showPassword)}
              isPassword
              error={passwordError}
              helperText={passwordError ? t('error.passwords_not_match') : ''}
              value={body?.password ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={t('modal_user.placeholder.confirm_password')}
              labelText={t('modal_user.label.confirm_password')}
              type={showConfirmPassword ? 'text' : 'password'}
              isPassword
              value={body?.confirmPassword ?? ''}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={(ev) => {
                setBody((state) => ({
                  ...state,
                  confirmPassword: ev.target.value
                }));
              }}
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={1}
            mt={0.3}
            justifyContent={'flex-end'}
          >
            <Grid item container xs={12} md={12} lg={3}>
              <Button
                onClick={() => onClose()}
                background={''}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF'
                }}
                variant="text"
              >
                {t('button.cancel')}
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="success"
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '139px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.update')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
      {isValidating && <Loading />}
    </Modal>
  );
};

export default ModalUpdateUser;
