import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { errorNotification, successNotification } from 'utils/notification';
import { formatMil } from 'utils/masks';
import { unmaskMoney } from 'utils/unmaskMoney';
import { useTranslation } from 'react-i18next';
import { useUpdatePatch } from 'services/requests/useUpdatePatch';

import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from 'components/atoms/loading/loading';
import Text from 'components/atoms/BaseText/BaseText';
import Modal from 'components/molecules/BaseModal/BaseModal';
import BaseInput from 'components/molecules/BaseInput/BaseInput';
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader';

export const ModalFinalizeRecord = ({
  showModal,
  setShowModal,
  financialId,
  props,
  mutate
}) => {
  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const { data, error, isFetching } = useUpdatePatch(
    `user/financialStatement/finishing/${financialId}`,
    body,
    '',
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
      mutate();
      onClose();
      successNotification();
    }

    if (error) {
      errorNotification(error?.response?.data?.mgs);
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="640px"
      minheight={'300px'}
    >
      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${error?.response?.data?.responseData?.msg}`}
          </Text>
        </Grid>
      )}

      <ContentHeader>
        <Text fontsize={'32px'}>
          {t('info_financial.title')} {props?.dataResult?.truck_board} ?
        </Text>
      </ContentHeader>

      {!isFetching && (
        <>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <BaseInput
              label={'Insira o KM final'}
              required
              styles={{
                width: '300px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMil(body?.final_km)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  final_km: unmaskMoney(ev.target.value),
                  status: false
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
                {t('button.finish')}
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
