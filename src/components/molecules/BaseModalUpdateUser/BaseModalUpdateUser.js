import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  getUserByIdRequest,
  updateUserRequest
} from 'store/modules/user/userSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';

const BaseModalUpdateUser = ({ showModal, setShowModal, props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    selected: user,
    loading,
    success
  } = useSelector((state) => state.user);

  const [body, setBody] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
    setPasswordError(false);
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== body?.confirmPassword) {
      setPasswordError(true);
      return;
    }

    dispatch(updateUserRequest({ id: props.id, data: body }));
    setPasswordError(false);
  };

  useEffect(() => {
    if (props.id) {
      dispatch(getUserByIdRequest(props.id));
    }
  }, [dispatch, props.id]);

  useEffect(() => {
    if (user) {
      setBody((state) => ({
        ...state,
        name: user?.dataResult?.name,
        email: user?.dataResult?.email,
        cpf: user?.dataResult?.cpf,
        type_position: user?.dataResult?.type_position
      }));
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

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
        <Title>{t('modal_user.title_edit')}</Title>
      </ContentHeader>

      {!loading && (
        <Grid container item spacing={2}>
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={1.5}
            flexWrap={'wrap'}
          >
            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_user.placeholder.name')}
                labelText={t('modal_user.label.name')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.name ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    name: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_user.placeholder.email')}
                labelText={t('modal_user.label.email')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.email ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    email: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal_user.placeholder.cpf')}
                labelText={t('modal_user.label.cpf')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.cpf ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cpf: ev.target.value
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                label={t('modal_user.placeholder.password')}
                labelText={t('modal_user.label.password')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                type={showPassword ? 'text' : 'password'}
                value={body?.password ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    password: ev.target.value
                  }))
                }
                error={passwordError}
                helperText={passwordError ? t('modal_user.error.password') : ''}
                endAdornment={
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                label={t('modal_user.placeholder.confirm_password')}
                labelText={t('modal_user.label.confirm_password')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                type={showConfirmPassword ? 'text' : 'password'}
                value={body?.confirmPassword ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    confirmPassword: ev.target.value
                  }))
                }
                error={passwordError}
                helperText={passwordError ? t('modal_user.error.password') : ''}
                endAdornment={
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseSelect
                required
                label={t('modal_user.placeholder.type')}
                labelText={t('modal_user.label.type')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem'
                  }
                }}
                value={body?.type_position ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    type_position: ev.target.value
                  }))
                }
                options={enums.typeUser}
              />
            </Grid>
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

      {loading && <Loading />}
    </Modal>
  );
};

export default BaseModalUpdateUser;
