import React, { Fragment, useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";

import ModalWinnersRoundId from "./modalWinnersRoundId/modalWinnersRoundId";
import ModalRoundId from "./modalRoundId/modalRoundId";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from "components/atoms/table/table";
import InfoRow from "./infoRow";

const Table = (
  { 
    data, 
    query, 
    setQuery, 
    isValidating, 
    mutate, 
    error, 
    loading,
    gameInstanceId 
  }) => {

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [showModalTickets, setShowModalTickets] = useState(false);

  const [roundtId, setRoundtId] = useState("");

  const isDesktopMax = useMediaQuery({ maxWidth: "1710px" });
  const isTabletMax = useMediaQuery({ maxWidth: "930px" });
  const isMobileMax = useMediaQuery({ maxWidth: "500px" });

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`
    }))
    return;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
              <SCell>
                {t("menu.info")}
              </SCell>

              <SCell>
                {t("field.all_rounds")}
              </SCell>

              <SCell>
                <SLabel
                  active={query?.sort_field === "round_id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("round_id")} >
                  ID {t("menu.draw")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isMobileMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "date_formated"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("date_formated")} >
                  {t("field.date")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isTabletMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "tickets"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("tickets")} >
                  {t("field.tickets")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isTabletMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "card_value"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("card_value")} >
                  {t("field.card_value")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isTabletMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "canceled"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("canceled")}
                >
                {t("field.canceled")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isTabletMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "guaranteed_total"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("guaranteed_total")} >
                  {t("card.guaranteed_total")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isTabletMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "seller_fee"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("seller_fee")}
                >
                {t("card.seller_fee")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktopMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "sold_total"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("sold_total")}
                >
                {t("card.sold_total")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktopMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "balance_total"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("balance_total")}
                >
                {t("card.balance_total")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktopMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "jackpot"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("jackpot")}
                >
                {t("field.super_prize")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktopMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "line"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("line")}
                >
                1°{t("field.award")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktopMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "double_line"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("double_line")}
                >
                2°{t("field.award")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktopMax ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "bingo"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("bingo")}
                >
                3°{t("field.award")}
                </SLabel>
              </SCell>
            </SRow>
          </SHead>
          {data && data?.total > 0 && (
            <STableBody>
              {data?.items.map((item, index) => (
                <InfoRow
                  key={index}
                  data={item}
                  index={index}
                  setRoundtId={setRoundtId}
                  setShowModalTickets={setShowModalTickets}
                  setShowModal={setShowModal}
                />
              ))}
            </STableBody>
          )}
        </STable>
        
        {loading && data && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        {data?.total > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
          />
        )}

        {(data?.total === 0 || error || !data) && (
          <Grid container justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {t("messages.no_results_found").toUpperCase()}
            </Text>
          </Grid>
        )}
      </TableContainer>

      {showModalTickets && (
          <ModalRoundId 
            showModal={showModalTickets} 
            setShowModal={setShowModalTickets}
            loading={loading}
            id={roundtId}
            gameInstanceId={gameInstanceId}
          />
        )
      }

      {showModal && (
        <ModalWinnersRoundId
            showModal={showModal} 
            setShowModal={setShowModal}
            loading={loading}
            id={roundtId}
            gameInstanceId={gameInstanceId}
          />
        )   
      }
    </>
  );
};

export default Table;
