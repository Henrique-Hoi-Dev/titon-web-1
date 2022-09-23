import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreate } from "services/requests/useCreate";
import { successNotification } from "utils/notification";
import { useGet } from "services/requests/useGet";
import { format, startOfDay } from "date-fns";

import Button from "components/atoms/button/button";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import PickerDate from "components/atoms/pickerDate/pickerDate";

const ModalAddDriver = (
  { 
    showModal, 
    setShowModal, 
    mutate
  }) => {

  const { t } = useTranslation();
  
  const [body, setBody] = useState({ });

  const [truckId, setTruckId] = useState('')

  const [fetch, setFetch] = useState(false);

  const {
    data: newFinancial,
    error: errorNewFinancial,
    isFetching,
  } = useCreate(
    "financialStatement", 
    body, 
    fetch, 
    setFetch
  );

  const {
    data: trucks,
  } = useGet(
    "/trucks", 
    {}, 
  );

  const {
    data: drivers,
  } = useGet(
    "/drivers", 
    {}, 
  );

  const {
    data: carts,
  } = useGet(
    "/carts", 
    {}, 
  );

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setFetch(true);
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      start_date: format(startOfDay(new Date()), "MM-dd-yyyy"),
      truck_id: truckId
    }))

  }, [truckId]);

  useEffect(() => {
    if (newFinancial) {
      mutate();
      onClose();
    }

    if(newFinancial){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newFinancial, errorNewFinancial]);

  console.log("body", body)

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"600px"}
      maxHeight={"800px"}
    >
      <ContentHeader mt={2}>
        <Title>Criar Ficha</Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        > 
          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Incio Ficha</Text>
            <PickerDate
              size="medium"
              height="2.4em"
              onChange={(newValue) => {
                setBody((state) => ({
                  ...state,
                  start_date: format(startOfDay(newValue), "MM-dd-yyyy")
                }))
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Caminhão</Text>
            <Autocomplete 
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={trucks?.dataResult ?? []}
              getOptionLabel={(option) => option.truck_models}
              onChange={(event, newValue) => {
                setTruckId(newValue?.id)
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Motorista</Text>
            <Autocomplete 
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={drivers?.dataResult ?? []}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {
                setBody((state) => ({
                  ...state,
                  driver_id: newValue?.id
                }))
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Carreta</Text>
            <Autocomplete 
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={carts?.dataResult ?? []}
              getOptionLabel={(option) => option.cart_models}
              onChange={(event, newValue) => {
                setBody((state) => ({
                  ...state,
                  cart_id: newValue?.id
                }))
              }}
            />
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
            <Grid item xs={12} md={12} lg={6}>
              <Button variant="return" onClick={() => onClose()}>
                Voltar
              </Button>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <Button type="submit" variant="contained" color="success">Confirmar</Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddDriver;
