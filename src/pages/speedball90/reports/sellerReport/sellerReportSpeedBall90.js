import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { startOfDay, format, endOfDay } from "date-fns";
import { useStateValue } from "context/state";
import { IconRefresh } from "components/atoms/icons/icons";

import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import PickerDateTime from "components/atoms/pickerDateTime/pickerDateTime";
import Input from "components/atoms/input/input";
import Table from "./table";
import Cards from "./cards";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";
import Button from "components/atoms/button/button";


const ReportDrawSpeedBall90 = () => {
    const { t } = useTranslation();

    const [state] = useStateValue();
    const { roomId } = state

    const [initialDate, setInitialDate] = useState(
      format(startOfDay(new Date()), "yyyy-MM-dd HH:mm")
    );
    const [finalDate, setFinalDate] = useState(
      format(endOfDay(new Date()), "yyyy-MM-dd HH:mm")
    );
    const [sellerId, setSellerId] = useState("")

    const INITIAL_STATE_QUERY = {
        limit: 25,
        page: 1,
        sort_field: "",
        sort_order: "ASC",
        start_date: initialDate,
        end_date: finalDate,
        seller_id: sellerId,
    };
    const [sellerReportQuery, setSellerReportQuery] = useState(INITIAL_STATE_QUERY);

    const {
      data: sellerReport,
      error: sellerReportError,
      isValidating,
      loading,
      mutate,
    } = useGetBingo(
      "bingo-reports/seller/report", 
      sellerReportQuery, 
      sellerReportQuery.game_instance ? false : true
    );

    const {
      data: gameInstance,
    } = useGetBingo(
        "bingo-reports/gameinstance", 
        {room_id: roomId}, 
        roomId ? false : true
    );

    useEffect(() => {
        setSellerReportQuery((state) => ({
          ...state,
          start_date: initialDate,
          end_date: finalDate,
          seller_id: sellerId,
        }));
    }, [initialDate, finalDate, sellerId]);

    return (
        <Grid
            container
            justifyContent="flex-end"
            minHeight="88vh"
            padding={1}
            spacing={2}
        >
            <ContentHeader>
                <Title>{t("menu.reports") + " " + t("field.sellers")}</Title>
            </ContentHeader>

            <Grid
                item
                container
                spacing={2}
                mt={1}
                mb={1}
                justifyContent="flex-start"
            >

              <Grid item xs={12} md={3} lg={3}>
                <PickerDateTime
                  label={t("field.initial_date")}
                  value={initialDate}
                  size="medium"
                  onChange={(ev) => {
                    setInitialDate(format(ev, "yyyy-MM-dd HH:mm"));
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3} lg={3}>
                <PickerDateTime
                  label={t("field.final_date")}
                  value={finalDate}
                  size="medium"
                  onChange={(ev) => {
                    setFinalDate(format(ev, "yyyy-MM-dd HH:mm"));
                  }}
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
                  getOptionLabel={(option) => option.nick || ''}
                  placeholder={t("field.game_instance")}
                  onChange={(event, newValue) => {
                      if (newValue) {
                        setSellerReportQuery((state) => ({ ...state, game_instance: newValue.id }));
                      }
                      if (newValue === null) {
                        setSellerReportQuery((state) => ({ ...state, game_instance: ''}));
                      }
                    }}
                />
                {!roomId && (
                  <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                    {t("messages.select_room").toUpperCase()}
                  </Text>
                )}
              </Grid>

              <Grid container item xs={12} md={12} lg={12} justifyContent="flex-end">
                <Grid item xs={3} md={1} lg={1} >
                    <Button 
                      disabled={!sellerReportQuery?.game_instance}
                      onClick={() => mutate()}
                    >
                        <IconRefresh
                            sx={{ 
                                color: "#fff",
                                fontSize: "3rem",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "rotate(180deg)",
                                    transition: "all 1s"
                                },
                            
                            }}
                        />
                    </Button>
                </Grid>
              </Grid>

              <Grid item container pl={2} mt={1} >
                  <Cards 
                    data={sellerReport}
                  />
              </Grid>

              <Grid item container pl={2} mt={1}>
                  <Table
                    data={sellerReport}
                    query={sellerReportQuery}
                    setQuery={setSellerReportQuery}
                    isValidating={isValidating}
                    error={sellerReportError}
                    loading={loading}
                    initialDate={initialDate}
                    finalDate={finalDate}
                    gameInstanceId={sellerReportQuery?.game_instance}
                  />
              </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportDrawSpeedBall90;