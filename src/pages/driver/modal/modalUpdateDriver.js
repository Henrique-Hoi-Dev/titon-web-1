import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { errorNotification, successNotification } from 'utils/notification';
import { useGet } from 'services/requests/useGet';
import { useUpdate } from 'services/requests/useUpdate';
import { formatDatePicker } from 'utils/formatDate';
import { useTranslation } from 'react-i18next';
import { maskCPF } from 'utils/masks';

import Button from 'components/atoms/BaseButton/BaseButton';
import Modal from 'components/molecules/BaseModal/BaseModal';
import Loading from 'components/atoms/loading/loading';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';
import Title from 'components/atoms/BaseTitle/BaseTitle';
import PickerDate from 'components/atoms/pickerDate/pickerDate';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import ModalResetPassword from './modalResetPassword';

const ModalUpdateDriver = ({ showModal, setShowModal, mutate, props }) => {
  const { t } = useTranslation();
  const [showModalResetPassword, setShowModalResetPassword] = useState(false);

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState([]);

  const { data: driver, isValidating } = useGet(`user/driver/${props.id}`, []);

  const { data, error, isFetching } = useUpdate(
    `user/driver/${driver?.dataResult?.id}`,
    body,
    '',
    fetch,
    setFetch
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      name: driver?.dataResult?.name,
      number_cnh: driver?.dataResult?.number_cnh,
      valid_cnh: driver?.dataResult?.valid_cnh,
      date_valid_mopp: driver?.dataResult?.date_valid_mopp,
      date_valid_nr20: driver?.dataResult?.date_valid_nr20,
      date_valid_nr35: driver?.dataResult?.date_valid_nr35,
      cpf: driver?.dataResult?.cpf,
      date_admission: driver?.dataResult?.date_admission,
      date_birthday: driver?.dataResult?.date_birthday
    }));
  }, [driver]);

  useEffect(() => {
    if (data) {
      mutate();
      onClose();
      successNotification('Edição bem sucedida');
    }
    if (error) {
      errorNotification(error?.response?.data?.mgs);
    }
  }, [data, error, mutate, onClose]);

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

        {isFetching && <Loading />}
        {isValidating && <Loading />}
      </Modal>
      {showModalResetPassword && (
        <ModalResetPassword
          setShowModal={setShowModalResetPassword}
          showModal={showModalResetPassword}
          props={driver?.dataResult}
        />
      )}
    </>
  );
};

export default ModalUpdateDriver;
