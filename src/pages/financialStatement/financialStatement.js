import { useEffect, useState } from "react";
import { Collapse, Grid, List, ListItemButton } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { IconAdd, IconSearch } from "components/atoms/icons/icons";

import Title from "components/atoms/title/title";
import Input from "components/atoms/input/input";
import Table from "./table";
import Button from "components/atoms/button/button";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Text from "components/atoms/text/text";
import ModalAddFinancial from "./modalAddFinancial";

const FinancialStatement = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [userId, setUserId] = useState(null);

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
    "/financialStatements", 
    driverQuery
  );

  useEffect(() => {
    setDriverQuery((state) => ({
      ...state,
      userId: userId,
    }));
  }, [userId]);

  return (
    <Grid
      container
      justifyContent="center"
      minHeight="88vh"
      padding={1}
      spacing={2}
      m={2}
      sx={{ background: "#FFF", borderRadius: "8px" }}
    >
      <ContentHeader>
        <Title>Fichas Motoristas</Title>
      </ContentHeader>

      <Grid
        item
        container
        mb={5}
        minHeight={'100%'}
        alignItems="flex-start"
        justifyContent="flex-start"
        width={`calc(100% - 50px)`}
        sx={{ background: "#000", borderRadius: "8px" }}
      >
        <Grid item container pl={2} spacing={1} mb={-4}>
          <Grid container item xs={12} md={1.5} lg={1.5} mb={1} justifyContent="flex-start">
            <Button
              sx={{
                display: "flex",
                alignItems: "flex-end",
                height: "40px", 
                width: "140px", 
                background: "#fff",
                color: "#000",
                fontWeight: "900",
                "&:hover": {
                  background: "#fff",
                }
              }} 
              onClick={handleClick}
            >
              Pesquisar <IconSearch sx={{ marginLeft: "10px", color: "#000", fontSize: "25px" }} />
            </Button>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ width: "300px" }}>
                  <Input
                    placeholder={"Motoristas"}
                    type="text"
                    styles={{
                      "& .MuiInputBase-input.MuiOutlinedInput-input": {
                        height: "1.4rem",
                      },
                    }}
                    value={userId ?? ''}
                    onChange={(ev) => setUserId(ev.target.value)}
                  />                    
                </ListItemButton>
              </List>
            </Collapse>
          </Grid>

          <Grid container item xs={12} md={1} lg={1.2} mb={1.2} justifyContent="flex-start">
            <Button 
              sx={{ 
                display: "flex",
                alignItems: "flex-end",
                height: "40px", 
                width: "140px", 
                background: "#fff", 
                color: "#000",
                fontWeight: "900",
                "&:hover": {
                  background: "#fff",
                }
              }} 
              onClick={() => setShowModalDriver(true)}
            >
              Novo <IconAdd sx={{ marginLeft: "5px", color: "#000", fontSize: "30px" }} />
            </Button>
          </Grid>          
        </Grid>

        <Grid item container pl={2} mr={4} mt={5} justifyContent={"center"} maxWidth={"1135px"} mb={3}>
          <Grid 
            item 
            container 
            pl={2} 
            spacing={1} 
            mb={-2}
            width={`calc(100% - 140px)`}
            height={"50px"}
            sx={{ background: "#a6a6a6", borderRadius: "8px" }}
          >
          <Text sx={{ mt: 1, fontWeight: "bold" }}>Foram encontrado {drivers?.total} Fichas</Text>
          </Grid>
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

      <ModalAddFinancial 
        setShowModal={setShowModalDriver}
        showModal={showModalDriver}
        mutate={mutate}
      />
    </Grid>
  );
};

export default FinancialStatement;
