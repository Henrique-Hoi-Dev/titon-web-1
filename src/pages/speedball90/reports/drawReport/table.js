import React, { Fragment, useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalWinnersRoundId from "./modalWinnersRoundId/modalWinnersRoundId";
import ModalRoundId from "./modalRoundId/modalRoundId";
import InfoRow from "./infoRow";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel,
} from "components/atoms/table/table";

const Table = (
  { 
    data, 
    query, 
    setQuery,
    loading, 
    isValidating,
    error, 
    gameInstanceId 
  }) => {

  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);
  const [showModalTickets, setShowModalTickets] = useState(false);

  const [roundtId, setRoundtId] = useState("");

  const isDesktopMax = useMediaQuery({ maxWidth: "1710px" });
  const isTabletMax = useMediaQuery({ maxWidth: "930px" });
  const isMobileMax = useMediaQuery({ maxWidth: "620px" });

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
        {gameInstanceId && (
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

                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "room_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("room_name")}
                  >
                    {t("field.game_instance")}
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
            {(!isValidating && data && data?.totalPages > 0) && (
              <STableBody>
                {data?.items?.map((item, index) => (
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
        )}

        {(loading || isValidating) && gameInstanceId && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading titulo={t("messages.loading")}/>
          </Grid>
        )}

        <Grid
          item
          container
          spacing={2}
          mt={1}
          mb={1}
          alignItems="center"
          flexWrap="nowrap"
          justifyContent="center"
        > 

          {(data?.total === 0 || !data) && gameInstanceId && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.no_results_found").toUpperCase()}
              </Text>
            </Grid>
          )}

          {error && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.unknown_error").toUpperCase()}
              </Text>
            </Grid>
          )}

          {!gameInstanceId && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.select_game_instance").toUpperCase()}
              </Text>
            </Grid>
          )}
        </Grid>
        
        {!isValidating && data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
            labelRowsPerPage={t("components.line_per_page")}
          />
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
