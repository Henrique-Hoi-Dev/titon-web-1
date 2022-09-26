import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { successNotification, errorNotification } from "utils/notification";
import { useUpdate } from "services/requests/useUpdate";

import Button from "components/atoms/button/button";
import Loading from "components/atoms/loading/loading";
import Text from "components/atoms/text/text";
import Modal from "components/molecules/modal/modal";

const ModalDeleteTruck = (
  { 
    showModal, 
    setShowModal, 
    props, 
    mutate,
  }) => {

  const [fetch, setFetch] = useState(false);

  const body = {
    status_check_order: props.status
  }

  const { 
    data, 
    isFetching,
    error
  } = useUpdate(
    "freight",
    body,
    props.id,
    fetch,
    setFetch
  );

  console.log("status", props)

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetch(true);
  };

  const onClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (data) {
      mutate();
      onClose();
      successNotification(data?.success?.responseData?.msg);
    } 
    else if (error?.response?.data?.httpStatus === 400) {
      errorNotification(error?.response?.data?.responseData?.msg)
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
            <Text fontSize={"30px"}>Deseja Aceita Frete?</Text>
          </Grid>
          <Grid item xs={12} md={12} lg={6} mt={2}>
            <Button variant="return" onClick={() => onClose()}>Voltar</Button>
          </Grid>
          <Grid item xs={12} md={12} lg={6} mt={2}>
            {props?.status === "approved" ? (
              <Button 
                type="submit" 
                sx={{ 
                  background: "green",
                  "&:hover": {
                    background: "green",
                  }
                }}
              >
                Aceitar
              </Button>
            ) : (
              <Button 
                type="submit" 
                sx={{ 
                  background: "red",
                  "&:hover": {
                    background: "red",
                  }
                }}
              >
                Negar
              </Button>              
            )}
          </Grid>
        </>
      )}
      {isFetching && (
        <Grid item container>
          <Loading/>
        </Grid>
      )}
    </Modal>
  );
};

export default ModalDeleteTruck;
