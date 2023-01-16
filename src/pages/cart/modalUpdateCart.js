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

const ModalUpdateCart = ({ showModal, setShowModal, mutate, props }) => {
  const [fetch, setFetch] = useState(false);

  const [body, setBody] = useState([]);

  const { data: cart, isValidating } = useGet(`user/cart/${props?.id}`, []);

  const {
    data: cartUpdate,
    error: errorCartUpadate,
    isFetching,
  } = useUpdate(`user/cart/${props?.id}`, body, "", fetch, setFetch);

  const handleSubmit = (ev) => {
    ev.preventDefault();

    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      cart_models: cart?.dataResult?.cart_models,
      cart_brand: cart?.dataResult?.cart_brand,
      cart_color: cart?.dataResult?.cart_color,
      cart_tara: cart?.dataResult?.cart_tara,
      cart_bodywork: cart?.dataResult?.cart_bodywork,
      cart_year: cart?.dataResult?.cart_year,
      cart_liter_capacity: cart?.dataResult?.cart_liter_capacity,
      cart_ton_capacity: cart?.dataResult?.cart_ton_capacity,
    }));
  }, [cart]);

  useEffect(() => {
    if (cartUpdate) {
      mutate();
      onClose();
    }
    if (cartUpdate) {
      successNotification();
    }

    if (errorCartUpadate) {
      errorNotification(errorCartUpadate?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartUpdate, errorCartUpadate]);

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
            <Input
              label={"Marca"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_brand ?? ""}
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
              label={"Modelo"}
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_models ?? ""}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_models: ev.target.value,
                }))
              }
            />
          </Grid>

          {body?.cart_bodywork === "tank" && (
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
                value={body?.cart_liter_capacity ?? ""}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_liter_capacity: ev.target.value,
                  }))
                }
              />
            </Grid>
          )}

          {(body?.cart_bodywork === "bulkCarrier" ||
            body?.cart_bodywork === "sider" ||
            body?.cart_bodywork === "chest" ||
            body?.cart_bodywork === "bucket") && (
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
                value={body?.cart_ton_capacity ?? ""}
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
              label={"Cor"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_color ?? ""}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cart_color: ev.target.value,
                }))
              }
            />
          </Grid>

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
              value={body?.cart_tara ?? ""}
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
              label={"Ano Fabricação"}
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cart_year ?? ""}
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
            spacing={1}
            mt={0.3}
            justifyContent={"flex-end"}
          >
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                onClick={() => onClose()}
                background={"#fff"}
                sx={{
                  width: "140px",
                  height: "49px",
                  border: "1px solid #509BFB",
                  color: "#000000",
                }}
                variant="text"
              >
                CANCELAR
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
                type="submit"
                color="success"
                background={
                  "linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)"
                }
                sx={{
                  fontSize: "14px",
                  color: "white",
                  width: "139px",
                  height: "49px",
                  marginRight: "15px",
                }}
              >
                Atualizar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
      {isValidating && <Loading />}
    </Modal>
  );
};

export default ModalUpdateCart;
