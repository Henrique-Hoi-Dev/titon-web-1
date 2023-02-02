import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
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

const ModalCheck = ({ showModal, setShowModal, mutate, checkId }) => {
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const [value, setValue] = useState(0);

  const user = useSelector((state) => state?.user);

  const { data: checks, isValidating } = useGet(`user/freight/${checkId}`, []);

  const { data, isFetching, error } = useUpdate(
    "user/freight",
    body,
    checkId,
    fetch,
    setFetch
  );

  const handleSubmitActive = (ev) => {
    ev.preventDefault();
    setBody({
      status: "approved",
      user_id: user.data.users.id,
      driver_id: 2,
    });
    setFetch(true);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (data) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
    } else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.responseData?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Modal open={showModal} onClose={onClose} component="form" maxWidth="770px">
      <ContentHeader mt={2}>
        <Title
          sx={{
            borderBottom: "2px solid #000",
          }}
        >
          Campo Novo do Par. - MT Paranaguá - PR
        </Title>
      </ContentHeader>

      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text sx={{ color: "red" }}>
            {`Erro: ${error?.response?.data?.dataResult?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && !isValidating && (
        <Grid container item spacing={2} mt={1} sx={{ minHeight: "300px" }}>
          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Média anterior</Text>
            <Text fontsize={"24px"}>1,90</Text>
          </Grid>
          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Estimativa combustivel</Text>
            <Text fontsize={"24px"}>R$ 13.200,00</Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={"column"}>
            <Text>Sobra Liquida</Text>
            <Text fontsize={"24px"}>R$ 8.900,00</Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Distancia KM</Text>
            <Text fontsize={"24px"}>2.199 km</Text>
          </Grid>
          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Frete Total</Text>
            <Text fontsize={"24px"}>R$ 23.000,00</Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={"column"}>
            <Text> </Text>
            <Text fontsize={"24px"}> </Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Consumo</Text>
            <Text fontsize={"24px"}>1800 l</Text>
          </Grid>
          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Comissão motorista</Text>
            <Text fontsize={"24px"}>R$ 2.400,00</Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={"column"}>
            <Text> </Text>
            <Text fontsize={"24px"}> </Text>
          </Grid>

          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Preço KM</Text>
            <Text fontsize={"24px"}>R$ 10,50 / km</Text>
          </Grid>
          <Grid item md={4} lg={4} container flexDirection={"column"}>
            <Text>Frete Liquido</Text>
            <Text fontsize={"24px"}>R$ 22,100,00</Text>
          </Grid>
          <Grid item md={3} lg={3} container flexDirection={"column"}>
            <Text> </Text>
            <Text fontsize={"24px"}> </Text>
          </Grid>
        </Grid>
      )}

      {!isFetching && !isValidating && (
        <Grid container item spacing={2} mt={1} justifyContent="flex-end">
          <Grid container item xs={12} md={3} lg={3}>
            <Button
              onClick={() => onClose()}
              background={"#F03D3D"}
              sx={{
                fontSize: "14px",
                color: "white",
                width: "141px",
                height: "49px",
                marginRight: "15px",
                "&:hover": {
                  backgroundColor: "#F03D3D",
                },
              }}
            >
              REPROVAR
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
                width: "141px",
                height: "49px",
                marginRight: "15px",
              }}
            >
              APROVAR
            </Button>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
      {isValidating && <Loading />}
    </Modal>
  );
};

export default ModalCheck;
