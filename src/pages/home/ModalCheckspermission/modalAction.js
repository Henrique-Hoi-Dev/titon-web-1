import { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useUpdate } from "services/requests/useUpdate";
import { useGet } from "services/requests/useGet";
import { moneyMask } from "utils/masks";
import { useSelector } from "react-redux";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";

const ModalAction = (
  { 
    showModal, 
    setShowModal, 
    mutate,
    checkId
  }) => {

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const [value, setValue] = useState(0);

  const user = useSelector((state) => state?.user);

  const status = [
    { value: "approval_process", label: "Em processo", color: "green" },
    { value: "approved", label: "Aprovado", color: "#1976d2" },
    { value: "denied", label: "Negado", color: "red" },
    { value: "finished", label: "Finalizado", color: "grey" },
  ]

  const getStatus = (res) => status.find(item => item.value === res) ?? null

  const {
    data: checks,
    isValidating
  } = useGet(
    `user/freight/${checkId.id}`, 
    []
  );

  const { 
    data, 
    isFetching,
    error
  } = useUpdate(
    "user/freight",
    body,
    checkId.id,
    fetch,
    setFetch
  );

  // console.log("status", user.data.users.id, checks)

  const handleSubmitActive = (ev) => {
    ev.preventDefault();
    setBody({
      status_check_order: "approved",
      user_id: user.data.users.id,
      driver_id: 2
    })
    setFetch(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (data) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
    } 
    else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.responseData?.msg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      maxWidth="770px"
    >
      <ContentHeader mt={2}>
        <Title>Informações Frete</Title>
      </ContentHeader>

      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text sx={{ color: "red" }}>
            {`Erro: ${error?.response?.data?.dataResult?.msg}`}
          </Text>
        </Grid>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ fontWeight: "700" }} label="Primeiro Check" {...a11yProps(0)} />
          <Tab sx={{ fontWeight: "700" }} label="Segundo Check" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {!isFetching && !isValidating && (
          <Grid
            container
            item
            spacing={2}
            mt={1}
            sx={{ minHeight: "300px", justifyContent: "flex-start" }}
          >
            <Grid container item xs={6} md={12} lg={12}>
              <Grid item container xs={12} md={3} lg={3} flexDirection={"column"}>
                <Text sx={{ ml: 1, fontWeight: "900" }}>Staus Check</Text>
                <Text 
                  fontSize={"17"} 
                  sx={{  
                    ml: 2, 
                    color: `${getStatus(checks?.dataResult?.first_check?.status_check_order)?.color}`, 
                    fontWeight: "700"
                  }}
                >
                  {getStatus(checks?.dataResult?.first_check?.status_check_order).label}
                </Text>                
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <Button 
                  disabled={checks?.dataResult?.first_check?.status_check_order === "approved"} 
                  type="submit" 
                  variant="contained" 
                  color="error"
                  sx={{ maxWidth: "100px" }}
                >
                  Negar
                </Button>
              </Grid>
            </Grid> 

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Inicio Frete</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.first_check?.start_city}
                </Text>                
              </Grid>
            </Grid>   

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>KM Percorrer</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {Math.round(checks?.dataResult?.first_check?.travel_km/1000)} Km
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Final Frete</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.first_check?.final_city}
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900", whiteSpace: "break-spaces" }}>Prévia Tonelada</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.first_check?.preview_tonne} T
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Valor tonelada</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.first_check?.value_tonne  || [0])}
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Prévia Diesel</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.first_check?.preview_value_diesel  || [0])}
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={6} lg={6}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Local Atual</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.first_check?.location_truck}
                </Text>                
              </Grid>
            </Grid> 

            <Grid item xs={6} md={6} lg={6}>
              <hr style={{ width: "280px", margin: "12px" }} />  
              <Text sx={{ ml: 1, fontWeight: "900" }}>Valor Bruto Frete</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.first_check?.item_total.preview_valueGross)}
                </Text>                
              </Grid>
            </Grid>   

            <Grid item xs={6} md={6} lg={6}>
              <hr style={{ width: "280px", margin: "12px" }} />   
              <Text sx={{ ml: 1, fontWeight: "900" }}>Prévia Gasto Combustível</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.first_check?.item_total.preview_fuel_expense)}
                </Text>                
              </Grid>
            </Grid>   

            <Grid item xs={6} md={12} lg={12}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Valor Desconto Do Combustível</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.first_check?.item_total.fuel_discount_on_shipping)}
                </Text>                
              </Grid>
            </Grid>   

            <Grid container item xs={12} md={12} lg={12} spacing={2} mt={1}>
              <Grid item xs={12} md={12} lg={6}>
                <Button variant="return" onClick={() => onClose()}>
                  Voltar
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Button 
                  variant="contained" 
                  color="success"
                  onClick={(ev) => handleSubmitActive(ev)}
                >
                  Aprovar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {!isFetching && !isValidating && (
          <Grid
            container
            item
            spacing={2}
            mt={1}
            sx={{ minHeight: "300px", justifyContent: "flex-start" }}
          >
            <Grid container item xs={6} md={12} lg={12}>
              <Grid item container xs={12} md={3} lg={3} flexDirection={"column"}>
                <Text sx={{ ml: 1, fontWeight: "900" }}>Staus Check</Text>
                <Text 
                  fontSize={"17"} 
                  sx={{  
                    ml: 2, 
                    color: `${getStatus(checks?.dataResult?.first_check?.status_check_order)?.color}`, 
                    fontWeight: "700"
                  }}
                >
                  {getStatus(checks?.dataResult?.first_check?.status_check_order).label}
                </Text>                
              </Grid>
            </Grid> 

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Inicio Frete</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.first_check?.start_city}
                </Text>                
              </Grid>
            </Grid>   

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>KM Percorrer</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {Math.round(checks?.dataResult?.first_check?.travel_km/1000)} Km
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Final Frete</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.first_check?.final_city}
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900", whiteSpace: "break-spaces" }}>Tonelada</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {checks?.dataResult?.second_check?.final_total_tonne ?? [0]} T
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={3} lg={3}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Valor Tonelada</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.first_check?.value_tonne  || [0])}
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={6} lg={6}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Valor Pedágio</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.second_check?.toll_value || [0])}
                </Text>                
              </Grid>
            </Grid>    

            <Grid item xs={6} md={6} lg={6}>
              <hr style={{ width: "290px", margin: "12px" }} />  
              <Text sx={{ ml: 1, fontWeight: "900" }}>Total Despesa</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.second_check?.item_total?.total_value_expenses || [0])}
                </Text>                
              </Grid>
            </Grid>   

            <Grid item xs={6} md={6} lg={6}>
              <hr style={{ width: "280px", margin: "12px" }} />   
              <Text sx={{ ml: 1, fontWeight: "900" }}>Total Abastecidas</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.second_check?.item_total.total_value_fuel || [0])}
                </Text>                
              </Grid>
            </Grid>   

            <Grid item xs={6} md={12} lg={12}>
              <Text sx={{ ml: 1, fontWeight: "900" }}>Total Depósitos</Text>
              <Grid item container xs={12} md={12} lg={12} >
                <Text 
                  sx={{ ml: 2, fontWeight: "600", color: "#333" }} 
                  fontSize={"17"}
                >
                  {moneyMask(checks?.dataResult?.second_check?.item_total?.total_deposit_money || [0])}
                </Text>                
              </Grid>
            </Grid> 
          </Grid>
        )}
      </TabPanel>

      {isFetching && <Loading/>}
      {isValidating && <Loading/>}
    </Modal>
  );
};

export default ModalAction;
