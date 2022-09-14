import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useStateValue } from "context/state";

import Button from "components/atoms/button/button";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  IconEdit,
  PointIcon,
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

  const { data, setSalespointId, setGameInstanceId, setShowModalUpdateSalespoint, index } = props;

  const [open, setOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ maxWidth: "900px" });
  const isMobile = useMediaQuery({ maxWidth: "725px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  const openUpdateModal = (id, gameInstanceId) => {
    setShowModalUpdateSalespoint(true);
    setSalespointId(id);
    setGameInstanceId(gameInstanceId)
  };

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
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
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.name}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.room_name}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {<PointIcon color={data?.status ? "#2ECC71" : "#E74C3C"}/>}
        </SCell>
        <SCell>
          <Button
              disabled={!roomId}
              onClick={() => openUpdateModal(data.id, data.game_instance_id)}
              sx={{width: "40px"}}
          > 
            <IconEdit />
          </Button>
        </SCell>
      </SRow>

      <SRow sx={{ backgroundColor: "white" }} displaywidth={isDesktop ? 0 : 1}>
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
                        {t("field.seller_name")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {data.name}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("field.game_instance")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {data.room_name}
                      </SCell>
                    </SRow>
                    
                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                      {t("field.status")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {<PointIcon color={data?.status ? "#2ECC71" : "#E74C3C"}/>}
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
