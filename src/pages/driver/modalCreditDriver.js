import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useCreate } from "services/requests/useCreate";
import { formatMoney } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";
import { useGet } from "services/requests/useGet";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import Input from "components/atoms/input/input";
import TableBankStatement from "./tableBankStatement";
import SelectWithInput from "components/molecules/selectWithInput/selectWithInput";

const ModalCreditDriver = ({ showModal, setShowModal, props, mutate }) => {
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({
    driver_id: props.id,
  });

  const {
    data: credit,
    error: creditError,
    isFetching,
  } = useCreate(`user/credit`, body, fetch, setFetch);

  const { data, isValidating } = useGet(`user/driver/${props.id}`, []);

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
      maxWidth="650px"
      height="650px"
    >
      {creditError && !isFetching && !isValidating && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${creditError?.response?.data?.responseData?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && !isValidating && (
        <>
          <Grid item container justifyContent="center">
            <Text fontsize={"23px"}>
              Registro crédito / débito para: {props.name}?
            </Text>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={12}
            lg={12}
            justifyContent="flex-end"
          >
            <Grid
              item
              xs={6}
              md={8.3}
              lg={8.3}
              mt={1}
              sx={{ textAlign: "center" }}
            >
              <Grid item xs={12} md={6} lg={6}>
                <SelectWithInput
                  placeholder={"Valor"}
                  styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
                  inputValue={formatMoney(body?.value)}
                  options={[
                    { label: "Credit", value: "credit" },
                    { label: "Debti", value: "debti" },
                  ]}
                  setSelectValue={(ev, newValue) =>
                    setBody((state) => ({
                      ...state,
                      value1: newValue,
                    }))
                  }
                  setInputValue={(ev) =>
                    setBody((state) => ({
                      ...state,
                      value: unmaskMoney(ev.target.value),
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6} mt={2}>
                <Input
                  label={"Motivo"}
                  styles={{
                    "& .MuiInputBase-input.MuiOutlinedInput-input": {
                      height: "1.4rem",
                    },
                  }}
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
            <Grid item xs={12} md={12} lg={12} mt={2}>
              <TableBankStatement data={data} />
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
                  mr: 3,
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
      {isValidating && (
        <Grid item container>
          <Loading />
        </Grid>
      )}
      {isFetching && (
        <Grid item container>
          <Loading />
        </Grid>
      )}
    </Modal>
  );
};

export default ModalCreditDriver;
