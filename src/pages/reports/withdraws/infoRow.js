import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import { formatDate } from "utils/formatDate";
import {
  ArrowDownIcon,
  ArrowUpIcon,
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

  const { data, index } = props;

  const [open, setOpen] = useState(false);
  
  const isDesktop = useMediaQuery({ maxWidth: "1250px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

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
        <SCell displaywidth={isMobile ? 1 : 0}>{data.roomid}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{data.userid}</SCell>
        <SCell displaywidth={isSmallDesktop ? 1 : 0}>{moneyMask(data.value || [0])}</SCell>
        <SCell displaywidth={isDesktop ? 1 : 0}>{formatDate(data.date)}</SCell>
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
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        ID {t("field.room")} 
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        {data.roomid}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        ID {t("menu.user")} 
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                        {data.userid}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isSmallDesktop ? 0 : 1}>
                        {t("field.value")}
                      </SCellTwoHead>
                      <SCell displaywidth={isSmallDesktop ? 0 : 1}>
                          {moneyMask(data.value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        {t("field.withdraw_date")}
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {data.date}
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
