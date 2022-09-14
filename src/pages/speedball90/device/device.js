import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { useStateValue } from "context/state";

import { IconAdd } from "components/atoms/icons/icons";
import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import SelectComponent from "components/atoms/select/select";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Button from "components/atoms/button/button";
import Table from "./table";
import ModalAddDevice from "./modalAddDevice";
import ModalUpdateDevice from "./modalUpdateDevice";
import Text from "components/atoms/text/text";

const Device = () => {
    const { t } = useTranslation();

    const [state] = useStateValue();
    const { roomId } = state;

    const [salespointId, setSalespointId] = useState(null)
    const [gameInstanceId, setGameInstanceId] = useState(null)
    const [updateInstanceId, setUpdateInstanceId] = useState(null)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [deviceUpdateId, setDeviceUpdateId] = useState(null)
    const [status, setStatus] = useState(null)

    const statusFilter = [
        {value: true, name: t("field.activated")}, 
        {value: false, name: t("field.disabled")}
    ]

    const INITIAL_STATE_QUERY = {
        limit: 25,
        page: 1,
        sort_field: null,
        sort_order: "ASC",
        game_instance: gameInstanceId,
        salespoint_id: null,
        status: null
    };
    const [deviceQuery, setDeviceQuery] = useState(INITIAL_STATE_QUERY);

    const {
        data: device,
        error: deviceError,
        isValidating,
        loading,
        mutate,
    } = useGetBingo("bingo-reports/device", deviceQuery);

    const {
        data: gameinstance,
    } = useGetBingo(
        "bingo-reports/gameinstance", 
        {room_id: roomId}, 
        roomId ? false : true
    );

    const {
        data: salespoint,
    } = useGetBingo(
        "bingo-reports/salespoint", 
        {game_instance: gameInstanceId}, 
        gameInstanceId ? false : true
    );

    useEffect(() => {
        setDeviceQuery((state) => ({
            ...state,
            game_instance: gameInstanceId,
            salespoint_id: salespointId,
            status: status
        }));
    }, [gameInstanceId, salespointId, status]); 

    return (
        <Grid
            container
            justifyContent="flex-end"
            minHeight="88vh"
            padding={1}
            spacing={2}
        >
            <ContentHeader>
                <Title>{t("menu.device")}</Title>
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
                        options={gameinstance ?? []}
                        disabled={!roomId}
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
                   <Autocomplete 
                        options={salespoint?.items ?? []}
                        getOptionLabel={(option) => option.name}
                        placeholder={t("field.salespoint_name")+"s"}
                        onChange={(event, newValue) => {
                            setSalespointId(newValue?.id);
                        }}
                   />
                </Grid>

                <Grid item xs={12} md={3} lg={3}>
                    <SelectComponent 
                        setFilterValue={setStatus}
                        options={statusFilter}
                        placeholder={t("field.status")}
                    />
                </Grid>

                <Grid container item xs={12} md={3} lg={3} justifyContent="flex-end">
                    <Grid item xs={3} md={6} lg={6}>
                        <Button sx={{ height: "56px" }} onClick={() => setShowModalAdd(true)}>
                        <IconAdd sx={{ color: "white", fontSize: "40px" }} />
                        </Button>
                    </Grid>
                </Grid>

                <Grid item container pl={2} mt={1}>
                    <Table
                        data={device}
                        query={deviceQuery}
                        setQuery={setDeviceQuery}
                        setShowModalUpdate={setShowModalUpdate}
                        setDeviceId={setDeviceUpdateId}
                        setGameInstance={setUpdateInstanceId}
                        isValidating={isValidating}
                        loading={loading}
                        error={deviceError}
                    />
                </Grid>
            </Grid>

            {showModalUpdate && (
                <ModalUpdateDevice 
                    showModal={showModalUpdate} 
                    setShowModal={setShowModalUpdate} 
                    salespoint={salespoint} 
                    mutate={mutate}
                    deviceId={deviceUpdateId}
                    gameInstanceId={updateInstanceId}
                    gameinstance={gameinstance}
                />
            )}
            
            {showModalAdd && (
                <ModalAddDevice 
                    showModal={showModalAdd} 
                    setShowModal={setShowModalAdd} 
                    gameinstance={gameinstance}
                    salespoint={salespoint}
                    mutate={mutate}
                    roomId={roomId}
                />
            )}
        </Grid>
    );
};

export default Device;