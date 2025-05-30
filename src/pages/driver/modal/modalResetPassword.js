import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { successNotification, errorNotification } from 'utils/notification';
import { useUpdatePatch } from 'services/requests/useUpdatePatch';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from 'components/atoms/loading/loading';
import Text from 'components/atoms/BaseText/BaseText';
import Modal from 'components/molecules/BaseModal/BaseModal';

const ModalResetPassword = ({ showModal, setShowModal, props }) => {
  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);

  const { data, isFetching, error } = useUpdatePatch(
    'user/driver/reset-password',
    {},
    props?.cpf,
    fetch,
    setFetch
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      console.log('data', data);
      onClose();
      successNotification();
    }
    if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.mgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="650px"
    >
      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${error?.response?.data?.responseData?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && (
        <>
          <Grid item container justifyContent="center">
            <Text fontSize={'30px'}>{t('messages.want_to_password')}</Text>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid
              item
              xs={6}
              md={8.3}
              lg={8.3}
              mt={1}
              sx={{ textAlign: 'center' }}
            >
              <Text fontSize={'16px'}>{t('messages.reset_password')}</Text>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={2}
            mt={2}
            justifyContent={'center'}
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
                color="error"
                variant="outlined"
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '141px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.reset')}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {isFetching && (
        <Grid item container>
          <Loading />
        </Grid>
      )}
    </Modal>
  );
};

export default ModalResetPassword;
