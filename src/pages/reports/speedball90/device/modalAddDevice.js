import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useBingoCreate } from "services/requests/useCreate";
import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";
import { successNotification } from "utils/notification";
import { useGetBingo } from "services/requests/useGet";

const ModalAddDevice = ({ showModal, setShowModal, mutate, gameinstance, roomId }) => {
  const { t } = useTranslation();
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const {
    data: newDevice,
    error: errorNewDevice,
    isFetching,
  } = useBingoCreate("/bingo-reports/device/create", body, fetch, setFetch);

  const {
    data: salespoint,
    // error: salespointError,
    // isFetching: salespointIsFetching,
    // mutate,
  } = useGetBingo(
      "bingo-reports/salespoint", 
      {game_instance: body?.game_instance}, 
      body?.game_instance ? false : true
  );

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    if (newDevice || errorNewDevice) {
      mutate();
      onClose();
    }

    if(newDevice){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDevice, errorNewDevice]);

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"800px"}
      maxHeight={"800px"}
    >
      <ContentHeader>
        <Title>{t("modal.add") + " " + t("field.device")}</Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={2}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        > 
          <Grid item xs={12} md={6} lg={6}>
          {t("field.game_instance")}
              <Autocomplete 
                  options={gameinstance ?? []}
                  disabled={!roomId}
                  getOptionLabel={(option) => option.gameName}
                  onChange={(event, newValue) => {
                    setBody((state) => ({
                      ...state,
                      game_instance: newValue?.id,
                    }))
                  }}
              />
              {!roomId && (
                <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                {t("messages.select_room").toUpperCase()}
                </Text>
              )}
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
          <Text sx={{ ml: 1 }}>{t("field.salespoint_name")}</Text>
            <Autocomplete 
                options={salespoint?.items ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => setBody((state) => ({
                  ...state,
                  salespoint_id: newValue?.id,
                }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>{t("field.device_number")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "2.4rem",
                },
              }}
              value={body?.device_number}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  device_number: Number(ev.target.value),
                }))
              }
            />
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Button variant="return" onClick={() => onClose()}>
                {t("button.return")}
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button type="submit">{t("button.confirm")}</Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddDevice;
