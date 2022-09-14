import { useGet } from "services/requests/useGet";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Input from "components/atoms/input/input";
import Boxs from "./box";

const ReportSettingsScratchGames = () => {
  const { t } = useTranslation();

  const INITIAL_STATE_SCRATCHGAMES = {
    limit: 1,
    page: 1,
    sort_field: "",
    sort_order: "ASC",
    gameCounter: null,
  };

  const [scratchGamesQuery, setScratchGamesQuery] = useState(INITIAL_STATE_SCRATCHGAMES);

  const {
    data: scratchGames,
    error: scratchGamesError,
    isFetching: scratchGamesIsFetching,
    loading,
    mutate
  } = useGet("report/scratchhistory", scratchGamesQuery);

  return (
    <Grid
      container
      justifyContent="flex-end"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <ContentHeader>
        <Title>{t("menu.settings") + " " + t("menu.scratch_games")}</Title>
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
        <Grid item xs={12} md={3} lg={3} >
            <Input
                placeholder={t("field.room")}
                type="text"
                styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        height: "2.4rem",
                    },
                }}
                // value={roomId}
                // onChange={(ev) => setRoomId(ev.target.value)}
            />
        </Grid>
        <Grid item xs={12} md={3} lg={3} >
            <Input
                placeholder={"Game " + t("field.name")}
                type="text"
                styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        height: "2.4rem",
                    },
                }}
                // value={roomId}
                // onChange={(ev) => setRoomId(ev.target.value)}
            />
        </Grid>
        <Grid item container pl={2} mt={1}>
          <Boxs 
            data={scratchGames}
            query={scratchGamesQuery}
            setQuery={setScratchGamesQuery}
            isValidating={scratchGamesIsFetching}
            error={scratchGamesError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ReportSettingsScratchGames;