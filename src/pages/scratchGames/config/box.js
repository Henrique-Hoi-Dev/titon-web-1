import React from "react";
import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
// import { formatDate } from "utils/formatDate";
// import { moneyMask } from "utils/masks";
import { TablePagination } from "components/atoms/tablePagination/tablePagination";
import Text from "components/atoms/text/text";
import Loading from "components/atoms/loading/loading";
import {
  SCell,
  SHead,
  SRow,
  STable,
  STableBody,
} from "components/atoms/table/table";

const Boxs = ({ data, query, setQuery, isValidating, mutate, error, loading }) => {
  const { t } = useTranslation();
  return (
      <Grid container >
        {data && data?.items?.length > 0 && (
          <>
            <Grid item container pl={2} mt={1} justifyContent="center">
              {data.items.map((item) => (
                <Grid item key={item.id}>
                  <Box sx={{
                    width: 800,
                    height: 250,
                    border: "2px solid #c4c4c4",
                    marginBottom: "4rem"
                    }} >
                    <STable>
                      <SHead>
                        <SRow >
                            <SCell>
                            {t("menu.scratch_games")}
                          </SCell>
                        </SRow>
                      </SHead>
                      <STableBody>
                        <SRow>
                          <SCell>
                            {item.id}
                          </SCell>
                        </SRow>
                      </STableBody>
                    </STable>
                  </Box>
                  <Box sx={{
                    width: 800,
                    height: 250,
                    border: "2px solid #c4c4c4",
                    marginBottom: "4rem"
                    }}>
                    <STable>
                      <SHead>
                        <SCell>
                          {t("menu.scratch_games")}
                        </SCell>
                      </SHead>
                      <STableBody>
                        <SRow>
                          <SCell>
                            {item.id}
                          </SCell>
                        </SRow>
                      </STableBody>
                    </STable>
                  </Box>
                </Grid>
              ))}  
            </Grid>
          </>
        )}

        {(loading || isValidating) && (
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

          {(data?.totalPages === 0 || !data) && (
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

        {data?.items.length > 0 && (
          <TablePagination
            data={data}
            query={query}
            setQuery={setQuery}
          />
        )}
      </Grid>
  );
};

export default Boxs;
