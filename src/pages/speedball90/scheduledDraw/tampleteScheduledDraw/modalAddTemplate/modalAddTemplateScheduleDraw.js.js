import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useBingoCreate } from "services/requests/useCreate";
import { successNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import CreateTemplate from "./createTemplate";

const ModalAddTemplate = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
  }) => {

  const { t } = useTranslation();

  const listDraw = JSON.parse(localStorage.getItem('drawList'))

  function handleTimestamp(time) {
    const [hrs, min] = time?.split(':');
    const newTime = new Date(0)

    newTime.setHours(hrs);
    newTime.setMinutes(min);

    return Math.abs(newTime?.getTime());
  }

  const ascListDraw = listDraw?.sort((a,b) => handleTimestamp(b.time) - handleTimestamp(a.time) )

  const [fetch, setFetch] = useState(false);
  const [draw, setDraw] = useState(ascListDraw ?? [])
  const [data, setData] = useState({});

  const {
    data: template,
    error: errorTemplate,
    isFetching,
  } = useBingoCreate(
    "/bingo-reports/round/template/create", 
    data,
    fetch, 
    setFetch
  );

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  useEffect(() => {
    setData((state) => ({
      ...state,
      rounds: draw
    }))
  }, [draw]);

  useEffect(() => {
    if (template || errorTemplate) {
      mutate();
      onClose();
    }
    if (template) {
      successNotification(t("messages.success_msg"));
      localStorage.setItem("drawList", JSON.stringify([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [template, errorTemplate]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxHeight={"600px"}
      maxWidth="900px"
    >
      <ContentHeader>
        <Title>
          {t("modal.create") + " " + t("menu.draw")+"s"} Template
        </Title>
        <Text type="" fontSize={"15px"} center>
          {t("messages.number_of_draws_added")} {draw?.length}
        </Text> 
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={2}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >

          <Grid item xs={6} md={3} lg={3} mt={-2}>
            <Text sx={{ ml: 1 }}>Template {t("field.name")}</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.7rem",
                },
              }}
              value={data?.nick ?? ""}
              onChange={(ev) =>
                setData((state) => ({
                  ...state,
                  nick: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item container pl={2} mb={7} mt={-6}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
              <CreateTemplate
                drawProps={draw}
                setDraw={setDraw}
              />  
            </Box>
          </Grid>
        </Grid>
      )}

      <Grid 
        container
        item 
        spacing={2} 
        alignContent={"center"}
        justifyContent={"center"}
        sx={{ 
          position: "sticky",
          bottom: 0, 
          background: "white",
          height: "60px",
        }}
      >
        <Grid item xs={6} md={6} lg={6} sx={{ height: "63px", background: "white", }}>
          <Button variant="return" onClick={() => onClose()} sx={{ width: "90%", marginLeft: "20px" }}>
            {t("button.return")}
          </Button>
        </Grid>

        <Grid item xs={6} md={6} lg={6} sx={{ height: "63px", background: "white", }}>
          <Button type="submit" sx={{ width: "90%", marginLeft: "20px" }}>
            Finalize
          </Button>
        </Grid>   
      </Grid>

      {isFetching && <Loading titulo={t("messages.loading")}/>}
    </Modal>
  );
};

export default ModalAddTemplate;
