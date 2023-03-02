import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
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
import ModalAction from "../modalCheck/modalAction";
import imgNotFound from "../../../../../assets/trist-not-found-table.svg";

const Table = ({ data, isFetching, mutate, error, loading }) => {
  // const isDesktop = useMediaQuery({ maxWidth: "1400px" });
  const isSmallDesktop = useMediaQuery({ maxWidth: "1100px" });
  const isMobile = useMediaQuery({ maxWidth: "730px" });

  const [showModalAction, setShowModalAction] = useState(false);

  const [checkId, setCheckId] = useState();

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
          {!isFetching && data && data?.dataResult?.freight?.length > 0 && (
            <STableBody border={"true"}>
              {data?.dataResult?.freight?.map((item, i) => (
                <InfoRow
                  key={i}
                  data={item}
                  index={i}
                  setCheckId={setCheckId}
                  setShowModalAction={setShowModalAction}
                />
              ))}
            </STableBody>
          )}
        </STable>

        {(loading || isFetching) && (
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
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
          {data?.dataResult?.freight?.length === 0 && !isFetching && (
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
            >
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
            <Grid
              container
              item
              justifyContent="center"
              alignItems="center"
              pt={5}
            >
              <Text fontSize={"28px"} center>
                ERRO
              </Text>
            </Grid>
          )}
        </Grid>
      </TableContainer>

      <ModalAction
        setShowModal={setShowModalAction}
        showModal={showModalAction}
        checkId={checkId}
        mutate={mutate}
      />
    </>
  );
};

export default Table;
