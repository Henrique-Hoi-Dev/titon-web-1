import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useUpdate } from "services/requests/useUpdate";
import { errorNotification, successNotification } from "utils/notification";
import { formatMil } from "utils/masks";
import { unmaskMoney } from "utils/unmaskMoney";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import Input from "components/atoms/input/input";

export const ModalFinalizeRecord = ({
  showModal,
  setShowModal,
  financialId,
  props,
  mutate,
}) => {
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const { data, error, isFetching } = useUpdate(
    `user/financialStatement/${financialId}`,
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
  };

  useEffect(() => {
    if (data?.httpStatus === 200) {
      mutate();
      onClose();
      successNotification(data?.status);
    } else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="560px"
    >
      {!isFetching && error && (
        <Grid item container justifyContent="center">
          <Text type="warning">
            {`messages: ${error?.response?.data?.responseData?.msg}`}
          </Text>
        </Grid>
      )}

      {!isFetching && (
        <>
          <Grid item container justifyContent="center">
            <Text fontsize={"32px"}>
              Deseja finalizar ficha: {props?.dataResult?.truck_board}?
            </Text>
          </Grid>

          <Grid item container xs={12} md={12} lg={12} justifyContent="center">
            <Input
              label={"Insira o KM final"}
              required
              styles={{
                width: "300px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={formatMil(body?.final_km)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  final_km: unmaskMoney(ev.target.value),
                  status: false,
                }))
              }
            />
          </Grid>

          <Grid container item xs={12} md={12} lg={12} spacing={2}>
            <Grid
              container
              item
              xs={6}
              md={6}
              lg={6}
              justifyContent={"flex-end"}
            >
              <Button
                type="submit"
                background={"#fff"}
                sx={{
                  width: "140px",
                  height: "49px",
                  border: "2px solid #F03D3D",
                  color: "#000000",
                }}
                variant="text"
              >
                FINALIZAR
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
                onClick={() => onClose()}
                background={"#509BFB"}
                sx={{
                  width: "140px",
                  height: "49px",
                  border: "1px solid #509BFB",
                  color: "#ffff",
                  mr: 3,
                }}
                variant="contained"
              >
                CANCELAR
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
