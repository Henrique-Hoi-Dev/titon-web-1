import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import { ArrowDownIcon, ArrowUpIcon } from "components/atoms/icons/icons";
import {
  SCell,
  SRow,
  STable,
  STableBody,
  SCellTwoHead,
} from "components/atoms/table/table";

const InfoRow = (props) => {
  const { t } = useTranslation();

  const { data, index } = props;

  const [open, setOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ maxWidth: "1700px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1425px" });
  const isMobile = useMediaQuery({ maxWidth: "800px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "590px" });

  return (
    <>
      <SRow key={data.seller_id} alternatingcolors={index}>
        <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>
        <SCell>{data.seller_id}</SCell>
        <SCell minwidth={"0px"}>{data.seller_name}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          {moneyMask(data.seller_fee || [0])}
        </SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>{data.seller_pin}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {moneyMask(data.in_value || [0])}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {moneyMask(data.paid_value || [0])}
        </SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>
          {moneyMask(data.not_paid_value || [0])}
        </SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {moneyMask(data.balance || [0])}
        </SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {moneyMask(data.entry_credit || [0])}
        </SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>
          {moneyMask(data.entry_debit || [0])}
        </SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.start_date}</SCell>
        <SCell displaywidth={isSmallMobile ? 1 : 0}>{data.end_date}</SCell>
      </SRow>

      <SRow sx={{ backgroundColor: "white" }}>
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
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("field.sellers")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {moneyMask(data.seller_pin || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("card.seller_fee")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {moneyMask(data.seller_fee || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        {t("card.in_value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                        {moneyMask(data.in_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        {t("field.paid")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                        {moneyMask(data.paid_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        {t("card.not_paid_value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                        {moneyMask(data.not_paid_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("field.balance")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.balance || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("card.entry_credit")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.entry_credit || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("card.entry_debit")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.entry_debit || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallMobile ? 0 : 1}>
                      {t("field.initial_date")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {data.start_date || [0]}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallMobile ? 0 : 1}>
                      {t("field.final_date")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallMobile ? 0 : 1}>
                        {data.end_date || [0]}
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
