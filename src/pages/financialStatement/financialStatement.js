import { useEffect, useState } from "react";
import { useGet } from "services/requests/useGet";
import { Grid } from "@mui/material";
import { InputSearches } from "components/atoms/input/inputSearches/input";

import Table from "./table";

const FinancialStatement = () => {
  const INITIAL_STATE_FINANCIAL = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
    status: false,
  };

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
        <Grid item container mt={5} justifyContent={"center"} mb={3}>
          <Table
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
    </Grid>
  );
};

export default FinancialStatement;
