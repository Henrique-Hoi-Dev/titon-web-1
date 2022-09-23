import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { errorNotification, successNotification } from "utils/notification";
import { useGet } from "services/requests/useGet";
import { useUpdate } from "services/requests/useUpdate";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";

const ModalUpdateCart = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    truckId
  }) => {

  const [fetch, setFetch] = useState(false);

  const [body, setBody] = useState([]);

  const {
    data: truck,
    isValidating
  } = useGet(
    `truck/${truckId}`, 
    []
  );

  const {
    data: truckUpdate,
    error: errorTruckUpadate,
    isFetching
  } = useUpdate(
    `truck/${truckId}`, 
    body, 
    "",
    fetch, 
    setFetch
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
    setBody({})
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      truck_models: truck?.dataResult?.truck_models,
      truck_name_brand: truck?.dataResult?.truck_name_brand,
      truck_color: truck?.dataResult?.truck_color,
      truck_km: truck?.dataResult?.truck_km,
      truck_year: truck?.dataResult?.truck_year,
    }))

  }, [truck]);

  useEffect(() => {
    if (truckUpdate) {
      mutate();
      onClose();
      successNotification();
    }

    if(errorTruckUpadate){
      errorNotification(errorTruckUpadate?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [truckUpdate, errorTruckUpadate]);

  console.log("carreta ", body)

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"600px"}
    >
      <ContentHeader>
        <Title>Editar Carreta</Title>
      </ContentHeader>

      {!isFetching && !isValidating && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        >

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Modelo</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.truck_models ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_models: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Marca</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.truck_name_brand ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_name_brand: ev.target.value,
                }))
              }
            />
          </Grid>        

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Cor</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.truck_color ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_color: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>KM</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.truck_km ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_km: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Ano</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.truck_year ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_year: ev.target.value,
                }))
              }
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

      {isFetching && <Loading/>}
      {isValidating && <Loading/>}
    </Modal>
  );
};

export default ModalUpdateCart;
