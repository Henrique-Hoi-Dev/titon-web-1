import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import Button from "components/atoms/button/button";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";

const ModalDeleteTemplate = (
  { 
    open, 
    onClose, 
    id, 
    setDraw 
  }) => {
    
  const { t } = useTranslation();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setDraw((draws) => draws.filter((_, index) => index !== id));
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="360px"
    >
      <Grid item container justifyContent="center">
        <Text fontSize={"30px"}>{t(`messages.do_you_want_delete`)}</Text>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Button variant="return" onClick={() => onClose()}>{t("button.return")}</Button>
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <Button onClick={(ev) => handleSubmit(ev)}>{t("button.confirm")}</Button>
      </Grid>
    </Modal>
  );
};

export default ModalDeleteTemplate;
