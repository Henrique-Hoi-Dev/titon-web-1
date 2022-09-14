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

const ModalSellerEntries = (
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
  const { data } = useGetBingo("bingo-reports/seller/entries", query, id ? false : true);

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
        <Title>{t("card.seller_entry")}</Title>
        </ContentHeader>
        <TableContainer component={Paper} sx={{ marginLeft: "15px" }}>
          <STable>
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
                    active={query?.sort_field === "device_id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("device_id")} 
                  >
                    ID {t("field.device")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isMobileMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "collector_id"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("collector_id")} 
                  >
                    ID {t("field.collector")}
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
                    active={query?.sort_field === "room_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("room_name")} 
                  >
                    {t("field.room_name")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isTabletMax ? 1 : 0}>
                  <SLabel
                    active={query?.sort_field === "seller_name"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("seller_name")} 
                  >
                    {t("field.seller_name")}
                  </SLabel>
                </SCell>
                <SCell displaywidth={isDesktopMax ? 1 : 0}>
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
                    active={query?.sort_field === "date"}
                    direction={query?.sort_order?.toLowerCase()}
                    onClick={() => handleSort("date")} 
                  >
                    {t("field.date")}
                  </SLabel>
                </SCell>
              </SRow>
            </SHead>
      
            {data && data?.items?.length > 0 && (
              <STableBody>
                {data?.items.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                  />
                ))}
              </STableBody>
            )}
          </STable>

          {data ? loading :  (
            <Loading />
          )}

          {data?.totalPages > 0 && (
            <TablePagination
              data={data}
              query={query}
              setQuery={setQuery}
            />
          )}

          {data?.total === 0 && (
            <Grid container justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.no_results_found").toUpperCase()}
              </Text>
            </Grid>
          )}
        </TableContainer>
    </Modal>
  );
};

export default ModalSellerEntries;
