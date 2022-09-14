import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalSellerEntries from "./modalSellerEntries/modalSellerEntries";
import ModalSellerIn from "./modalSellerIn/modalSellerIn";
import ModalSellerNotPaid from "./modalSellerNotPaid/modalSellerNotPaid";
import ModalSellerOut from "./modalSellerOut/modalSellerOut";
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
    initialDate, 
    finalDate,
    isValidating,
    error, 
    loading,
    gameInstanceId 
  }) => {
    
  const { t } = useTranslation();

  const [showModalSellerEntries, setShowModalSellerEntries] = useState(false);
  const [showModalSellerIn, setShowModalSellerIn] = useState(false);
  const [showModalSellerOut, setShowModalSellerOut] = useState(false);
  const [showModalSellerNotPaid, setShowModalSellerNotPaid] = useState(false);

  const [sellerId, setSellerId] = useState("");

  const isDesktop = useMediaQuery({ maxWidth: "1370px" });
  const isMobile = useMediaQuery({ maxWidth: "910px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

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
                <SCell displaywidth={isDesktop ? 0 : 1}>
                  {t("menu.info")}
                </SCell>

                <SCell>
                  <SLabel
                    active={query?.sort_field === "id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("id")} >
                    ID
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("name")} 
                  >
                    {t("field.seller_name")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "room_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("room_name")}
                  >
                    {t("field.game_instance")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "salespoint_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("salespoint_name")} 
                  >
                      {t("field.salespoint_name")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "seller_entry"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_entry")}
                  >
                    {t("card.seller_entry")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "paid_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("paid_value")}
                  >
                    {t("card.paid_value")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "in_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("in_value")}
                  >
                    {t("card.in_value")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isMobile ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "not_paid_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("not_paid_value")}
                  >
                    {t("card.not_paid_value")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "room_id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("room_id")}
                  >
                    ID {t("field.room")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "seller_fee"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_fee")}
                  >
                    {t("card.seller_fee")}
                  </SLabel>
                </SCell>

                <SCell displaywidth={isDesktop ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "balance"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("balance")}
                  >
                    {t("card.balance")}
                  </SLabel>
                </SCell>
              </SRow>
            </SHead>
            {!isValidating && data && data?.total > 0 && (
              <STableBody>
                {data?.items?.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setSellerId={setSellerId}
                    setShowModalSellerEntries={setShowModalSellerEntries}
                    setShowModalSellerIn={setShowModalSellerIn}
                    setShowModalSellerOut={setShowModalSellerOut}
                    setShowModalSellerNotPaid={setShowModalSellerNotPaid}
                  />
                ))}
              </STableBody>
            )}
          </STable>
        )}

        {(loading || isValidating) && gameInstanceId  && (
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
        
        {!isValidating && data?.total > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
            labelRowsPerPage={t("components.line_per_page")}
          />
        )}
      </TableContainer>

      {showModalSellerEntries && (
          <ModalSellerEntries 
            showModal={showModalSellerEntries} 
            setShowModal={setShowModalSellerEntries}
            loading={loading}
            id={sellerId}
            gameInstanceId={gameInstanceId}
            startDate={initialDate}
            endDate={finalDate}
          />
        )
      }

      {showModalSellerIn && (
          <ModalSellerIn 
            showModal={showModalSellerIn} 
            setShowModal={setShowModalSellerIn}
            loading={loading}
            id={sellerId}
            gameInstanceId={gameInstanceId}
            startDate={initialDate}
            endDate={finalDate}
          />
        )
      }

      {showModalSellerNotPaid && (
          <ModalSellerNotPaid
            showModal={showModalSellerNotPaid} 
            setShowModal={setShowModalSellerNotPaid}
            loading={loading}
            id={sellerId}
            gameInstanceId={gameInstanceId}
            startDate={initialDate}
            endDate={finalDate}
          />
        )
      }

      {showModalSellerOut && (
          <ModalSellerOut 
            showModal={showModalSellerOut} 
            setShowModal={setShowModalSellerOut}
            loading={loading}
            id={sellerId}
            gameInstanceId={gameInstanceId}
            startDate={initialDate}
            endDate={finalDate}
          />
        )
      }
    </>
  );
};

export default Table;
