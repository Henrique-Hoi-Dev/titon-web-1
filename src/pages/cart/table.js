import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import { useMediaQuery } from "react-responsive";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
  SLabel
} from "components/atoms/table/table"

import InfoRow from "./infoRow";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalDeleteCart from "./modalDeleteCart";
import ModalUpdateCart from "./modalUpdateCart";

const Table = (
  { 
    data,
    query, 
    setQuery, 
    isFetching, 
    mutate, 
    error, 
    loading 
  }) => {

  const { t } = useTranslation();

  const isDesktop = useMediaQuery({ maxWidth: "1120px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [cartId, setCartId] = useState(null)

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
      <TableContainer component={Paper} sx={{ maxWidth: "1420px" }}>
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isDesktop ? 0 : 1}>Info</SCell>
              <SCell>
                <SLabel
                  active={query?.sort_field === "cart_brand"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_brand")}
                >
                  Marca
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_models"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_models")}
                >
                  Modelo
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_brand"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_brand")}
                >
                  Placa
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_color"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_color")}
                >
                  Cor
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_tara"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_tara")}
                >
                  Tara
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_bodywork"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_bodywork")}
                >
                  Tipo Carreta
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_chassis"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_chassis")}
                >
                  Chassi
                </SLabel>
              </SCell>
              <SCell displaywidth={isMobile ? 1 : 0}>
                <SLabel
                  active={query?.sort_field === "cart_year"}
                  direction={query?.sort_order?.toLowerCase()}
                  onClick={() => handleSort("cart_year")}
                >
                  Ano Fabricação
                </SLabel>
              </SCell>
              <SCell displaywidth={isDesktop ? 1 : 0}>Ações</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.length > 0 && (
            <>
              <STableBody>
                {data.dataResult.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setCartId={setCartId}
                    setShowModalDelete={setShowModalDelete}
                    setShowModalUpdate={setShowModalUpdate}
                  />
                ))}
              </STableBody>
            </>
          )}
        </STable>

        {(loading || isFetching) && (
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

          {(data?.total === 0) && !isFetching && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                {t("messages.no_results_found").toUpperCase()}
              </Text>
            </Grid>
          )}

          {(data?.total === 0) && !data && !isFetching && (
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
        </Grid>

        {!isFetching && data?.totalPages > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
          />
        )}
      </TableContainer>   

      {showModalDelete && (
        <ModalDeleteCart 
          setShowModal={setShowModalDelete}
          showModal={showModalDelete}
          props={cartId}
          mutate={mutate}
        />
      )}

      {showModalUpdate && (
        <ModalUpdateCart 
          setShowModal={setShowModalUpdate}
          showModal={showModalUpdate}
          props={cartId}
          mutate={mutate}
        />
      )}
    </>

  );
};

export default Table;
