import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { createUserRequest, getUsersRequest, resetUserCreate } from 'store/modules/user/userSlice';

import BaseButton from '@/components/atoms/BaseButton/BaseButton';
import BaseModal from '@/components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from '@/components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from '@/components/atoms/BaseTitle/BaseTitle';
import BaseInput from '@/components/molecules/BaseInput/BaseInput';
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect';
import enums from '@/utils/enums';
import { maskCPF, maskPhone } from '@/utils/masks';

const BaseModalAddUser = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loadingCreate, successCreate } = useSelector((state) => state.user);

  const [body, setBody] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
    setPasswordError(false);
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    dispatch(createUserRequest(body));

    setPasswordError(false);
    setConfirmPassword('');
  };

  useEffect(() => {
    if (successCreate) {
      onClose();
      dispatch(getUsersRequest({}));
      dispatch(resetUserCreate());
    }
  }, [successCreate, onClose, dispatch]);

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
        <BaseTitle>{t('modal.add_user.title')}</BaseTitle>
      </BaseContentHeader>

      {!loadingCreate && (
        <Grid container item spacing={2}>
          <Grid container item xs={12} md={12} lg={12} spacing={1.5} flexWrap={'wrap'}>
            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal.add_user.name')}
                labelText={t('modal.add_user.name')}
                styles={{
                  maxWidth: '274px',
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

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal.add_user.email')}
                labelText={t('modal.add_user.email')}
                styles={{
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

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal.add_user.cpf')}
                labelText={t('modal.add_user.cpf')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cpf ? maskCPF(body?.cpf) : ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cpf: maskCPF(ev.target.value),
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal.add_user.phone')}
                labelText={t('modal.add_user.phone')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={maskPhone(body?.phone)}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    phone: maskPhone(ev.target.value),
                  }))
                }
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal.add_user.password')}
                labelText={t('modal.add_user.password')}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                type={showPassword ? 'text' : 'password'}
                value={body?.password ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    password: ev.target.value,
                  }))
                }
                error={passwordError}
                helperText={passwordError ? t('modal.add_user.error') : ''}
                isPassword
                onClick={() => setShowPassword(!showPassword)}
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                required
                label={t('modal.add_user.confirm_password')}
                labelText={t('modal.add_user.confirm_password')}
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                type={showConfirmPassword ? 'text' : 'password'}
                value={body?.confirmPassword ?? ''}
                onChange={(ev) => setConfirmPassword(ev.target.value)}
                error={passwordError}
                helperText={passwordError ? t('modal.add_user.error') : ''}
                isPassword
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </Grid>

            <Grid item xs={6} md={6} lg={6}>
              <BaseSelect
                required
                labelText={t('modal.add_user.type_user')}
                placeholder={t('modal.add_user.type_user')}
                options={enums.typeUser || []}
                getOptionLabel={(option) => option.label ?? ''}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setBody((state) => ({
                      ...state,
                      type_role: newValue.value,
                    }));
                  }
                  if (newValue === null) {
                    setBody((state) => ({ ...state, type_role: '' }));
                  }
                }}
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
                {t('button.create')}
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loadingCreate && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalAddUser;
