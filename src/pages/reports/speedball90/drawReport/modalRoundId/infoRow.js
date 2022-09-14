import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import { ArrowDownIcon, ArrowUpIcon  } from "components/atoms/icons/icons"


import {
  SCell,
  SRow,
  STable,
  SCellTwoHead,
} from "components/atoms/table/table";

const InfoRow = (props) => {
  const { t } = useTranslation();

  const { data,  index } = props;

  const [open, setOpen] = useState(false);

  const isDesktopMax = useMediaQuery({ maxWidth: "910px" });
  const isMobileMax = useMediaQuery({ maxWidth: "610px" });

    return (  
      <>
        <SRow sx={{ '& > *': { borderBottom: 'unset' } }} alternatingcolors={index}>
          <SCell displaywidth={isDesktopMax ? 0 : 1}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconButton>
          </SCell>
          <SCell>{data.id}</SCell>
          <SCell displaywidth={isMobileMax ? 1 : 0}>{data.round_id}</SCell>
          <SCell displaywidth={isMobileMax ? 1 : 0}>{data.device_number}</SCell>
          <SCell displaywidth={isMobileMax ? 1 : 0}>{data.seller_name}</SCell>
          <SCell displaywidth={isMobileMax ? 1 : 0}>{moneyMask(data.value)}</SCell>
          <SCell displaywidth={isDesktopMax ? 1 : 0}>{data.card_numbers}</SCell>
          <SCell displaywidth={isDesktopMax ? 1 : 0}>{data.date}</SCell>
        </SRow>
       
        <SRow 
          displaywidth={isDesktopMax ? 0 : 1}
          sx={{ backgroundColor: "white" }}>
          <SCell style={{ paddingBottom: 0, paddingTop: 0, border: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 4 }}>
                <STable aria-label="purchases" >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>

                    <SRow sx={{ 
                        display: "flex", 
                        flexDirection: "column",
                        maxWidth: "300px",
                        backgroundColor: "white" 
                      }}>
                      <SCellTwoHead  displaywidth={isMobileMax ? 0 : 1}>
                        {t("menu.draw")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobileMax ? 0 : 1}>
                        {data.round_id}
                      </SCell>
                    </SRow>

                    <SRow sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        maxWidth: "300px",
                        backgroundColor: "white" 
                      }}>
                      <SCellTwoHead displaywidth={isMobileMax ? 0 : 1}>
                        Terminal
                      </SCellTwoHead>
                      <SCell displaywidth={isMobileMax ? 0 : 1}>
                        {data.device_number}
                      </SCell>
                    </SRow>

                    <SRow sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        maxWidth: "300px",
                        backgroundColor: "white" 
                      }}> 
                      <SCellTwoHead displaywidth={isMobileMax ? 0 : 1}>
                        {t("field.value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobileMax ? 0 : 1}>
                        {moneyMask(data.value)}
                      </SCell>
                    </SRow>

                    <SRow sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        maxWidth: "300px",
                        backgroundColor: "white" 
                      }}>
                      <SCellTwoHead  displaywidth={isMobileMax ? 0 : 1}>
                        {t("field.sellers")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobileMax ? 0 : 1}>
                        {data.seller_name}
                      </SCell>
                    </SRow>

                    <SRow sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        maxWidth: "300px",
                        backgroundColor: "white"
                      }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        {t("field.numbers")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktopMax ? 0 : 1}>
                        {data.card_numbers}
                      </SCell>
                    </SRow>

                    <SRow sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        maxWidth: "300px",
                        backgroundColor: "white"
                      }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        {t("field.date")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktopMax ? 0 : 1}>
                        {data.date}
                      </SCell>
                    </SRow>

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
