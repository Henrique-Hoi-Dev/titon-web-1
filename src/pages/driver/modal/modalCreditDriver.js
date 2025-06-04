import { Grid, IconButton } from '@mui/material';
import { useGet } from 'services/requests/useGet';
import { BiPlus } from 'react-icons/bi';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Loading from 'components/atoms/loading/loading';
import Text from 'components/atoms/BaseText/BaseText';
import Modal from 'components/molecules/BaseModal/BaseModal';
import TableBankStatement from '../tableBankStatement';
import ModalAddCreditDriver from './modalAddCreditDriver';

const ModalCreditDriver = ({ showModal, setShowModal, props, mutate }) => {
  const { t } = useTranslation();

  const {
    data,
    isValidating,
    mutate: mutateDriverId
  } = useGet(`user/driver/${props.id}`, []);

  const [showModalAddCredit, setShowModalAddCredit] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <Modal open={showModal} onClose={onClose} maxWidth="650px" height="580px">
      {!isValidating && (
        <>
          <Grid item container justifyContent="center">
            <Text fontsize={'23px'}>
              {t('messages.credit/debit')} {props.name} ?
            </Text>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={12}
            lg={12}
            justifyContent="flex-end"
          >
            <IconButton
              onClick={() => setShowModalAddCredit(true)}
              color="primary"
              aria-label="add to shopping cart"
            >
              <BiPlus size={'35px'} />
            </IconButton>
            <Grid item xs={12} md={12} lg={12} mt={2}>
              <TableBankStatement data={data} />
            </Grid>
          </Grid>
        </>
      )}
      {isValidating && (
        <Grid item container>
          <Loading />
        </Grid>
      )}

      {showModalAddCredit && (
        <ModalAddCreditDriver
          setShowModal={setShowModalAddCredit}
          showModal={showModalAddCredit}
          props={props.id}
          mutateDriverId={mutateDriverId}
          mutate={mutate}
        />
      )}
    </Modal>
  );
};

export default ModalCreditDriver;
