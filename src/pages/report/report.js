import { useEffect, useState } from "react";
import { useGet } from "services/requests/useGet";
import { Grid } from "@mui/material";
import { InputSearches } from "components/atoms/input/inputSearches/input";
import { IconAdd } from "components/atoms/icons/icons";

import TableCheck from "./table";
import Button from "components/atoms/button/button";

export const Report = () => {
  const INITIAL_STATE_FINANCIAL = {
    limit: 10,
    page: 1,
    sort_field: "id",
    sort_order: "ASC",
    status: false,
  };
  const [showModalReport, setShowModalReport] = useState(false);

  const [financialQuery, setFinancialQuery] = useState(INITIAL_STATE_FINANCIAL);
  const [search, setSearch] = useState("");

  const {
    data: financials,
    error: financialsError,
    isFetching: financialIsFetching,
    loading,
    mutate,
  } = useGet("financialStatements", financialQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFinancialQuery((state) => ({
        ...state,
        search: search,
      }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Grid
      container
      justifyContent="center"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <Grid item container pl={2} mr={4} mt={-6.5} justifyContent={"flex-end"}>
        <Button
          onClick={() => setShowModalReport(true)}
          background={
            "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
          }
          sx={{
            fontSize: "14px",
            color: "white",
            width: "228px",
            height: "40px",
            marginRight: "15px",
          }}
        >
          Emitir Relatório <IconAdd sx={{ mt: -0.7 }} />
        </Button>
        <InputSearches
          searches
          searchesType={"searches"}
          styles={{ minWidth: "350px" }}
          placeholder={"Nome, placa..."}
          onChange={(ev) => setSearch(ev.target.value)}
        />
      </Grid>
      <Grid
        item
        container
        mb={5}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <TableCheck
          data={financials}
          query={financialQuery}
          setQuery={setFinancialQuery}
          isFetching={financialIsFetching}
          error={financialsError}
          loading={loading}
          mutate={mutate}
        />
      </Grid>
    </Grid>
  );
};
