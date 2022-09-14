import { useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { startOfDay } from "date-fns";
import { IconAdd } from "components/atoms/icons/icons";
import { formatDatePicker } from "utils/formatDate";
import { useMediaQuery } from "react-responsive";
import { useStateValue } from "context/state";

import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Title from "components/atoms/title/title";
import Button from "components/atoms/button/button";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import PickerDate from "components/atoms/pickerDate/pickerDate";
import Table from "./table";
import ModalAddScheduleDraw from "./modalAddScheduleDraw";
import Text from "components/atoms/text/text";

const ScheduledDraw = () => {
  const { t } = useTranslation();

  const [state] = useStateValue();
  const { roomId } = state;

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [value, setValue] = useState(0);

  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const INITIAL_STATE_QUERY = {
    game_instance: null,
    start_date: formatDatePicker(new Date(), true),
    end_date: formatDatePicker(new Date(), true),
  };
  const [query, setQuery] = useState(INITIAL_STATE_QUERY);

  const {
    data: scheduledDraw,
    error: scheduledDrawError,
    isFetching: scheduledDrawIsFetching,
    mutate,
  } = useGetBingo(
    "bingo-reports/round/bydate", 
    query, 
    query?.game_instance ? false : true
  );

  const {
    data: gameInstance,
  } = useGetBingo(
      "bingo-reports/gameinstance", 
      {room_id: roomId}, 
      roomId ? false : true
  );

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setQuery((state) => ({
      ...state,
      start_date: formatDatePicker(startOfDay(newValue), true),
    }));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    setQuery((state) => ({
      ...state,
      end_date: formatDatePicker(startOfDay(newValue), true),
    }));
  };

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        style={{ width: "100%" }}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Grid
      container
      justifyContent="flex-end"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <ContentHeader>
        <Title>{t("menu.scheduled_draw")}</Title>
      </ContentHeader>

      <Grid
        item
        container
        spacing={2}
        mt={1}
        mb={1}
        alignItems="flex-start"
        justifyContent="flex-end"
      >

        <Grid item xs={12} md={3} lg={3}>
            <Autocomplete 
                options={gameInstance ?? []}
                disabled={!roomId}
                getOptionLabel={(option) => option.gameName}
                placeholder={t("field.game_instance")+"s"}
                onChange={(event, newValue) => {
                  setQuery((state) => ({
                    ...state,
                    game_instance: newValue?.id
                  }));
                }}
            />
            {!roomId && (
              <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                {t("messages.select_room").toUpperCase()}
              </Text>
            )}
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <PickerDate
            label={t("field.initial_date")}
            value={startDate}
            minDate={new Date()}
            size="medium"
            onChange={(newValue) => handleStartDateChange(newValue)}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <PickerDate
            label={t("field.final_date")}
            minDate={startDate}
            value={endDate}
            size="medium"
            onChange={(newValue) => handleEndDateChange(newValue)}
          />
        </Grid>

        <Grid container item xs={12} md={3} lg={3} justifyContent="flex-end">
          <Grid item xs={12} md={6} lg={6}>
            <Button sx={{ height: "56px" }} onClick={() => setShowModal(true)}>
              <IconAdd sx={{ color: "white", fontSize: "40px" }} />
            </Button>
          </Grid>
        </Grid>

        <Grid item container pl={2} mt={1}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              sx={{}}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{
                  fontSize: `${isSmallMobile && "12px"}`,
                  "&.MuiButtonBase-root.MuiTab-root": {
                    minWidth: `${isSmallMobile && "30px"}`,
                    p: `${isSmallMobile && "4px 8px"}`,
                  },
                }}
                label={t("field.rounds")}
                {...a11yProps(0)}
              />
              <Tab
                sx={{
                  fontSize: `${isSmallMobile && "12px"}`,
                  "&.MuiButtonBase-root.MuiTab-root": {
                    minWidth: `${isSmallMobile && "30px"}`,
                    p: `${isSmallMobile && "4px 8px"}`,
                  },
                }}
                label={t("field.special_rounds")}
                {...a11yProps(1)}
              />
              <Tab
                sx={{
                  fontSize: `${isSmallMobile && "12px"}`,
                  "&.MuiButtonBase-root.MuiTab-root": {
                    minWidth: `${isSmallMobile && "30px"}`,
                    p: `${isSmallMobile && "4px 8px"}`,
                  },
                }}
                label={t("field.super_special_rounds")}
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
        </Grid>

        <Grid item container pl={2} mt={1}>
          <TabPanel value={value} index={0}>
            <Table
              data={scheduledDraw}
              query={query}
              list={scheduledDraw?.rounds}
              setQuery={setQuery}
              isValidating={scheduledDrawIsFetching}
              loading={scheduledDrawIsFetching}
              error={scheduledDrawError}
              mutate={mutate}
              gameInstanceId={query?.game_instance}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Table
              data={scheduledDraw}
              query={query}
              list={scheduledDraw?.special_rounds}
              setQuery={setQuery}
              isValidating={scheduledDrawIsFetching}
              loadi={scheduledDrawIsFetching}
              error={scheduledDrawError}
              mutate={mutate}
              gameInstanceId={query?.game_instance}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Table
              data={scheduledDraw}
              query={query}
              list={scheduledDraw?.super_special_rounds}
              setQuery={setQuery}
              isValidating={scheduledDrawIsFetching}
              loading={scheduledDrawIsFetching}
              error={scheduledDrawError}
              mutate={mutate}
              gameInstanceId={query?.game_instance}
            />
          </TabPanel>
        </Grid>
      </Grid>

      {showModal && (
        <ModalAddScheduleDraw
          gameInstance={gameInstance}
          showModal={showModal}
          setShowModal={setShowModal}
          mutate={mutate}
          roomId={roomId}
        />
      )}
    </Grid>
  );
};

export default ScheduledDraw;
