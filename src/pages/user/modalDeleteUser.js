import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useDelete } from "services/requests/useDelete";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";

const ModalDeleteTruck = ({ showModal, setShowModal, props, mutate }) => {
  const [fetch, setFetch] = useState(false);

  const { data, isFetching, error } = useDelete(
    "truck",
    props.id,
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
      errorNotification(error?.response?.data?.responseData?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth="600px"
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
            <Text fontSize={"30px"}>Deseja excluir: {props.name}?</Text>
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
              <Text fontSize={"16px"}>
                Após excluir os registros do usuário serão perdidos.
              </Text>
            </Grid>
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
                  border: "1px solid #F03D3D",
                  color: "#000000",
                }}
                variant="text"
              >
                EXCLUIR
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

export default ModalDeleteTruck;
