import React, { useEffect, useState } from 'react';
import {
  Grid,
  LinearProgress,
  linearProgressClasses,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCreate } from 'services/requests/useCreate';
import { errorNotification, successNotification } from 'utils/notification';
import { formatMoney, maskCPF, maskPhone } from 'utils/masks';
import { unmaskMoney } from 'utils/unmaskMoney';
import { evaluateStrongPassword } from 'utils/passwordVerify';
import { unmaskPhone } from 'utils/unmask';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from 'components/atoms/loading/loading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import BaseInput from 'components/molecules/BaseInput/BaseInput';

const ModalAddDriver = ({ showModal, setShowModal, mutate }) => {
  const { t } = useTranslation();

  const [body, setBody] = useState({});
  const [data, setData] = useState({});

  const [fetch, setFetch] = useState(false);

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

  const {
    data: newDevice,
    error: errorNewDevice,
    isFetching
  } = useCreate('driver/signup', data, fetch, setFetch);

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (body?.password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    setFetch(true);
    setPasswordError(false);
    setConfirmPassword('');
  };

  useEffect(() => {
    setData((state) => ({
      ...state,
      name: body?.name,
      cpf: body?.cpf?.replace(/\D/g, ''),
      password: body?.password,
      percentage: body?.percentage,
      phone: unmaskPhone(body?.phone),
      daily: unmaskMoney(body?.daily),
      value_fix: unmaskMoney(body?.value_fix)
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  useEffect(() => {
    if (newDevice) {
      mutate();
      onClose();
      successNotification(t('messages.success_msg'));
    }

    if (errorNewDevice) {
      errorNotification(errorNewDevice?.response?.data?.mgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDevice, errorNewDevice]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'800px'}
    >
      <ContentHeader mt={2}>
        <Title>{t('modal_create_driver.title')}</Title>
      </ContentHeader>

      {!isFetching && (
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

          <Grid item xs={12} md={6} lg={6} />

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

          <Grid item xs={12} md={12} lg={12}>
            <BaseInput
              required
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
            <Grid container item xs={12} md={12} lg={3}>
              <Button
                onClick={(ev) => handleSubmit(ev)}
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{ width: '140px', height: '49px' }}
              >
                {t('button.register')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddDriver;
