import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useCreate } from "services/requests/useCreate";
import { formatMoney } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import Input from "components/atoms/input/input";
import SelectWithInput from "components/molecules/selectWithInput/selectWithInput";

const ModalAddCreditDriver = ({ showModal, setShowModal, props, mutate }) => {
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({
    driver_id: props,
  });
  console.log(
    "🚀 ~ file: modalAddCreditDriver.js:20 ~ ModalAddCreditDriver ~ body:",
    body
  );

  const {
    data: credit,
    error: creditError,
    isFetching,
  } = useCreate(`user/credit`, body, fetch, setFetch);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (credit) {
      mutate();
      onClose();
      successNotification();
    }
    if (creditError) {
      errorNotification(creditError?.response?.data?.mgs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [credit, creditError]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="500px"
      height="340px"
    >
      {creditError && !isFetching && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${creditError?.response?.data?.responseData?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && (
        <>
          <Grid item container justifyContent="center">
            <Text fontsize={"23px"}>Registro crédito / débito</Text>
          </Grid>
          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Grid
              item
              xs={6}
              md={8.3}
              lg={8.3}
              mt={1}
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={12} md={12} lg={12}>
                <SelectWithInput
                  xs={12}
                  md={12}
                  lg={12}
                  placeholder={"Valor"}
                  styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "0.5em",
                    },
                  }}
                  options={[
                    { label: "Crédito", value: "CREDIT" },
                    { label: "Débito", value: "DEBIT" },
                  ]}
                  onChangeSelect={(ev, newValue) =>
                    setBody((state) => ({
                      ...state,
                      type_method: newValue.value,
                    }))
                  }
                  //input
                  value={formatMoney(body?.value)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      value: unmaskMoney(ev.target.value),
                    }))
                  }
                />
              </Grid>

              <Grid item xs={12} md={12} lg={12} mt={2}>
                <Input
                  label={"Motivo"}
                  value={body?.description ?? ""}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      description: ev.target.value,
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2} mt={2}>
            <Grid
              container
              item
              xs={6}
              md={6}
              lg={6}
              justifyContent={"flex-end"}
            >
              <Button
                onClick={() => onClose()}
                background={"#F03D3D"}
                sx={{
                  width: "140px",
                  height: "49px",
                  border: "1px solid #F03D3D",
                  color: "#ffff",
                  mf: 1,
                  "&:hover": {
                    background: "#F03D3D",
                  },
                }}
              >
                CANCELAR
              </Button>
            </Grid>
            <Grid
              container
              item
              xs={6}
              md={6}
              lg={6}
              justifyContent={"flex-start"}
            >
              <Button
                onClick={(ev) => handleSubmit(ev)}
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
                REGISTRAR
              </Button>
            </Grid>
          </Grid>
        </>
      )}
      {isFetching && (
        <Grid item container>
          <Loading />
        </Grid>
      )}
    </Modal>
  );
};

export default ModalAddCreditDriver;
