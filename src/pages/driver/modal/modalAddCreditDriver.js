import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { successNotification, errorNotification } from 'utils/notification';
import { useCreate } from 'services/requests/useCreate';
import { formatMoney } from 'utils/masks';
import { unmaskMoney } from 'utils/unmaskMoney';
import { useTranslation } from 'react-i18next';

import Button from 'components/atoms/BaseButton/BaseButton';
import Loading from 'components/atoms/loading/loading';
import Text from 'components/atoms/BaseText/BaseText';
import Modal from 'components/molecules/BaseModal/BaseModal';
import SelectWithInput from 'components/molecules/selectWithInput/selectWithInput';
import BaseInput from 'components/molecules/BaseInput/BaseInput';

const ModalAddCreditDriver = ({
  showModal,
  setShowModal,
  props,
  mutateDriverId,
  mutate
}) => {
  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({
    driver_id: props,
    description: ''
  });

  const {
    data: credit,
    error: creditError,
    isFetching
  } = useCreate(`user/credit`, body, fetch, setFetch);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (credit) {
      mutateDriverId();
      mutate();
      onClose();
      successNotification();
    }
    if (creditError) {
      errorNotification(creditError?.response?.data?.mgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit, creditError]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="500px"
      height="390px"
    >
      {creditError && !isFetching && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${creditError?.response?.data?.responseData?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && (
        <>
          <Grid item container justifyContent="center">
            <Text fontsize={'23px'}>{t('modal.title_credit')}</Text>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid item xs={6} md={8.3} lg={8.3} mt={1}>
              <Grid item xs={12} md={12} lg={12}>
                <SelectWithInput
                  xs={12}
                  md={12}
                  lg={12}
                  labelText={t('field.value')}
                  labelTextSelect={t('field.type')}
                  placeholder={t('messages.select')}
                  options={[
                    { label: t('info_financial.credit'), value: 'CREDIT' },
                    { label: t('info_financial.debit'), value: 'DEBIT' }
                  ]}
                  onChangeSelect={(ev, newValue) =>
                    setBody((state) => ({
                      ...state,
                      type_method: newValue?.value ?? ''
                    }))
                  }
                  value={formatMoney(body?.value)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      value: unmaskMoney(ev.target.value)
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12} mt={2}>
                <BaseInput
                  required
                  labelText={t('modal.reason')}
                  label={t('placeholder.reason')}
                  value={body?.description ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      description: ev.target.value
                    }))
                  }
                />
              </Grid>
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
            <Grid container item xs={12} md={4} lg={4}>
              <Button
                onClick={(ev) => handleSubmit(ev)}
                color="success"
                disabled={body?.description?.length < 5}
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '171px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                {t('button.register2')}
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

export default ModalAddCreditDriver;
