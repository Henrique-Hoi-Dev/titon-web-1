import React, { useEffect, useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";

import useDebounce from "hooks/useDebounce";
import { useGetBingo } from "services/requests/useGet";

import { TablePagination } from "components/atoms/tablePagination/tablePagination";

import {
  SCell,
  SHead,
  SLabel,
  SRow,
  STable,
  STableBody,
} from "components/atoms/table/table";
import InfoRow from "./infoRow";

const ModalRoundId = (
  { 
    showModal, 
    setShowModal, 
    loading, 
    id, 
    gameInstanceId 
  }) => {

  const { t } = useTranslation();

  const isDesktopMax = useMediaQuery({ maxWidth: "910px" });
  const isMobileMax = useMediaQuery({ maxWidth: "610px" });

  const debouncedRoundId = useDebounce(id);
  const debouncedGameInstanceId = useDebounce(gameInstanceId);

  const INITIAL_STATE_QUERY = {
    limit: 50,
    page: 1,
    sort_field: "",
    sort_order: "ASC",   
    game_instance: debouncedGameInstanceId,
    round_id: debouncedRoundId,
  };
  const [query, setQuery] = useState(INITIAL_STATE_QUERY);

  const { data, error, isValidating } = useGetBingo(
    "bingo-reports/card", query, id ? false : true
  );

  useEffect(() => {
    setQuery((state) => ({
      ...state,
      round_id: debouncedRoundId,
      game_instance: debouncedGameInstanceId,
    }));
    
  }, [debouncedRoundId, debouncedGameInstanceId]);

  const handleSort = (item) => {
    setQuery((state) => ({
      ...state,
      sort_field: item,
      sort_order: `${query?.sort_order === "ASC" ? "DESC" : "ASC"}`
    }))
    return;
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="div"
    >
      <ContentHeader>
        <Title>{t("menu.draw")}</Title>
        </ContentHeader>
        <TableContainer component={Paper} sx={{ marginLeft: "15px" }}>
          <STable  >
            <SHead>
              <SRow>
                <SCell displaywidth={isDesktopMax ? 0 : 1}>Info</SCell>
                <SCell>
                  <SLabel
                    active={query?.sort_field === "id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("id")} 
                  >
                    ID
                  </SLabel>
                </SCell>
                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "round_id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("round_id")} 
                  >
                    {t("menu.draw")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "device_number"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("device_number")} 
                  >
                    Terminal
                  </SLabel>
                </SCell>
                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "seller_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_name")} 
                  >
                    {t("field.sellers")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("value")} 
                  >
                    {t("field.value")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isDesktopMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "card_numbers"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("card_numbers")} 
                  >
                    {t("field.numbers")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isDesktopMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "date"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("date")} 
                  >
                    {t("field.date")}
                  </SLabel>
                </SCell>
              </SRow>
            </SHead>
            {!isValidating && data && data?.items?.length > 0 && (
              <STableBody>
                {data?.items?.map((item, index) => (
                  <InfoRow
                    key={index}
                    data={item}
                    index={index}
                  />
                ))}
              </STableBody>
            )}
          </STable>

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
          
          {!isValidating && data?.total_pages > 0 && (
            <TablePagination
              data={data}
              query={query}
              setQuery={setQuery}
            />
          )}
        </TableContainer>
    </Modal>
  );
};

export default ModalRoundId;
