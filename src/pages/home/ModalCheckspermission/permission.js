import { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { useGet } from "services/requests/useGet";
import { moneyMask } from "utils/masks";
import { formatMMMM } from "utils/formatDate";

import Table from "./table";
import Title from "components/atoms/title/title";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Modal from "components/molecules/modal/modal";
import Text from "components/atoms/text/text";
import Button from "components/atoms/button/button";

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
    `user/financialStatement/${financialId?.id}`, 
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
              display: "flex",
              alignItems: "flex-end",
              background: "#212121", 
              color: `#fff`,
              padding: "5px",
              marginBottom: "10px",
              width: "370px",
              height: "150px",
              borderRadius: "11px"
            }}
          >
            <Grid item container pl={2} mt={1} spacing={1} flexWrap={"nowrap"}>
              <Grid item container pl={2} mt={1} spacing={1} flexDirection={"column"}>
                <Text 
                  fontSize={'20px'} 
                  sx={{ 
                    marginBottom: "12px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }} 
                  whiteSpace={"nowrap"}
                >
                  FICHA MÊS {formatMMMM(financial?.dataResult?.start_date).toUpperCase()}
                </Text> 
                <Text fontSize={'18.5px'}>INICIO VIAGEM: </Text> 
                <Text fontSize={'18.5px'}>MÉDIA: </Text> 
                <Text fontSize={'18.5px'}>MOTORISTA: </Text> 
                <Text fontSize={'18.5px'}>FATURAMENTO: </Text>                 
              </Grid>
              <Grid item container pl={2} mt={1} spacing={1} flexDirection={"column"} alignItems={"center"}>
                <Text fontSize={'18.5px'} sx={{ marginBottom: "12px" }}>
                  <Button 
                    sx={{
                      height: "25px",
                      textAling: "center",
                      background: "#004aad!important"
                    }}
                  >
                    Finanlizar
                  </Button>
                </Text>
                <Text fontSize={'18.5px'}>12/20/2022</Text>
                <Text fontSize={'18.5px'}>1.2</Text>
                <Text 
                  fontSize={'18.5px'}
                  whiteSpace={"nowrap"}
                  sx={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {financial?.dataResult?.driver_name ?? "Nome Motorista"}
                </Text>
                <Text fontSize={'18.5px'}>{moneyMask(financial?.dataResult?.total_value || [0])}</Text>
              </Grid>
            </Grid>
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
