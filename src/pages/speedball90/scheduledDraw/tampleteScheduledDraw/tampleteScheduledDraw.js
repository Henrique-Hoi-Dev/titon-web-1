import { useState } from "react";
import { Grid } from "@mui/material";
import { useGetBingo } from "services/requests/useGet";
import { useTranslation } from "react-i18next";
import { IconAdd, IconArrowLeft } from "components/atoms/icons/icons";
import { useStateValue } from "context/state";
import { useNavigate } from "react-router-dom";

import Title from "components/atoms/title/title";
import Button from "components/atoms/button/button";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Table from "./table";
import ModalAddTemplateScheduleDraw from "./modalAddTemplate/modalAddTemplateScheduleDraw.js.js";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import Text from "components/atoms/text/text";

const TampleteScheduledDraw = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [state] = useStateValue();
  const { roomId } = state
  const [openAddTemplate, setOpenAddTemplate] = useState(false);
  const [gameInstanceId, setGameInstanceId] = useState(null)

  const {
    data: template,
    error: templateError,
    isValidating,
    loading,
    mutate,
  } = useGetBingo(
    "bingo-reports/round/template", 
    { game_instance: gameInstanceId}, 
    gameInstanceId ? false : true
  );

  const {
    data: gameInstance,
  } = useGetBingo(
      "bingo-reports/gameinstance", 
      {room_id: roomId}, 
      roomId ? false : true
  );

  return (
    <Grid
      container
      justifyContent="flex-end"
      alignContent="center"
      minHeight="80vh"
      padding={1}
      spacing={2}
    >
      <ContentHeader>
        <Title>  
          <IconArrowLeft
            sx={{ 
              fontSize: "40px", 
              transform: 'translatey(10px)', 
              mr: 2,
              cursor: 'pointer' 
            }} 
            onClick={() => navigate(-1)}
          /> 
            Template {t("menu.scheduled_draw")}
        </Title>
      </ContentHeader>

      <Grid
        item
        container
        spacing={2}
        mt={2}
        alignItems="flex-start"
        justifyContent="space-between"
      >

        <Grid item xs={8} md={3} lg={3} ml={-7.8}>
          <Autocomplete
            options={gameInstance ?? []}
            disabled={!roomId}
            sx={{ml: 8}}
            getOptionLabel={(option) => option?.nick}
            placeholder={t("field.game_instance")}
            onChange={(event, newValue) => {
              if (newValue) {
                setGameInstanceId(() => newValue.id);
              }
              if (newValue === null) {
                setGameInstanceId(() => null);
              }
            }}
          />
          {!roomId && (
            <Text sx={{ml: "70px"}} type="warning" fontSize={"10px"} center>
              {t("messages.select_room").toUpperCase()}
            </Text>
          )}
        </Grid>

        <Grid container item xs={4} md={4} lg={4} justifyContent="flex-end">
          <Grid item xs={12} md={4} lg={4}>
            <Button 
              disabled={!roomId} 
              sx={{ height: "56px" }} 
              onClick={() => setOpenAddTemplate(true)}
            >
              <IconAdd sx={{ color: "white", fontSize: "40px" }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container pl={2} mt={1}>
        <Table
          data={template}
          isValidating={isValidating}
          loading={loading}
          mutate={mutate}
          error={templateError}
          gameInstanceId={gameInstanceId}
        />
      </Grid>

      {openAddTemplate && (
        <ModalAddTemplateScheduleDraw
          showModal={openAddTemplate}
          setShowModal={setOpenAddTemplate}
          gameInstance={gameInstance}
          mutate={mutate}
        />
      )}
    </Grid>
  );
};

export default TampleteScheduledDraw;
