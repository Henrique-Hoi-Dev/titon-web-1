import { useState } from "react";
import { useGet } from "services/requests/useGet";
import { Grid } from "@mui/material";

import Table from "./table";

const FinancialStatement = () => {  
  const INITIAL_STATE_DRIVER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [driverQuery, setDriverQuery] = useState(INITIAL_STATE_DRIVER);

  const {
    data: drivers,
    error: driversError,
    isFetching: driversIsFetching,
    loading, 
    mutate,
  } = useGet(
    "financialStatements", 
    driverQuery
  );

  return (
    <Grid
      container
      justifyContent="center"
      minHeight="88vh"
      padding={1}
      spacing={2}
    >
      <Grid
        item
        container
        mb={5}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid item container mt={5} justifyContent={"center"} mb={3}>
          <Table
            data={drivers}
            query={driverQuery}
            setQuery={setDriverQuery}
            isFetching={driversIsFetching}
            error={driversError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>        
      </Grid>
    </Grid>
  );
};

export default FinancialStatement;
