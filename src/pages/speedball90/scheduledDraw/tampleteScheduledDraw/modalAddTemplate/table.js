import React from "react";
import { Grid, Paper, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import InfoRow from "./infoRow";

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
    gameInstanceId,
    loading,
    setDraw
  }) => {

  const { t } = useTranslation();
  
  const isDesktop = useMediaQuery({ maxWidth: "910px" });
  const isMobile = useMediaQuery({ maxWidth: "610px" });
  const isSmallMobile = useMediaQuery({ maxWidth: "430px" });

  return (
    <TableContainer component={Paper}>
      <STable>
        <SHead>
          <SRow>
            <SCell minwidth={"0px"} displaywidth={isDesktop ? 0 : 1}>{t("menu.info")}</SCell>
            <SCell>
              {t("field.time")}
            </SCell>
            <SCell>
              {t("field.card_value")}
            </SCell>
            <SCell displaywidth={isSmallMobile ? 1 : 0}>
              1°{t("field.award")}
            </SCell>
            <SCell displaywidth={isMobile ? 1 : 0}>
              2°{t("field.award")}
            </SCell>
            <SCell displaywidth={isMobile ? 1 : 0}>
              3°{t("field.award")}
            </SCell>
            <SCell displaywidth={isDesktop ? 1 : 0}>
              {t("field.type_of_draw")}
            </SCell>
            <SCell displaywidth={isDesktop ? 1 : 0} minwidth={"70px"}>
              {t("field.auto_increment")} 
            </SCell>
            <SCell minwidth={"70px"}>
              {t("field.actions")}  
            </SCell>
          </SRow>
        </SHead>
        {!isValidating && data?.length > 0 && (
          <STableBody>
            {data?.map((item, index) => (
              <InfoRow
                key={index}
                data={item}
                index={index}
                setDraw={setDraw}
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

        {(data?.length === 0) && (
          <Grid item justifyContent="center" alignItems="center" pt={5}>
            <Text fontSize={"28px"} center>
              {t("messages.there_are_no_sweepstakes").toUpperCase()}
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
  );
};

export default Table;
