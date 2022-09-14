import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { successNotification } from "utils/notification";
import { useGetBingo } from "services/requests/useGet";
import { useBingoUpdate } from "services/requests/useUpdate";
import { PointIcon } from "components/atoms/icons/icons";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Switch from "components/atoms/switch/switch";
import Text from "components/atoms/text/text";
import Autocomplete from "components/atoms/autocomplete/autocomplete";

const ModalUpdateLine = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    lineId, 
    gameInstanceId  
  }) => {

  const { t } = useTranslation();
  
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});
  const [collectorSelect, setCollectorSelect] = useState([]);
  // const user = useSelector((state) => state.user);

  const query = {
    game_instance: "b1452e4c-011c-4c74-96f0-8bc6faf192eb",
    route_id: lineId,
  };

  const {
    data: currentLine,
  } = useGetBingo("/bingo-reports/route/byid", query);

  const {
    data: lineUpdate,
    error: errorLineUpdate,
    isFetching
  } = useBingoUpdate("bingo-reports/route/update", body, "", fetch, setFetch);

  const {
    data: collector
  } = useGetBingo(
      "bingo-reports/collector",
      {game_instance: query.game_instance,
        sort_field: "id" }, 
      query.game_instance ? false : true
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
    setBody({})
  };

  const propsRoutes = () => {
    const result = currentLine?.collectors?.map((res) => ({ id: res.route_id, name: res.route_name })) 
    return result ?? []
  }

  useEffect(() => {
    setBody((state) => ({
      ...state,
      game_instance: "b1452e4c-011c-4c74-96f0-8bc6faf192eb",
      route_id: lineId,
      name: currentLine?.name,
      collector_ids: currentLine?.collectors?.map((item) => item.id),
      status: currentLine?.status
    }))
    setCollectorSelect((state) => ({
      ...state,
      collectors: propsRoutes(collector?.items),
      collector_ids: currentLine?.collectors?.map((res) => ({ id: res?.id, name: res?.name})) ?? [],
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collector, currentLine, lineId]);

  useEffect(() => {
    if (lineUpdate || errorLineUpdate) {
      mutate();
      onClose();
    }
    if(lineUpdate){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineUpdate, errorLineUpdate]);

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="500px"
    >
      <ContentHeader>
        <Title>{t("modal.edit") + " " + t("field.line")}</Title>
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

            <Grid item xs={12} md={12} lg={12}>
              <Text sx={{ ml: 1 }}>{t("field.seller_name")}</Text>
              <Input
                required
                styles={{
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "2.4rem",
                  },
                }}
                value={body?.name}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    name: ev.target.value
                  })) 
                }
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12} >
              <Text sx={{ ml: 1 }}>{t("field.collector")+"s"}</Text>
              <Autocomplete 
                multiple
                filterSelectedOptions
                options={collector?.items ?? []}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={collectorSelect?.collector_ids ?? []}
                onChange={(event, newValue) => {
                  setBody((state) => ({
                      ...state,
                      collector_ids: [...newValue.map((option) => option.id)]
                    }))
                  setCollectorSelect((state) => ({
                    ...state,
                    collector_ids: [...newValue.map((item) => ({ id: item.id, name: item.name}))] ?? []
                  }))
                  }}
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

      {isFetching && <Loading titulo={t("messages.loading")}/>}
    </Modal>
  );
};

export default ModalUpdateLine;
