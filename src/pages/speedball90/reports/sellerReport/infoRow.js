import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ExpandListIcon,
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
  
  const { 
    data, 
    index, 
    setSellerId,
    setShowModalSellerEntries,
    setShowModalSellerIn,
    setShowModalSellerOut,
    setShowModalSellerNotPaid
  } = props;

  const [open, setOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ maxWidth: "1370px" });
  const isMobile = useMediaQuery({ maxWidth: "910px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  function opeModalEntries(id) {
    setShowModalSellerEntries(true);
    setSellerId(id);
  };

  function opeModalIn(id) {
    setShowModalSellerIn(true);
    setSellerId(id);
  };

  function opeModalNotPaid(id) {
    setShowModalSellerNotPaid(true);
    setSellerId(id);
  };

  function opeModalOut(id) {
    setShowModalSellerOut(true);
    setSellerId(id);
  };

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
        <SCell displaywidth={isSmallMobile ? 1 : 0}>
          {data.name}
        </SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.room_name}</SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.salespoint_name}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => opeModalEntries(data.id)}
          >
            <ExpandListIcon /> 
          </IconButton>
            {moneyMask(data.seller_entry || [0])}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => opeModalOut(data.id)}
          >
            <ExpandListIcon /> 
          </IconButton>
            {moneyMask(data.paid_value || [0])}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => opeModalIn(data.id)}
          >
            <ExpandListIcon /> 
          </IconButton>
            {moneyMask(data.in_value || [0])}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => opeModalNotPaid(data.id)}
          >
            <ExpandListIcon /> 
          </IconButton>
            {moneyMask(data.not_paid_value || [0])}
        </SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{data.room_id}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.seller_fee || [0])}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.balance || [0])}</SCell>
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
                        {t("field.seller_name")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {data.name}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallMobile ? 0 : 1}>
                        {t("field.game_instance")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {data.room_name}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallMobile ? 0 : 1}>
                        {t("field.salespoint_name")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {data.salespoint_name}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("card.seller_entry")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalEntries(data.id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {moneyMask(data.seller_entry || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("card.paid_value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalOut(data.id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {moneyMask(data.paid_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("card.in_value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalIn(data.id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {moneyMask(data.in_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("card.not_paid_value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalNotPaid(data.id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {moneyMask(data.not_paid_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        ID {t("field.room")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {data.room_id}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("card.seller_fee")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.seller_fee || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("card.balance")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.balance)}
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
