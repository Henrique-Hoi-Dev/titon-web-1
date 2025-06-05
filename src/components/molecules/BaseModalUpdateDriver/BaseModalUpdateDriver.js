import React, { useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';
import { formatDatePicker } from 'utils/formatDate';
import { useTranslation } from 'react-i18next';
import { maskCPF } from 'utils/masks';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDriverRequest,
  getDriverByIdRequest,
  resetUpdateDriverStatus,
  getDriversRequest
} from 'store/modules/driver/driverSlice';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from '@/components/atoms/BaseLoading/BaseLoading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import PickerDate from 'components/atoms/pickerDate/pickerDate';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import BaseModalResetPassword from 'components/molecules/BaseModalResetPassword/BaseModalResetPassword';
import enums from '@/utils/enums';

const BaseModalUpdateDriver = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation();
  const [showModalResetPassword, setShowModalResetPassword] = useState(false);
  const [body, setBody] = useState({});

  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driver);

  useEffect(() => {
    if (data?.id) {
      dispatch(getDriverByIdRequest(data?.id));
    }
  }, [dispatch, data?.id]);

  useEffect(() => {
    if (driver?.selected) {
      setBody({
        name: driver?.selected?.name,
        number_cnh: driver?.selected?.numberCnh,
        valid_cnh: driver?.selected?.validCnh,
        date_valid_mopp: driver?.selected?.dateValidMopp,
        date_valid_nr20: driver?.selected?.dateValidNr20,
        date_valid_nr35: driver?.selected?.dateValidNr35,
        cpf: driver?.selected?.cpf,
        date_admission: driver?.selected?.dateAdmission,
        date_birthday: driver?.selected?.dateBirthday
      });
    }
  }, [driver]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(updateDriverRequest({ id: data.id, data: body }));
  };

  const onClose = useCallback(() => {
    setBody({
      name: '',
      number_cnh: '',
      valid_cnh: '',
      date_valid_mopp: '',
      date_valid_nr20: '',
      date_valid_nr35: '',
      cpf: '',
      date_admission: '',
      date_birthday: ''
    });
    setShowModal(false);
  }, [setShowModal]);

  useEffect(() => {
    if (driver?.successUpdate) {
      onClose();
      dispatch(resetUpdateDriverStatus());
      dispatch(getDriversRequest(enums.INITIAL_STATE_DRIVER));
    }
  }, [driver?.successUpdate, onClose, dispatch]);

  return (
    <>
      <Modal
        open={showModal}
        onClose={onClose}
        component="form"
        onSubmit={handleSubmit}
        maxWidth={'600px'}
      >
        <ContentHeader>
          <Title>{t('modal_user.title_edit_driver')}</Title>
        </ContentHeader>

        {!driver?.loadingGetById && (
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
              <PickerDate
                labelText={t('modal_create_driver.admission_date')}
                label={t('placeholder.enter_admission_date')}
                value={body?.date_admission}
                size="medium"
                height="2.4em"
                onChange={(newValue) =>
                  setBody((state) => ({
                    ...state,
                    date_admission: formatDatePicker(newValue)
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <PickerDate
                labelText={t('modal_create_driver.date_of_birth')}
                label={t('placeholder.date_of_birth')}
                value={body?.date_birthday}
                size="medium"
                height="2.4em"
                onChange={(newValue) =>
                  setBody((state) => ({
                    ...state,
                    date_birthday: formatDatePicker(newValue)
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal_create_driver.cnh_driver')}
                label={t('placeholder.cnh_driver')}
                value={body?.number_cnh ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    number_cnh: ev.target.value
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
              <PickerDate
                labelText={t('modal_create_driver.cnh_validity')}
                label={t('placeholder.cnh_validity')}
                height="2.4em"
                value={body?.valid_cnh}
                size="medium"
                onChange={(newValue) =>
                  setBody((state) => ({
                    ...state,
                    valid_cnh: formatDatePicker(newValue)
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <PickerDate
                labelText={t('modal_create_driver.mopp_validity')}
                label={t('placeholder.mopp_validity')}
                value={body?.date_valid_mopp}
                size="medium"
                height="2.4em"
                onChange={(newValue) =>
                  setBody((state) => ({
                    ...state,
                    date_valid_mopp: formatDatePicker(newValue)
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <PickerDate
                labelText={t('modal_create_driver.nr20_validity')}
                label={t('placeholder.nr20_validity')}
                value={body?.date_valid_nr20}
                size="medium"
                height="2.4em"
                onChange={(newValue) =>
                  setBody((state) => ({
                    ...state,
                    date_valid_nr20: formatDatePicker(newValue)
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <PickerDate
                labelText={t('modal_create_driver.nr35_validity')}
                label={t('placeholder.nr35_validity')}
                value={body?.date_valid_nr35}
                size="medium"
                height="2.7em"
                onChange={(newValue) =>
                  setBody((state) => ({
                    ...state,
                    date_valid_nr35: formatDatePicker(newValue)
                  }))
                }
              />
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={6}
              lg={6}
              justifyContent={'center'}
              alignItems={'flex-end'}
            >
              <Button
                onClick={() => setShowModalResetPassword(true)}
                background={
                  'linear-gradient(224.78deg, #FF4B4B 8.12%, #FF0000 92.21%)'
                }
                sx={{ width: '100%', height: '49px' }}
              >
                {t('label.reset_password')}
              </Button>
            </Grid>

            <Grid
              container
              item
              xs={12}
              md={12}
              lg={12}
              spacing={2}
              mt={2}
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
                    width: '141px',
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

        {driver?.loadingGetById && <Loading />}
      </Modal>

      {showModalResetPassword && (
        <BaseModalResetPassword
          setShowModal={setShowModalResetPassword}
          showModal={showModalResetPassword}
          data={driver?.selected}
        />
      )}
    </>
  );
};

export default BaseModalUpdateDriver;
