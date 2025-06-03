import React, { useEffect, useState, useCallback } from 'react';
import {
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatMoney, maskCPF, maskPhone } from 'utils/masks';
import { useDispatch, useSelector } from 'react-redux';
import {
  createDriverRequest,
  getDriversRequest,
  resetCreateDriverStatus
} from 'store/modules/driver/driverSlice';
import { unmaskPhone } from '@/utils/unmask';
import { unmaskMoney } from '@/utils/unmaskMoney';
import { evaluateStrongPassword } from '@/utils/passwordVerify';

import BaseButton from 'components/atoms/BaseButton/BaseButton';
import BaseModal from 'components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from '@/components/molecules/BaseContentHeader/BaseContentHeader';
import BaseInput from '@/components/molecules/BaseInput/BaseInput';
import BaseTitle from '@/components/atoms/BaseTitle/BaseTitle';
import enums from '@/utils/enums';

const BaseModalAddDriver = ({ showModal, setShowModal }) => {
  const { t } = useTranslation();
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 2,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 2,
      backgroundColor: evaluateStrongPassword(body.password).color
    }
  }));

  const [body, setBody] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: ''
  });
  const [data, setData] = useState({});

  const dispatch = useDispatch();
  const { loadingCreate, successCreate } = useSelector((state) => state.driver);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    dispatch(createDriverRequest(data));

    setPasswordError(false);
    setConfirmPassword('');
  };

  const onClose = useCallback(() => {
    setBody({
      name: '',
      cpf: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: ''
    });
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    setData((state) => ({
      ...state,
      name: body?.name,
      cpf: body?.cpf?.replace(/\D/g, ''),
      password: body?.password,
      percentage: Number(body?.percentage),
      phone: unmaskPhone(body?.phone),
      daily: unmaskMoney(body?.daily),
      value_fix: unmaskMoney(body?.value_fix)
    }));
  }, [body]);

  useEffect(() => {
    if (successCreate) {
      onClose();
      dispatch(getDriversRequest(enums.INITIAL_STATE_DRIVER));
      dispatch(resetCreateDriverStatus());
    }
  }, [successCreate, onClose, dispatch]);

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'800px'}
    >
      <BaseContentHeader mt={2}>
        <BaseTitle>{t('modal_create_driver.title')}</BaseTitle>
      </BaseContentHeader>

      {!loadingCreate && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              labelText={t('modal_create_driver.name_driver')}
              label={t('placeholder.name_driver')}
              styles={{ minWidth: '250px' }}
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
              required
              labelText={t('modal_create_driver.cpf_driver')}
              label={t('placeholder.cpf_driver')}
              styles={{ minWidth: '250px' }}
              value={body?.cpf ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cpf: maskCPF(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              type={showPassword ? 'text' : 'password'}
              labelText={t('label.password')}
              label={t('placeholder.login_password')}
              styles={{ minWidth: '250px' }}
              value={body?.password ?? ''}
              error={passwordError}
              helperText={passwordError ? t('error.passwords_not_match') : ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value
                }))
              }
              isPassword
              onClick={() => setShowPassword(!showPassword)}
            />
            <br />
            <BorderLinearProgress
              variant="determinate"
              value={evaluateStrongPassword(body.password).progress}
            />
            <br />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              isPassword
              type={showConfirmPassword ? 'text' : 'password'}
              labelText={t('modal_create_driver.create_confirm_password')}
              label={t('placeholder.create_password')}
              styles={{ minWidth: '250px' }}
              value={confirmPassword ?? ''}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              labelText={t('modal_create_driver.phone_driver')}
              label={t('placeholder.phone_driver')}
              styles={{ minWidth: '250px' }}
              value={maskPhone(body?.phone)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  phone: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              labelText={t('modal_create_driver.value_daily_driver')}
              styles={{ minWidth: '250px' }}
              value={formatMoney(body?.daily)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  daily: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              labelText={t(
                'modal_create_driver.value_fixed_remuneration_driver'
              )}
              styles={{ minWidth: '250px' }}
              value={formatMoney(body?.value_fix)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  value_fix: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <BaseInput
              required
              type="number"
              labelText={t('modal_create_driver.value_percentage_pay_driver')}
              styles={{ minWidth: '250px', maxWidth: '274px' }}
              value={body?.percentage ?? 0}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  percentage: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={2}
            mt={1}
            p={2}
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
                  color: '#FFF'
                }}
                variant="text"
              >
                {t('button.cancel')}
              </BaseButton>
            </Grid>
            <Grid container item xs={12} md={12} lg={3}>
              <BaseButton
                onClick={(ev) => handleSubmit(ev)}
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{ width: '140px', height: '49px' }}
              >
                {t('button.register')}
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loadingCreate && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalAddDriver;
