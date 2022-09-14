import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { useStateValue } from "context/state";

import useDebounce from "hooks/useDebounce";

import Title from "components/atoms/title/title";
import Input from "components/atoms/input/input";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import SelectComponent from "components/atoms/select/select";
import Table from "./table";
import Cards from "./cards";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";

const ReportOpenBoxesSpeedBall90 = () => {
    const { t } = useTranslation();

    const [state] = useStateValue();
    const { roomId } = state
    
    // const [operators, setOperators] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [filterDate, setFilterDate] = useState(null);
    
    const debouncedsellerId = useDebounce(sellerId);

    const fixedFilter = [
        { value: "total", name: "Total" },
        { value: "daily", name: "Daily" },
        { value: "previous", name: "Previous" }
    ]

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
        filter_date: filterDate,
        seller_id: debouncedsellerId,
    };
    const [openBoxesQuery, setOpenBoxesQuery] = useState(INITIAL_STATE_QUERY);

    const {
        data: openBoxes,
        error: openBoxesError,
        isFetching: openBoxesIsFetching,
        loading,
        // mutate,
    } = useGetBingo(
        "bingo-reports/report/register/open", 
        openBoxesQuery,
        openBoxesQuery?.game_instance ? false : true
    );

    useEffect(() => {
        setOpenBoxesQuery((state) => ({
            ...state,
            filter_date: filterDate,
            seller_id: debouncedsellerId,
        }));
    }, [filterDate, debouncedsellerId]);

    return (
        <Grid
            container
            justifyContent="flex-end"
            minHeight="88vh"
            padding={1}
            spacing={2}
        >
            <ContentHeader>
                <Title>{t("menu.reports") + " " + t("menu.open_boxes")}</Title>
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
                   <SelectComponent 
                        setFilterValue={setFilterDate}
                        options={fixedFilter}
                        placeholder={t("field.filters")}
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
                                setOpenBoxesQuery((state) => ({ ...state, game_instance: newValue.id }));
                            }
                            if (newValue === null) {
                                setOpenBoxesQuery((state) => ({ ...state, game_instance: ''}));
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
                        data={openBoxes}
                    />
                </Grid>

                <Grid item container pl={2} mt={1}>
                    <Table
                        data={openBoxes}
                        query={openBoxesQuery}
                        setQuery={setOpenBoxesQuery}
                        isValidating={openBoxesIsFetching}
                        loading={loading}
                        error={openBoxesError}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ReportOpenBoxesSpeedBall90;