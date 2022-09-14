import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
// import { templateContext } from "components/templates/main/main";
import { useMediaQuery } from "react-responsive";
import Text from "components/atoms/text/text";
import ModalDeleteScheduleDraw from "./modalDeleteScheduleDraw";
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
    list, 
    error, 
    gameInstanceId,
    loading
  }) => {

  const { t } = useTranslation();
  
  const isDesktop = useMediaQuery({ maxWidth: "1370px" });
  const isMobile = useMediaQuery({ maxWidth: "725px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [id, setId] = useState("");

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
                  active={query?.sort_field === "round_id"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("round_id")}
                >
                  ID
                </SLabel>
              </SCell>

              <SCell displaywidth={isSmallMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "round_date"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("round_date")}
                >
                  {t("field.date")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "card_value"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("card_value")}
                >
                  {t("field.card_value")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "line"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("line")}
                >
                  1°{t("field.award")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "double_line"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("double_line")}
                >
                  2°{t("field.award")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isDesktop ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "bingo"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("bingo")}
                >
                  3°{t("field.award")}
                </SLabel>
              </SCell>

              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "prize_total"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("prize_total")}
                >
                  {t("field.prize_total")}
                </SLabel>
              </SCell>

              <SCell minwidth={"70px"}>
                <SLabel hideSortIcon onClick={() => handleSort("date")}>
                  {t("modal.delete")}
                </SLabel>
              </SCell>
            </SRow>
          </SHead>

          {data && list?.length > 0 && (
            <>
              <STableBody>
                {list?.map((item, index) => (
                  <InfoRow
                    data={item}
                    index={index}
                    setId={setId}
                    setShowDeleteModal={setShowDeleteModal}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {(loading && data) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
          </Grid>
        )}

        {/* {data?.rounds?.length > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
            allowRowsPerPage
          />
        )} */}

        {(list?.length === 0 || !data?.msg || error) && (
          <Grid container justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {t("messages.no_results_found").toUpperCase()}
            </Text>
          </Grid>
        )}

        {(data && data?.msg) && (
          <Grid container justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {data?.msg.toUpperCase()}
            </Text>
          </Grid>
        )}
      </TableContainer>


      {showDeleteModal && (
        <ModalDeleteScheduleDraw
          open={showDeleteModal}
          onClose={setShowDeleteModal}
          id={id}
          mutate={mutate}
          gameInstanceId={gameInstanceId}
        />
      )}
    </>
  );
};

export default Table;
