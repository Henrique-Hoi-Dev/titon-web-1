import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBingoDelete } from "services/requests/useDelete";
import { Grid } from "@mui/material";
import { successNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";

const ModalDeleteTemplateScheduleDraw = (
  { 
    open, 
    onClose, 
    id, 
    mutate, 
    gameInstanceId 
  }) => {
    
  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);

  const { data, error, isFetching } = useBingoDelete(
    "bingo-reports/round/template",
    id,
    gameInstanceId,
    fetch,
    setFetch
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    if (data?.success) {
      mutate();
      onClose();
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.success]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="460px"
    >
      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {t(`messages: ${error?.response.data.message}`)}
          </Text>
        </Grid>
      )}

      {!isFetching && (
        <>
          <Grid item container justifyContent="center">
            <Text fontSize={"30px"}>{t(`messages.do_you_want_delete`)}</Text>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Button variant="return" onClick={() => onClose()}>{t("button.return")}</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Button type="submit">{t("button.confirm")}</Button>
          </Grid>
        </>
      )}
      {isFetching && (
        <Grid item container>
          <Loading titulo={t("messages.loading")}/>
        </Grid>
      )}
    </Modal>
  );
};

export default ModalDeleteTemplateScheduleDraw;
