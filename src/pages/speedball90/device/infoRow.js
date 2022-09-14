import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import Button from "components/atoms/button/button";
import { IconEdit } from "components/atoms/icons/icons";
import { useStateValue } from "context/state";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  PointIcon
} from "components/atoms/icons/icons";

import {
  SCell,
  SRow,
  STable,
  STableBody,
  SCellTwoHead,
} from "components/atoms/table/table";

const InfoRow = (props) => {
  const { t } = useTranslation();

  const [state] = useStateValue();
  const { roomId } = state;

  const { data, index, setShowModalUpdate, setGameInstance, setDeviceId } = props;
  const [open, setOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ maxWidth: "1175px" });
  const isMobile = useMediaQuery({ maxWidth: "772px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "550px" });

  const openUpdateModal = (gameInstance, deviceId) => {
    setShowModalUpdate(true)
    setGameInstance(gameInstance)
    setDeviceId(deviceId)
  }

  return (
    <>
      <SRow key={data.id} alternatingcolors={index} >
        <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>
        <SCell>{data.id}</SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.number}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{data.room_id}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.room_name}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{data.salespoint_id}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.salespoint_name}</SCell>
        <SCell><PointIcon color={data?.status ? "#2ECC71" : "#E74C3C"}/></SCell>
        <SCell> 
          <Button 
            disabled={!roomId}
            onClick={() => openUpdateModal(data.game_instance_id, data.id)}
            sx={{width: "40px"}}
          > 
           <IconEdit />
          </Button>
        </SCell>
      </SRow>

      <SRow 
        displaywidth={isDesktop ? 0 : 1} 
        sx={{ backgroundColor: "white" }}>
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <STableBody>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallMobile ? 0 : 1}>
                         {t("field.number")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                      {data.number}
                      </SCell>
                    </SRow> 

                     <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                         {"ID " + t("field.room")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                      {data.room_id}
                      </SCell>
                    </SRow> 

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                         {t("field.room")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                      {data.room_name}
                      </SCell>
                    </SRow> 

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                         {"ID " + t("field.salespoint_name")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                     {data.salespoint_id}
                      </SCell>
                    </SRow> 

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                         {t("field.salespoint_name")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                     {data.salespoint_name}
                      </SCell>
                    </SRow> 
                  </STableBody>
                </Box>
              </STable>
            </Box>
          </Collapse>
        </SCell>
      </SRow>
    </>
  );
};

export default InfoRow;
