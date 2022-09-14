import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { startOfDay } from "date-fns";
import { formatDatePicker } from "utils/formatDate";
import { useStateValue } from "context/state";

import Title from "components/atoms/title/title";
import Input from "components/atoms/input/input";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Table from "./table";
import Cards from "./cards";
import PickerDate from "components/atoms/pickerDate/pickerDate";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";

const ReportClosedBoxesSpeedBall90 = () => {
  const { t } = useTranslation();

  const [state] = useStateValue();
  const { roomId } = state

  // const [operators, setOperators] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [salespointId, setSalespointId] = useState("");
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  
  const {
    data: gameInstance,
  } = useGetBingo(
      "bingo-reports/gameinstance", 
      {room_id: roomId}, 
      roomId ? false : true
  );

  const INITIAL_STATE_QUERY = {
    limit: 25,
    page: 1,
    sort_field: "",
    sort_order: "ASC",
    start_date: initialDate,
    end_date: finalDate,
    seller_id: sellerId,
    salespoint_id: salespointId,
  };
  const [closedBoxesQuery, setClosedBoxesQuery] = useState(INITIAL_STATE_QUERY);

  const {
    data: closedBoxes,
    error: closedBoxesError,
    isFetching: closedBoxesIsFetching,
    loading,
    // mutate,
  } = useGetBingo(
    "bingo-reports/report/register/closure", 
    closedBoxesQuery, 
    closedBoxesQuery?.game_instance ? false : true
  );

  useEffect(() => {
    setClosedBoxesQuery((state) => ({
      ...state,
      seller_id: sellerId,
      salespoint_id: salespointId,
    }));
  }, [sellerId, salespointId]);

  const handleStartDateChange = (newValue) => {
    setInitialDate(newValue);
    setClosedBoxesQuery((state) => ({
      ...state,
      start_date: formatDatePicker(startOfDay(newValue), true),
    }));
  };

  const handleEndDateChange = (newValue) => {
    setFinalDate(newValue);
    setClosedBoxesQuery((state) => ({
      ...state,
      end_date: formatDatePicker(startOfDay(newValue), true),
    }));
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
        <Title>{t("menu.reports") + " " + t("menu.closed_boxes")}</Title>
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

        {/* <Grid item xs={12} md={3} lg={3}>
                    <Input
                        placeholder={t("field.operators")}
                        type="text"
                        styles={{
                            "& .MuiInputBase-input.MuiOutlinedInput-input": {
                                height: "2.4rem",
                            },
                        }}
                        value={operators}
                        onChange={(ev) => setOperators(ev.target.value)}
                    />
                </Grid> */}

        <Grid item xs={12} md={3} lg={3}>
          <Input
            placeholder={"ID " + t("field.point_of_sales")}
            type="text"
            styles={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                height: "2.4rem",
              },
            }}
            value={salespointId}
            onChange={(ev) => setSalespointId(ev.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <Input
            placeholder={"ID " + t("field.sellers")}
            type="text"
            styles={{
              "& .MuiInputBase-input.MuiOutlinedInput-input": {
                height: "2.4rem",
              },
            }}
            value={sellerId}
            onChange={(ev) => setSellerId(ev.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={3} lg={3}>
          <Autocomplete 
            options={gameInstance ?? []}
            disabled={!roomId}
            getOptionLabel={(option) => option.gameName || ''}
            placeholder={t("field.game_instance")+"s"}
            onChange={(event, newValue) => {
                if (newValue) {
                  setClosedBoxesQuery((state) => ({ ...state, game_instance: newValue.id }));
                }
                if (newValue === null) {
                  setClosedBoxesQuery((state) => ({ ...state, game_instance: ''}));
                }
              }}
          />
          {!roomId && (
              <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                  {t("messages.select_room").toUpperCase()}
              </Text>
          )}
        </Grid>

        <Grid
          item
          container
          pl={2}
          mt={1}
          spacing={2}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Grid item xs={12} md={3} lg={3}>
            <PickerDate
              label={t("field.initial_date")}
              value={initialDate}
              size="medium"
              onChange={(newValue) => handleStartDateChange(newValue)}
            />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <PickerDate
              label={t("field.final_date")}
              value={finalDate}
              size="medium"
              onChange={(newValue) => handleEndDateChange(newValue)}
            />
          </Grid>
        </Grid>

        <Grid item container pl={2} mt={1}>
          <Cards data={closedBoxes} />
        </Grid>

        <Grid item container pl={2} mt={1}>
          <Table
            data={closedBoxes}
            query={closedBoxesQuery}
            setQuery={setClosedBoxesQuery}
            isValidating={closedBoxesIsFetching}
            loading={loading}
            error={closedBoxesError}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReportClosedBoxesSpeedBall90;
