import { useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";

import Table from "./table";
import ModalAddTruck from "./modalAddTruck";

const Truck = () => {
  const [showModalDriver, setShowModalDriver] = useState(false);
  
  const INITIAL_STATE_USER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [userQuery, setUserQuery] = useState(INITIAL_STATE_USER);

  const {
    data: users,
    error: usersError,
    isFetching: usersIsFetching,
    loading, 
    mutate,
  } = useGet(
    "trucks", 
    userQuery
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
            data={users}
            query={userQuery}
            setQuery={setUserQuery}
            isFetching={usersIsFetching}
            error={usersError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>        
      </Grid>

      <ModalAddTruck 
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
        mutate={mutate}
      />
    </Grid>
  );
};

export default Truck;
