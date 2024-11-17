import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { successNotification, errorNotification } from 'utils/notification';
import { useDelete } from 'services/requests/useDelete';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from 'components/atoms/loading/loading';
import Text from 'components/atoms/BaseText/BaseText';
import Modal from 'components/molecules/BaseModal/BaseModal';
import mgsError from '../../../utils/error/en.json';

const ModalDeleteTruck = ({ showModal, setShowModal, props, mutate }) => {
  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);

  const { data, isFetching, error } = useDelete(
    'user/truck',
    props.id,
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
    if (data?.successStatus === true) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
    } else if (error?.response?.status === 400) {
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
      maxWidth="600px"
    >
      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${mgsError[error?.response?.data?.mgs]}`}
          </Text>
        </Grid>
      )}

      {!isFetching && (
        <>
          <Grid item container justifyContent="center">
            <Text fontSize={'30px'}>
              {t('messages.want_to_delete')} {props.name} ?
            </Text>
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
              <Text fontSize={'16px'}>
                {t('messages.delete_msg_notice_truck')}
              </Text>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={2}
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
                // background={'#F03D3D'}
                variant="outlined"
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '141px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.delete')}
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

export default ModalDeleteTruck;
