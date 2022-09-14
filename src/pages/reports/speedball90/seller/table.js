import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";

import Text from "components/atoms/text/text";
import ModalUpdateSaller from "./modalUpdateSeller";
import Loading from "components/atoms/loading/loading";
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
    isValidating, 
    mutate, 
    error, 
    loading, 
    roomId 
  }) => {

  const { t } = useTranslation();

  const isDesktop = useMediaQuery({ maxWidth: "900px" });
  const isMobile = useMediaQuery({ maxWidth: "725px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  const [showModalUpdateSeller, setShowModalUpdateSeller] = useState(false);

  const [sellerId, setSellerId] = useState("");
  const [gameInstanceId, setGameInstanceId] = useState("");

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`,
    }));
    return;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
            <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>{t("menu.info")}</SCell>
              <SCell >
                <SLabel
                  active={query?.sort_field === "id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("id")}
                >
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
                  active={query?.sort_field === "fee"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("fee")}
                >
                  {t("card.seller_fee")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "pin"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("pin")}
                >
                  PIN
                </SLabel>
              </SCell>

              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "room_name"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("room_name")}
                >
                  {t("field.room_name")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "salespoint_name"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("salespoint_name")}
                >
                  {t("field.salespoint_name")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "status"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("status")}
                >
                  {t("field.status")}
                </SLabel>
              </SCell>

              <SCell>
                {t("field.actions")}  
              </SCell>
              
            </SRow>
          </SHead>

          {data && data?.total > 0 && (
            <>
              <STableBody>
                {data?.items.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setSellerId={setSellerId}
                    setGameInstanceId={setGameInstanceId}
                    setShowModalUpdateSeller={setShowModalUpdateSeller}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {loading && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        {data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
          />
        )}

        {(data?.total === 0 || error) && (
          <Grid container justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {t("messages.no_results_found").toUpperCase()}
            </Text>
          </Grid>
        )}
      </TableContainer>

      {showModalUpdateSeller && (
        <ModalUpdateSaller
          showModal={showModalUpdateSeller}
          setShowModal={setShowModalUpdateSeller}
          sellerId={sellerId}
          gameInstanceId={gameInstanceId}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default Table;
