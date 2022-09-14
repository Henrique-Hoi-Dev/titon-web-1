import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useBingoCreate } from "services/requests/useCreate";
import { successNotification } from "utils/notification";
import { useGetBingo } from "services/requests/useGet";
import { PointIcon } from "components/atoms/icons/icons";
// import { useSelector } from "react-redux";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";
import Switch from "components/atoms/switch/switch";

const ModalAddLine = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    gameInstance 
  }) => {

  const { t } = useTranslation();
  
  const [fetch, setFetch] = useState(false);
  const [data, setData] = useState({});

  const {
    data: collector
  } = useGetBingo(
      "bingo-reports/collector",
      {game_instance: data?.game_instance,
      sort_field: "id" }, 
      data?.game_instance ? false : true
  );

  const {
    data: line,
    error: errorLine,
    isFetching,
  } = useBingoCreate("/bingo-reports/route/create", data, fetch, setFetch);

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    if (line || errorLine) {
      mutate();
      onClose();
    }
    if (line) {
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line, errorLine]);

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      maxWidth="500px"
      onSubmit={handleSubmit}
    >
      <ContentHeader>
        <Title>{t("modal.create") + " " + t("field.line")}</Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >
            <Grid item xs={12} md={12} lg={12}>
            <Text sx={{ ml: 1 }}>{t("field.status")}</Text>
            <Grid item xs={12} md={6} lg={6}>
              <PointIcon 
                sx={{ verticalAlign: "middle" }} 
                color={data?.status ? "#3333" : "#E74C3C"}
              />
              <Switch checked={data?.status ?? false} onChange={(ev, newValue) => {
                  setData((state) => ({
                    ...state,
                    status: newValue
                    }))
                 }}
              />
              <PointIcon 
                sx={{ verticalAlign: "middle" }} 
                color={data?.status ? "#2ECC71" : "#3333"}
              />
            </Grid>
          </Grid>


          <Grid item xs={12} md={12} lg={12}>
            <Text sx={{ ml: 1 }}>{t("field.line")} {t("field.name")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "2.4rem",
                },
              }}
              value={data?.name ?? ""}
              onChange={(ev) =>
                setData((state) => ({
                  ...state,
                  name: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Text sx={{ ml: 1 }}>{t("field.game_instance")}</Text>
            <Autocomplete 
              disabled={!gameInstance}
              options={gameInstance ?? []}
              getOptionLabel={(option) => option.nick}
              onChange={(event, newValue) => {
                setData((state) => ({
                  ...state,
                  game_instance: newValue?.id,
                }))
              }}
            />
            {!gameInstance && (
              <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                {t("messages.select_room").toUpperCase()}
              </Text>
            )}
          </Grid>

        
          <Grid item xs={12} md={12} lg={12} >
            <Text sx={{ ml: 1 }}>{t("field.collector")+"s"}</Text>
            <Autocomplete 
              multiple
              disabled={!data?.game_instance}
              options={collector?.items ?? []}
              getOptionLabel={(option) => option.name || ''}
              onChange={(event, newValue) => {
                setData((state) => ({
                    ...state,
                    collector_ids: [...newValue.map((option) => option.id)]
                  }))
                }}
            />
            {!data?.game_instance && (
              <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                {t("messages.select_game_instance").toUpperCase()} 
              </Text>
            )}
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

      {isFetching && <Loading titulo={t("messages.loading")}/>}
    </Modal>
  );
};

export default ModalAddLine;
