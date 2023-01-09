import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useCreate } from "services/requests/useCreate";
import { successNotification, errorNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Autocomplete from "components/atoms/autocomplete/autocomplete";

const ModalAddCart = (
  { 
    showModal, 
    setShowModal, 
    mutate
  }) => {

  const [body, setBody] = useState({});

  const [fetch, setFetch] = useState(false);

  const typeCart = [
    { value: "tank", label: "Tanque" },
    { value: "bulkCarrier", label: "Graneleiro" },
    { value: "sider", label: "Sider" },
    { value: "chest", label: "Baú" },
    { value: "bucket", label: "Caçamba" }
  ]
  
  const {
    data: cart,
    error: errorCart,
    isFetching,
  } = useCreate(
    "user/cart", 
    body, 
    fetch, 
    setFetch
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
    if (cart) {
      mutate();
      onClose();
    }

    if(cart){
      successNotification();
    }

    if(errorCart){
      errorNotification(errorCart?.response?.data?.msg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, errorCart]);

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
        <Title>Cadastrar Carreta</Title>
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
            <Input
              label={"Modelo"}
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_models ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_models: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Marca"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_brand ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_brand: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Placa"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_board ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_board: ev.target.value,
                }))
              }
            />
          </Grid>  

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Cor"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_color ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_color: ev.target.value,
                }))
              }
            />
          </Grid>  

          <Grid item xs={12} md={6} lg={6}>
            <Autocomplete
              placeholder={"Tipo Carreta"}
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }} 
              options={typeCart ?? []}
              getOptionLabel={(option) => option.label ?? ''}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBody((state) => ({ ...state, cart_bodyworks: newValue.value }));
                }
                if (newValue === null) {
                  setBody((state) => ({ ...state, cart_bodyworks: '' }));
                }
              }}
            />
          </Grid>           
          
          {body?.cart_bodyworks === "tank" && (
            <Grid item xs={12} md={6} lg={6}>
              <Input
                label={"Capacidade de litros"}
                required
                styles={{
                  maxWidth: "274px",
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "1.4rem",
                  },
                }}
                value={body?.cart_liter_capacity ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_liter_capacity: ev.target.value,
                  }))
                }
              />
            </Grid>            
          )} 

          {((body?.cart_bodyworks === "bulkCarrier") ||
          (body?.cart_bodyworks === "sider") ||
          (body?.cart_bodyworks === "chest") ||
          (body?.cart_bodyworks === "bucket")
          ) && (
            <Grid item xs={12} md={6} lg={6}>
              <Input
                label={"Capacidade de tonelada"}
                required
                styles={{
                  maxWidth: "274px",
                  "& .MuiInputBase-input.MuiOutlinedInput-input": {
                    height: "1.4rem",
                  },
                }}
                value={body?.cart_ton_capacity ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_ton_capacity: ev.target.value,
                  }))
                }
              />
            </Grid>            
          )}

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Tara"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_tara ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_tara: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Número Chassi"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_chassis ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_chassis: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={"Ano Fabricação"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_year ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_year: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid 
            container 
            item 
            xs={12} 
            md={12} 
            lg={12} 
            spacing={2} 
            mt={1}
            justifyContent={"flex-end"}
          >
            <Grid container item xs={12} md={3} lg={3}>
              <Button 
                onClick={() => onClose()}
                background={"#fff"}
                sx={{ width: "140px", height: "49px", border: "1px solid #509BFB", color: "#000000" }}
                variant="text"
              >
                CANCELAR
              </Button>              
            </Grid>
            <Grid container item xs={12} md={3} lg={3} >
              <Button 
                type="submit" 
                color="success"
                background={"linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"}
                sx={{
                  fontSize: "14px",
                  color: "white",
                  width: "141px",
                  height: "49px",
                  marginRight: "15px",
                }}
              >
                CADASTRAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddCart;
