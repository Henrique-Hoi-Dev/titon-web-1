import { useState } from "react";
import { Grid } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { IconAdd } from "components/atoms/icons/icons";

import Table from "./table";
import Text from "components/atoms/text/text";
// import ModalAddTruck from "./modalAddTruck";
import Title from "components/atoms/title/title";
import Button from "components/atoms/button/button";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import ModalAddFreight from "./modalAddFreight";

const Permission = () => {
  const [showModalNewCheck, setShowModalNewCheck] = useState(false);
  
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
    "/freights", 
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
      sx={{ background: "#FFF", borderRadius: "8px" }}
    >
      <ContentHeader>
        <Title>Permissões fretes</Title>
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
          <Grid container item xs={12} lg={12} mb={12} justifyContent="flex-end">
            <Button 
              sx={{ 
                mr: 3,
                display: "flex",
                alignItems: "flex-end",
                height: "40px", 
                width: "240px", 
                background: "#fff", 
                color: "#000",
                fontWeight: "900",
                "&:hover": {
                  background: "#fff",
                }
              }} 
              onClick={() => setShowModalNewCheck('')}
            >
              Novo Frete <IconAdd sx={{ marginLeft: "5px", color: "#000", fontSize: "30px" }} />
            </Button>
          </Grid>          
        </Grid>

        <Grid item container pl={2} mr={4} mt={5} justifyContent={"center"} width={`calc(100% - 30px)`}>
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
          <Text sx={{ mt: 1, fontWeight: "bold" }}>Foram encontrado {users?.total} Check</Text>
          </Grid>
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

      {showModalNewCheck && (
        <ModalAddFreight 
          mutate={mutate}
          setShowModal={setShowModalNewCheck}
          showModal={showModalNewCheck}
        />
      )}
    </Grid>
  );
};

export default Permission;
