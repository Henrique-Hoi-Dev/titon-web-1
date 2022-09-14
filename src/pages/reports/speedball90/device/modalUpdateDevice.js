import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useBingoUpdate} from "services/requests/useUpdate";
import { useGetBingo } from "services/requests/useGet";
import { successNotification } from "utils/notification";
import { PointIcon } from "components/atoms/icons/icons";

import Button from "components/atoms/button/button";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";
import Switch from "components/atoms/switch/switch";

const ModalUpdateDevice = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    gameInstanceId, 
    deviceId, 
    gameinstance 
  }) => {

  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});
  
  let getDefaultOptionSalesPointId = () => salespoint?.items?.find((item) => item.id === body?.salespoint_id) ?? null;
  let getDefaultOptionGameInstanceId = () => gameinstance?.find((item) => item.id === body?.game_instance) ?? null;
  
  let deviceQuery = {
    game_instance: gameInstanceId,
    device_id: deviceId, 
  }

  const {
    data: device,
    // error: deviceError,
    // isFetching: deviceIsFetching,
    // mutate: deviceMutate,
} = useGetBingo("bingo-reports/device/byid", deviceQuery);

  const {
    data: salespoint,
  } = useGetBingo(
    "bingo-reports/salespoint", 
    {game_instance: gameInstanceId}, 
    gameInstanceId ? false : true
  );

  const {
    data: newDevice,
    error: errorNewDevice,
    isFetching: isFetchingNewDevice,
  } = useBingoUpdate("/bingo-reports/device/update", body, "", fetch, setFetch);

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      game_instance: gameInstanceId,
      device_id: deviceId,
      salespoint_id: Number(device?.salespoint_id),
      status: device?.status,
    }))

  }, [device, deviceId, gameInstanceId])

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
    >
      <ContentHeader>
        <Title>{t("modal.edit") + " " + t("field.device")}</Title>
      </ContentHeader>

      {!isFetchingNewDevice && (
        <Grid
          container
          item
          spacing={2}
          mt={2}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >
           <Grid item xs={12} md={12} lg={12} mt={2.5}>
            <Text sx={{ ml: 1 }}>{t("field.status")}</Text>
            <Grid item xs={12} md={6} lg={6}>
              <PointIcon 
                sx={{ verticalAlign: "middle" }} 
                color={body?.status ? "#3333" : "#E74C3C"}
              />
              <Switch checked={body?.status ? true : null} onChange={(ev) => {
                  setBody((state) => ({
                    ...state,
                    status: ev.target.checked
                  }))
                }}
              />
              <PointIcon 
                sx={{ verticalAlign: "middle" }} 
                color={body?.status ? "#2ECC71" : "#3333"}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>{t("field.game_instance")}</Text>
            <Autocomplete 
                options={gameinstance ?? []}
                getOptionLabel={(option) => option.gameName || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                defaultValue={getDefaultOptionGameInstanceId() ?? null}
                onChange={(event, newValue) => {
                    if(newValue === null) {
                     return  setBody((state) => ({
                      ...state,
                      game_instance: ''
                       }))
                     }
                     setBody((state) => ({
                      ...state,
                      game_instance: newValue.id
                    }))}
                  }
            />
          </Grid>

         
          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>{t("field.salespoint_name")}</Text>
            <Autocomplete 
                options={salespoint?.items ?? []}
                getOptionLabel={(option) => option.name || ""}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={getDefaultOptionSalesPointId()}
                onChange={(event, newValue) => setBody((state) => ({
                  ...state,
                  salespoint_id: newValue?.id,
                }))}
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

      {isFetchingNewDevice && <Loading />}
    </Modal>
  );
};

export default ModalUpdateDevice;
