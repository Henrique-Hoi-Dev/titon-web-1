import { useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";

import Table from "./table";
import ModalAddDriver from "./modalAddDriver";

const Driver = () => {
  const [showModalDriver, setShowModalDriver] = useState(false);
  
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
    "/drivers", 
    driverQuery
  );

  return (
    <Grid
      container
      justifyContent="center"
      minHeight="88vh"
      padding={1}
      spacing={2}
      m={2}
    >
      <Grid
        item
        container
        mb={5}
        minHeight={'100%'}
        alignItems="flex-start"
        justifyContent="flex-start"
        width={`calc(100% - 50px)`}
      >
        <Grid item container pl={2} mr={4} mt={5} mb={3} justifyContent={"center"}>
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

      <ModalAddDriver 
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
        mutate={mutate}
      />
    </Grid>
  );
};

export default Driver;
