import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { IconAdd } from "components/atoms/icons/icons";
import { InputSearches } from "components/atoms/input/inputSearches/input";

import Table from "./table";
import ModalAddTruck from "./modalAddTruck";
import Button from "components/atoms/button/button";

const Truck = () => {
  const [showModalDriver, setShowModalDriver] = useState(false);
  
  const INITIAL_STATE_USER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [truckQuery, setTruckQuery] = useState(INITIAL_STATE_USER);
  const [search, setSearch] = useState('')

  const {
    data: trucks,
    error: trucksError,
    isFetching: trucksIsFetching,
    loading, 
    mutate,
  } = useGet(
    "trucks", 
    truckQuery
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTruckQuery((state) => ({
        ...state,
        search: search,
      }))    
    }, 1200); 
  
    return () => clearTimeout(timer);
  }, [search])

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
        pl={2} 
        mr={4} 
        mt={-6.5} 
        justifyContent={"flex-end"}
      >
        <Button 
          onClick={() => setShowModalDriver(true)}
          background={"linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"}
          sx={{
            fontSize: "14px",
            color: "white",
            width: "228px",
            height: "40px",
            marginRight: "15px",
          }}
        >
          Adicionar Caminhão <IconAdd sx={{ mt: -0.7 }} />
        </Button>
        <InputSearches
          searches
          searchesType={"searches"}
          styles={{ minWidth: "350px"}}
          placeholder={"Nome, placa..."}
          onChange={(ev) => setSearch(ev.target.value)}
        />   
      </Grid>
      <Grid
        item
        container
        mt={-20}
        mb={5}
        minHeight={'100%'}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Grid item container pl={2} mr={4} mt={5} mb={3} justifyContent={"center"}>
          <Table
            data={trucks}
            query={truckQuery}
            setQuery={setTruckQuery}
            isFetching={trucksIsFetching}
            error={trucksError}
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
