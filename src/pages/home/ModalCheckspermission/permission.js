import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useGet } from "services/requests/useGet";

import Table from "./table";
import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Modal from "components/molecules/modal/modal";
import Text from "components/atoms/text/text";

const Permission = (
  {
    showModal,
    setShowModal,
    financialId
  }) => {
  
  const INITIAL_STATE_USER = {
    limit: 10,
    page: 1,
    sort_field: null,
    sort_order: "ASC",
  };

  const [userQuery, setUserQuery] = useState(INITIAL_STATE_USER);

  const {
    data: financial,
    error: financialError,
    isFetching: financialIsFetching,
    loading, 
    mutate,
  } = useGet(
    `user/financialStatement/${financialId.id}`, 
    [],
    financialId ? false : true
  );

  const onClose = () => {
    setShowModal(false)
  }

  // console.log("id", financial)

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      maxWidth="870px"
    >
      <ContentHeader>
        <Title>Permissões Checks</Title>
      </ContentHeader>

      <Grid
        container
        justifyContent="center"
        minHeight="88vh"
        padding={1}
        spacing={2}
      >
        <Grid
          item
          mt={1}
          xs={6} 
          md={6} 
          lg={6}
          container
          flexDirection={"column"}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Paper
            elevation={3}
            sx={{ 
              background: "#212121", 
              color: `#fff`,
              padding: "5px",
              marginBottom: "10px",
              width: "140px",
              height: "50px",
              borderRadius: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text fontSize={"27px"}>{financialId?.truck_board}</Text>
          </Paper>
          <Paper
            elevation={3}
            sx={{ 
              background: "#212121", 
              color: `#fff`,
              padding: "5px",
              marginBottom: "10px",
              width: "330px",
              height: "150px",
              borderRadius: "11px"
            }}
          >

          </Paper>
        </Grid>

        <Grid
          item
          xs={6} 
          md={6} 
          lg={6}
          container
          flexDirection={"column"}
          alignItems="flex-start"
          justifyContent="flex-end"
        >
          <Text 
            fontSize={"27px"}
            sx={{ 
              fontWeight: "700",
              background: "#fff",
              color: "#000"
            }}
          >
            Permissões:
          </Text>
          <Paper
            elevation={3}
            sx={{ 
              background: "#212121", 
              color: `#fff`,
              padding: "5px",
              marginBottom: "10px",
              width: "340px",
              height: "120px",
              borderRadius: "11px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflowY: "scroll"
            }}
          >
            <Paper
              elevation={3}
              sx={{
                width: "310px",
                padding: "5px",
                background: "#fff",
                margin: "7px"
              }}
            >
              <Text 
                fontSize={"22px"}
                sx={{ fontWeight: "700", margin: "10px" }}
              >
                notifica
              </Text>              
            </Paper>

            <Paper
              elevation={3}
              sx={{
                width: "310px",
                padding: "5px",
                background: "#fff",
                margin: "7px"
              }}
            >
              <Text 
                fontSize={"22px"}
                sx={{ fontWeight: "700", margin: "10px" }}
              >
                notifica
              </Text>              
            </Paper>

          </Paper>
        </Grid>

        <Grid
          item
          container
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Table
            data={financial}
            query={userQuery}
            setQuery={setUserQuery}
            isFetching={financialIsFetching}
            error={financialError}
            loading={loading}
            mutate={mutate}
          />
        </Grid>
      </Grid>    
    </Modal>
  );
};

export default Permission;
