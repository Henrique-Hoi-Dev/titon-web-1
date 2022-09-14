import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  IconDelete,
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

  const { data, setId, setShowDeleteModal, index } = props;
  const [open, setOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ maxWidth: "1370px" });
  const isMobile = useMediaQuery({ maxWidth: "725px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setId(id);
  };

  return (
    <>
      <SRow key={data.round_id} alternatingcolors={index}>
        <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>
        <SCell>{data.round_id}</SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.round_date}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{moneyMask(data.card_value || [0])}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.line || [0])}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.double_line || [0])}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.bingo || [0])}</SCell>
        <SCell  displaywidth={isMobile ? 1 : 0}>{moneyMask(data.prize_total || [0])}</SCell>
        <SCell minwidth={"70px"}>
          <IconDelete
            sx={{ cursor: "pointer" }}
            onClick={() => handleDelete(data.round_id)}
          />
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
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                      {t("field.date")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {data.round_date}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                      1°{t("field.award")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.line || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                      2°{t("field.award")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.double_line || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                      3°{t("field.award")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.bingo || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                      {t("field.card_value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {moneyMask(data.card_value || [0])}
                      </SCell>
                    </SRow>
                    
                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                      {t("field.prize_total")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {moneyMask(data.prize_total || [0])}
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
