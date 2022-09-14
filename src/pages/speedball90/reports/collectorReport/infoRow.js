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
    setCollectorId,
    setShowModalCollectorIn,
    setShowModalCollectorOut
  } = props;

  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery({ maxWidth: "610px" });
  const isMobile = useMediaQuery({ maxWidth: "475px" });

  function opeModalIn(id) {
    setShowModalCollectorIn(true);
    setCollectorId(id);
  };

  function opeModalOut(id) {
    setShowModalCollectorOut(true);
    setCollectorId(id);
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

        <SCell>{data.collector_id}</SCell>
        <SCell>{data.collector_name}</SCell>
        <SCell displaywidth={isMobile ? 1 : 0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => opeModalIn(data.collector_id)}
          >
            <ExpandListIcon /> 
          </IconButton>
            {moneyMask(data.in_value || [0])}
        </SCell>

        <SCell displaywidth={isMobile ? 1 : 0}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => opeModalOut(data.collector_id)}
          >
            <ExpandListIcon /> 
          </IconButton>
            {moneyMask(data.out_value || [0])}
        </SCell>

        <SCell displaywidth={isDesktop ? 1 : 0}>{moneyMask(data.total || [0])}</SCell>
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
                        {t("field.contribution")}  
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalIn(data.collector_id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {moneyMask(data.in_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobile ? 0 : 1}>
                        {t("field.bleed")}
                      </SCellTwoHead>
                      <SCell displaywidth={isMobile ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalOut(data.collector_id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {moneyMask(data.out_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktop ? 0 : 1}>
                        Total
                      </SCellTwoHead>
                      <SCell displaywidth={isDesktop ? 0 : 1}>
                        {moneyMask(data.total || [0])}
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
