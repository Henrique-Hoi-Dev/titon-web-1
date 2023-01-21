import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
} from "components/atoms/table/table";

import InfoRow from "./infoRow";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import ModalAction from "./modalAction";
import imgNotFound from "../../../../assets/trist-not-found-table.svg";
const Table = ({
  data,
  query,
  setQuery,
  isFetching,
  mutate,
  error,
  loading,
}) => {
  const { t } = useTranslation();

  // const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const [showModalAction, setShowModalAction] = useState(false);

  const [checkId, setCheckId] = useState(null);

  return (
    <>
      <TableContainer component={Paper}>
        <STable>
          <SHead>
            <SRow>
              <SCell displaywidth={isMobile ? 1 : 0}>Status</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Final Frete</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Local Atual</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Data Atual</SCell>
              <SCell displaywidth={isSmallDesktop ? 1 : 0}>Frete Bruto</SCell>
            </SRow>
          </SHead>
          {!isFetching && data && data?.dataResult?.freigth?.length > 0 && (
            <STableBody>
              {data?.dataResult?.freigth?.map((item, index) => (
                <InfoRow
                  key={item.id}
                  data={item}
                  index={index}
                  setCheckId={setCheckId}
                  setShowModalAction={setShowModalAction}
                  query={query}
                  setQuery={setQuery}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {(loading || isFetching) && (
          <Grid container justifyContent="center" alignItems="center" mt={3}>
            <Loading />
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
          {data?.dataResult?.freigth?.length === 0 && !isFetching && (
            <Grid item justifyContent="center" alignItems="center" pt={5}>
              <Text fontSize={"28px"} center>
                RESULTADO NÃO ENCONTRADO...{" "}
                <img
                  src={imgNotFound}
                  alt="img"
                  width={"30px"}
                  style={{
                    verticalAlign: "unset",
                    marginLeft: "20px",
                  }}
                />
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
      </TableContainer>

      {showModalAction && (
        <ModalAction
          setShowModal={setShowModalAction}
          showModal={showModalAction}
          checkId={checkId}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default Table;
