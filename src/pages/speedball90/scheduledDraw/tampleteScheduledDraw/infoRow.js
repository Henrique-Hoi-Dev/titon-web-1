import React, { useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
// import { useMediaQuery } from "react-responsive";
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
  // SCellTwoHead,
  SHead,
} from "components/atoms/table/table";

const InfoRow = (props) => {
  const { t } = useTranslation();
  const { data, index, setShowDeleteModal, setId } = props;

  const [open, setOpen] = useState(false);

  // const isDesktop = useMediaQuery({ maxWidth: "900px" });
  // const isMobile = useMediaQuery({ maxWidth: "725px" });
  // const isSmallMobile = useMediaQuery({ maxWidth: "475px" });
  
  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setId(id);
  };

  const renderScheduledType = (type) => {
    switch (type) {
      case 0:
        return t("field.rounds");
      case 1:
        return t("field.special_rounds");
      case 2:
        return t("field.super_special_rounds");
      default:
        return "";
    }
  }

  return (
    <>
      <SRow key={data.id} alternatingcolors={index}>
        <SCell minwidth={"0px"}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
          </IconButton>
        </SCell>
        <SCell>{data.id}</SCell>
        <SCell>{data.nick}</SCell>
        <SCell>{data.rounds?.length}</SCell>
        <SCell minwidth={"70px"}>
          <IconDelete
            sx={{ cursor: "pointer" }}
            onClick={() => handleDelete(data.id)}
          />
        </SCell>
      </SRow>

      <SRow sx={{ backgroundColor: "white" }} >
        <SCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4 }}>
              <STable aria-label="purchases">
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                      <STable>
                        <SHead>
                          <SRow>
                            <SCell>
                              {t("field.time")}
                            </SCell>
                            <SCell>
                              {t("field.card_value")}
                            </SCell>
                            <SCell>
                              1°{t("field.award")}
                            </SCell>
                            <SCell>
                              2°{t("field.award")}
                            </SCell>
                            <SCell>
                              3°{t("field.award")}
                            </SCell>
                            <SCell>
                              {t("field.type_of_draw")}
                            </SCell>
                          </SRow>
                        </SHead>
                        <STableBody>
                        {data.rounds?.map((round, index) => (
                          <SRow key={index} alternatingcolors={0}>
                            <SCell>
                              {round.time}
                            </SCell>
                            <SCell>
                              {moneyMask(round.card_value || [0])}
                            </SCell>
                            <SCell>
                              {moneyMask(round.line || [0])}
                            </SCell>
                            <SCell>
                              {moneyMask(round.double_line || [0])}
                            </SCell>
                            <SCell>
                              {moneyMask(round.bingo || [0])}
                            </SCell>
                            <SCell>
                              {renderScheduledType(round.type)} 
                            </SCell>
                          </SRow>
                        ))}
                        </STableBody>
                      </STable>
                  {/* <STableBody>      
                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead >
                        {t("field.seller_name")}
                      </SCellTwoHead>
                      <SCell >
                        {data.rounds?.day_of_week}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead >
                        {t("field.game_instance")}
                      </SCellTwoHead>
                      <SCell >
                        {data.rounds?.time}
                      </SCell>
                    </SRow>
                    
                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead >
                      {t("field.status")}
                      </SCellTwoHead>
                      <SCell >
                        {data.rounds?.card_value}
                      </SCell>
                    </SRow>
                  </STableBody> */}
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
