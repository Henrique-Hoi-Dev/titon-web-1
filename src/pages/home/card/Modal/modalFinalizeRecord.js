import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useDelete } from "services/requests/useDelete";
import { errorNotification, successNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";
import Input from "components/atoms/input/input";

export const ModalFinalizeRecord = ({
  showModal,
  setShowModal,
  id,
  mutate,
}) => {
  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState({});

  const { data, isFetching, error } = useDelete(
    "user/financialStatement",
    id,
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
    if (data?.successStatus === true) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
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
      maxWidth="460px"
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
            <Text fontSize={"30px"}>Deseja Deletar Ficha?</Text>
          </Grid>

          <Grid item container justifyContent="center">
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.contractor ?? ""}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  contractor: ev.target.value,
                }))
              }
            />
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
            <Grid
              container
              item
              xs={6}
              md={6}
              lg={6}
              justifyContent={"flex-start"}
            >
              <Button
                type="submit"
                background={"#fff"}
                sx={{
                  width: "140px",
                  height: "49px",
                  border: "1px solid #0BB07B",
                  color: "#000000",
                }}
                variant="text"
              >
                Finalizar
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
