import React, { useEffect, useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import { useMediaQuery } from "react-responsive";

import useDebounce from "hooks/useDebounce";
import { useGetBingo } from "services/requests/useGet";

import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import InfoRow from "./infoRow";

import {
  SCell,
  SHead,
  SLabel,
  SRow,
  STable,
  STableBody,
} from "components/atoms/table/table";

const ModalSellerOut = (
  { 
    showModal, 
    setShowModal, 
    loading, 
    id,
    gameInstanceId,
    startDate,
    endDate 
  }) => {
  const { t } = useTranslation();

  const isDesktopMax = useMediaQuery({ maxWidth: "1400px" });
  const isTabletMax = useMediaQuery({ maxWidth: "910px" });
  const isMobileMax = useMediaQuery({ maxWidth: "610px" });

  const debouncedSellerId = useDebounce(id);
  const debouncedGameInstanceId = useDebounce(gameInstanceId);

  const INITIAL_STATE_QUERY = {
    limit: 20,
    page: 1,
    sort_field: "",
    sort_order: "ASC",
    start_date: startDate,
    end_date: endDate,
    seller_id: debouncedSellerId,
    game_instance: debouncedGameInstanceId
  };
  const [query, setQuery] = useState(INITIAL_STATE_QUERY);

  const { data, error, isValidating } = useGetBingo(
    "bingo-reports/seller/out", query, id >= 0 ? false : true
  );
  
  useEffect(() => {
    setQuery((state) => ({
      ...state,
      start_date: startDate,
      end_date: endDate,
      seller_id: debouncedSellerId,
      game_instance: debouncedGameInstanceId
    }));
    
}, [debouncedSellerId, debouncedGameInstanceId, startDate, endDate]);

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
        <Title>{t("card.paid_value")}</Title>
        </ContentHeader>
        <TableContainer component={Paper} sx={{ marginLeft: "15px" }}>
          <STable>
            <SHead>
              <SRow>
                <SCell displaywidth={isDesktopMax ? 0 : 1}>Info</SCell>
                <SCell>
                  <SLabel
                    active={query?.sort_field === "card_id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("card_id")} 
                  >
                    ID
                  </SLabel>
                </SCell>
                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "paid_date"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("paid_date")} 
                  >
                    {t("field.paid_at")}
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
                <SCell displaywidth={isTabletMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "salespoint_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("salespoint_name")} 
                  >
                    {t("field.salespoint_name")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isTabletMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "paid_seller_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("paid_seller_name")} 
                  >
                    {t("field.sellers")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isTabletMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "prize"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("prize")} 
                  >
                    {t("field.prize")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isDesktopMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "jackpot_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("jackpot_value")} 
                  >
                    {t("field.super_prize")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isDesktopMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "prize_value"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("prize_value")} 
                  >
                    {t("field.value")}
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
          
          {!isValidating && data?.totalPages > 0 && (
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

export default ModalSellerOut;
