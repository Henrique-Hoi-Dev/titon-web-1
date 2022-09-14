import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { IconAdd } from "components/atoms/icons/icons";
import { useStateValue } from "context/state";

import Title from "components/atoms/title/title";
import Button from "components/atoms/button/button";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Table from "./table";
import ModalAddCollector from "./modalAddCollector.js";
import SelectComponent from "components/atoms/select/select";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";

const Collector = () => {
  const { t } = useTranslation();

  const [state] = useStateValue();
  const { roomId } = state

  const [openAddCollector, setOpenAddCollector] = useState(false);

  const [gameInstanceId, setGameInstanceId] = useState(null)
  const [filterStatus, setFilterSatus] = useState(null);

  const statusFilter = [
    { value: true, name: t("field.activated") },
    { value: false, name: t("field.disabled") },
  ]

  const INITIAL_STATE_QUERY = {
    limit: 25,
    page: 1,
    sort_field: "id",
    sort_order: "ASC",
    game_instance: gameInstanceId,
    status: null
  };
  const [query, setQuery] = useState(INITIAL_STATE_QUERY);

  const {
    data: collector,
    error: collectorError,
    isValidating,
    loading,
    mutate,
  } = useGetBingo(
    "bingo-reports/collector", query
  );
    
  const {
    data: gameInstance,
  } = useGetBingo(
      "bingo-reports/gameinstance", 
      {room_id: roomId}, 
      roomId ? false : true
  );

  useEffect(() => {
    setQuery((state) => ({
      ...state,
      game_instance: gameInstanceId,
      status: filterStatus
    }));
  }, [gameInstanceId, filterStatus]);

  return (
    <Grid
      container
      justifyContent="flex-end"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <ContentHeader>
        <Title>{t("menu.collector")}</Title>
      </ContentHeader>

      <Grid
        item
        container
        spacing={2}
        mt={1}
        mb={1}
        alignItems="flex-start"
        justifyContent="flex-start"
      >

        <Grid item xs={12} md={3} lg={3}>
          <Autocomplete
            disabled={!roomId} 
            options={gameInstance ?? []}
            getOptionLabel={(option) => option.nick}
            placeholder={t("field.game_instance")}
            onChange={(event, newValue) => {
              setGameInstanceId(newValue?.id);
            }}
          />
          {!roomId && (
            <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
              {t("messages.select_room").toUpperCase()}
            </Text>
          )}
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <SelectComponent 
            setFilterValue={setFilterSatus}
            options={statusFilter}
            placeholder={t("field.status")}
          />
        </Grid>

        <Grid container item xs={12} md={6} lg={6} justifyContent="flex-end">
          <Grid item xs={3} md={3} lg={3}>
            <Button sx={{ height: "56px" }} onClick={() => setOpenAddCollector(true)}>
              <IconAdd sx={{ color: "white", fontSize: "40px" }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container pl={2} mt={1}>
        <Table
          data={collector}
          query={query}
          setQuery={setQuery}
          isValidating={isValidating}
          loading={loading}
          mutate={mutate}
          error={collectorError}
          roomId={roomId}
        />
      </Grid>

      {openAddCollector && (
        <ModalAddCollector
          showModal={openAddCollector}
          setShowModal={setOpenAddCollector}
          gameInstance={gameInstance}
          mutate={mutate}
        />
      )}
    </Grid>
  );
};

export default Collector;
