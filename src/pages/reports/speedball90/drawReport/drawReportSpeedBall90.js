import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { endOfDay, format, startOfDay } from "date-fns";
import { useStateValue } from "context/state";

import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import PickerDateTime from "components/atoms/pickerDateTime/pickerDateTime";
import Table from "./table";
import Cards from "./cards";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";

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
    };
    const [drawReportQuery, setDrawReportQuery] = useState(INITIAL_STATE_QUERY);

    const {
        data: drawReport,
        error: drawReportError,
        isFetching: drawReportIsFetching,
        loading,
        // mutate,
    } = useGetBingo(
        "bingo-reports/round/done", 
        drawReportQuery, 
        drawReportQuery.game_instance ? false : true
    );

    useEffect(() => {
        setDrawReportQuery((state) => ({
            ...state,
            start_date: initialDate,
            end_date: finalDate,
        }));
    }, [initialDate, finalDate]);

    return (
        <Grid
            container
            justifyContent="flex-end"
            minHeight="88vh"
            padding={1}
            spacing={2}
        >
            <ContentHeader>
                <Title>{t("menu.reports") + " " + t("menu.draw")}</Title>
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
                    <Autocomplete 
                    options={gameInstance ?? []}
                    disabled={!roomId}
                    getOptionLabel={(option) => option.gameName || ''}
                    placeholder={t("field.game_instance")+"s"}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            setDrawReportQuery((state) => ({ ...state, game_instance: newValue.id }));
                        }
                        if (newValue === null) {
                            setDrawReportQuery((state) => ({ ...state, game_instance: ''}));
                        }
                        }}
                    />
                    {!roomId && (
                        <Text sx={{ml: "8px"}} type="warning" fontSize={"10px"} center>
                            {t("messages.select_room").toUpperCase()}
                        </Text>
                     )}
                </Grid>
                
                <Grid item container pl={2} mt={1} >
                    <Cards 
                        data={drawReport}
                    />
                </Grid>

                <Grid item container pl={2} mt={1}>
                    <Table
                        data={drawReport}
                        query={drawReportQuery}
                        setQuery={setDrawReportQuery}
                        isValidating={drawReportIsFetching}
                        loading={loading}
                        error={drawReportError}
                        gameInstanceId={drawReportQuery?.game_instance}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportDrawSpeedBall90;