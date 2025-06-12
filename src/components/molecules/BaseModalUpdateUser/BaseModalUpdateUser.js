import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { getUserByIdRequest, updateUserRequest } from 'store/modules/user/userSlice';
import { maskCPF } from '@/utils/masks';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';

const BaseModalUpdateUser = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selected: user, loading, success } = useSelector((state) => state.user);

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

    dispatch(updateUserRequest({ id: data.id, data: body }));
    setPasswordError(false);
  };

  useEffect(() => {
    if (data.id) {
      dispatch(getUserByIdRequest(data.id));
    }
  }, [dispatch, data.id]);

  useEffect(() => {
    if (user) {
      setBody((state) => ({
        ...state,
        name: user?.name,
        email: user?.email,
        cpf: user?.cpf,
        type_position: user?.type_position,
      }));
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success, onClose]);

  return (
    <BaseModal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
    >
      <BaseContentHeader>
        <BaseTitle>Editar Usuário</BaseTitle>
      </BaseContentHeader>

      {!loading && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Name'}
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem',
                },
              }}
              value={body?.name ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Email'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem',
                },
              }}
              value={body?.email ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  email: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              label={t('placeholder.cpf_driver')}
              styles={{ minWidth: '250px' }}
              value={body?.cpf ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cpf: maskCPF(ev.target.value),
                }))
              }
            />
          </Grid>

          {user?.typeRole === 'MASTER' && (
            <Grid item xs={12} md={6} lg={6}>
              <BaseSelect
                placeholder={'Tipo usuário'}
                options={enums.typeUser ?? []}
                getOptionLabel={(option) => option.name ?? ''}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={enums.typeUser.find((option) => option.value === user?.type_position)}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setBody((state) => ({
                      ...state,
                      type_position: newValue.value,
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
              label={'Nova Senha'}
              type={showPassword ? 'text' : 'password'}
              onClick={() => setShowPassword(!showPassword)}
              isPassword
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem',
                },
              }}
              error={passwordError}
              helperText={passwordError ? 'Senhas não conferem' : ''}
              value={body?.password ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              label={'Confirmar Senha'}
              type={showConfirmPassword ? 'text' : 'password'}
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4em',
                },
              }}
              isPassword
              value={body?.confirmPassword ?? ''}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={(ev) => {
                setBody((state) => ({
                  ...state,
                  confirmPassword: ev.target.value,
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
              <BaseButton
                onClick={() => onClose()}
                background={''}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF',
                }}
                variant="text"
              >
                {t('button.cancel')}
              </BaseButton>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <BaseButton
                type="submit"
                color="success"
                background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '139px',
                  height: '49px',
                  marginRight: '15px',
                }}
              >
                {t('button.update')}
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalUpdateUser;
