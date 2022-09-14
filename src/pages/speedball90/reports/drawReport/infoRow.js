import React, { Fragment, useState } from "react";
import { Box, Collapse, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { moneyMask } from "utils/masks";
import { ArrowDownIcon, ArrowUpIcon, ExpandListIcon } from "components/atoms/icons/icons"
import { Item } from "components/atoms/paper/paper";


import {
  SCell,
  SRow,
  STable,
  SCellTwoHead,
} from "components/atoms/table/table";

const InfoRow = (props) => {
  const { t } = useTranslation();
  
  const { data, index, setRoundtId, setShowModalTickets, setShowModal } = props;

  const [open, setOpen] = useState(false);

  const isDesktopMax = useMediaQuery({ maxWidth: "1710px" });
  const isTabletMax = useMediaQuery({ maxWidth: "930px" });
  const isMobileMax = useMediaQuery({ maxWidth: "620px" });

  function opeModalTickets(id) {
    setShowModalTickets(true);
    setRoundtId(id);
  };

  function opeModal(id) {
    setShowModal(true);
    setRoundtId(id);
  };
  
    return ( 
      <Fragment>
        <SRow sx={{ '& > *': { borderBottom: 'unset' } }} alternatingcolors={index} >
          <SCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </IconButton>
          </SCell>

          <SCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => opeModal(data.round_id)}
            >
              <ExpandListIcon /> 
            </IconButton>
          </SCell>
          <SCell>{data?.round_id}</SCell>
          <SCell displaywidth={isMobileMax ? 1 : 0}>{data.date_formated}</SCell>
          <SCell displaywidth={isMobileMax ? 1 : 0}>{data.room_name}</SCell>
          <SCell displaywidth={isTabletMax ? 1 : 0}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => opeModalTickets(data.round_id)}
            >
              <ExpandListIcon /> 
            </IconButton>
            {data.tickets}
          </SCell>

          <SCell displaywidth={isTabletMax ? 1 : 0}>
            {moneyMask(data.card_value || [0])}
          </SCell>

          <SCell displaywidth={isTabletMax ? 1 : 0}>
            {moneyMask(data.canceled) || [0]}
          </SCell>

          <SCell displaywidth={isTabletMax ? 1 : 0}>
            {moneyMask(data.guaranteed_total)}
          </SCell>

          <SCell displaywidth={isTabletMax ? 1 : 0}>
            {moneyMask(data.seller_fee || [0])}
          </SCell>

          <SCell displaywidth={isDesktopMax ? 1 : 0}>
            {moneyMask(data.sold_total || [0])}
          </SCell>  

          <SCell displaywidth={isDesktopMax ? 1 : 0}>
           {moneyMask(data.balance_total || [0])}
          </SCell>  

          <SCell displaywidth={isDesktopMax ? 1 : 0}>
            {moneyMask(data.jackpot || [0])}
          </SCell>  

          <SCell displaywidth={isDesktopMax ? 1 : 0}>
            {moneyMask(data.line || [0])}
          </SCell>  

          <SCell displaywidth={isDesktopMax ? 1 : 0}>
            {moneyMask(data.double_line || [0])}
          </SCell>  

          <SCell displaywidth={isDesktopMax ? 1 : 0}>
            {moneyMask(data.bingo || [0])}
          </SCell>  
        </SRow>
       
        <SRow sx={{ backgroundColor: "white" }}>
          <SCell style={{ paddingBottom: 0, paddingTop: 0, border: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 4 }}>
                <STable aria-label="purchases" >
                  <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end" }}>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobileMax ? 0 : 1}>
                        {t("field.date")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isMobileMax ? 0 : 1}>
                        {data.date_formated}
                      </SCell>      
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isMobileMax ? 0 : 1}>
                        {t("field.game_instance")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isMobileMax ? 0 : 1}>
                        {data.room_name}
                      </SCell>      
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isTabletMax ? 0 : 1}>
                        {t("field.tickets")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isTabletMax ? 0 : 1}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => opeModalTickets(data.round_id)}
                        >
                          <ExpandListIcon /> 
                        </IconButton>
                          {data.tickets}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isTabletMax ? 0 : 1}>
                        {t("field.card_value")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isTabletMax ? 0 : 1}>
                        {moneyMask(data.card_value || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isTabletMax ? 0 : 1}>
                        {t("field.canceled")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isTabletMax ? 0 : 1}>
                        {moneyMask(data.canceled || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isTabletMax ? 0 : 1}>
                        {t("card.guaranteed_total")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isTabletMax ? 0 : 1}>
                        {moneyMask(data.guaranteed_total || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isTabletMax ? 0 : 1}>
                        {t("card.seller_fee")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isTabletMax ? 0 : 1}>
                        {moneyMask(data.seller_fee || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        {t("card.sold_total")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isDesktopMax ? 0 : 1}>
                        {moneyMask(data.sold_total || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        {t("card.balance_total")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isDesktopMax ? 0 : 1}>
                        {moneyMask(data.balance_total || [0])} 
                      </SCell>
                    </SRow> 

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                      {t("field.super_prize")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isDesktopMax ? 0 : 1} >
                        {moneyMask(data.jackpot || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>      
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        1°{t("field.award")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isDesktopMax ? 0 : 1}>
                        {moneyMask(data.line || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        2°{t("field.award")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isDesktopMax ? 0 : 1}>
                        {moneyMask(data.double_line || [0])}
                      </SCell>
                    </SRow>

                    <SRow sx={{ backgroundColor: "white" }}>
                      <SCellTwoHead displaywidth={isDesktopMax ? 0 : 1}>
                        3°{t("field.award")}
                      </SCellTwoHead>
                      <SCell minwidth={"170px"} displaywidth={isDesktopMax ? 0 : 1}>
                        {moneyMask(data.bingo || [0])}
                      </SCell>                
                    </SRow>
                  </Box>
                </STable>
                <Box sx={{ display: "flex", flexWrap: "wrap", margin: "15px" }}>
                  {data.balls?.map((num) => (
                    <Item 
                      elevation={6}
                      key={num.ball_id}
                      sx={{ background: 
                        (num.prize === 3 && "red") || 
                        (num.prize === 4 && "blue") ||
                        (num.prize === 2 && "green")
                      }}
                    >
                      {num.ball_number}
                    </Item> 
                  ))}  
                </Box>
              </Box>
            </Collapse>
          </SCell>
        </SRow>
      </Fragment>
    );
};

export default InfoRow;
