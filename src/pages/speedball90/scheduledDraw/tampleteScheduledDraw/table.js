import React, { useState } from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import InfoRow from "./infoRow";
import ModalDeleteTemplateScheduleDraw from "./modalDeleteTemplateScheduleDraw";

import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
} from "components/atoms/table/table";

const Table = (
  { 
    data, 
    isValidating,
    error, 
    loading, 
    gameInstanceId, 
    mutate
  }) => {

  const { t } = useTranslation();

  // const isDesktop = useMediaQuery({ maxWidth: "900px" });
  // const isMobile = useMediaQuery({ maxWidth: "725px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "475px" });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [id, setId] = useState("");

  return (
    <>
      <TableContainer component={Paper}>
        {gameInstanceId && (
          <STable>
            <SHead>
              <SRow>
              <SCell minwidth={"0px"}>{t("menu.info")}</SCell>
                <SCell >ID</SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  Template {t("field.name")}
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  {t("field.number_of_sweepstakes")}
                </SCell>

                <SCell displaywidth={isSmallMobile ? 1 : 0}>
                  {t("field.actions")}
                </SCell>
                
              </SRow>
            </SHead>
            {!isValidating && data && (
              <STableBody>
                {data?.map((item, index) => (
                  <InfoRow
                    key={item.id}
                    data={item}
                    index={index}
                    setId={setId}
                    setShowDeleteModal={setShowDeleteModal}
                  />
                ))}
              </STableBody>
            )}
          </STable>
        )}
        
        {(loading && isValidating) && gameInstanceId && (
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

          {(!data) && gameInstanceId && (
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
      </TableContainer>

      {showDeleteModal && (
        <ModalDeleteTemplateScheduleDraw
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
