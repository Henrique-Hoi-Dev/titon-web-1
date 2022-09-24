import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { successNotification } from "utils/notification";
import { useGet } from "services/requests/useGet";
import { useUpdate } from "services/requests/useUpdate";
import { formatDatePicker } from "utils/formatDate";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import PickerDate from "components/atoms/pickerDate/pickerDate";

const ModalUpdateDriver = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    driverId
  }) => {

  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState([]);

  const {
    data: driver,
    isValidating
  } = useGet(
    `driver/${driverId}`, 
    []
  );

  const {
    data: salespointUpdate,
    error: errorSalespointUpdate,
    isFetching
  } = useUpdate(
    `driver/${driverId}`, 
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
      name: driver?.dataResult?.name,
      number_cnh: Number(driver?.dataResult?.number_cnh),
      valid_cnh: driver?.dataResult?.valid_cnh,
      date_valid_mopp: driver?.dataResult?.date_valid_mopp,
      date_valid_nr20: driver?.dataResult?.date_valid_nr20,
      date_valid_nr35: driver?.dataResult?.date_valid_nr35,
      cpf: driver?.dataResult?.cpf,
      date_admission: driver?.dataResult?.date_admission,
      date_birthday: driver?.dataResult?.date_birthday,
    }))
  }, [driver]);

  useEffect(() => {
    if (salespointUpdate) {
      mutate();
      onClose();
      successNotification(t("messages.success_msg"));
    }
    if(salespointUpdate){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salespointUpdate, errorSalespointUpdate]);

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
        <Title>Editar Motorista</Title>
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
            <Text sx={{ ml: 1 }}>Name</Text>
            <Input
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.name ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name: ev.target.value
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Data da Admissão</Text>
            <PickerDate
              value={body?.date_admission}
              size="medium"
              height="2.4em"
              onChange={(newValue) =>
                setBody((state) => ({
                  ...state,
                  date_admission: formatDatePicker(newValue)
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Data Nascimento</Text>
            <PickerDate
              value={body?.date_birthday}
              size="medium"
              height="2.4em"
              onChange={(newValue) =>
                setBody((state) => ({
                  ...state,
                  date_birthday: formatDatePicker(newValue)
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>CNH</Text>
            <Input
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.number_cnh ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  number_cnh: Number(ev.target.value)
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>CPF</Text>
            <Input
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.cpf ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  cpf: ev.target.value
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Validade CNH</Text>
            <PickerDate
              height="2.4em"
              value={body?.valid_cnh}
              size="medium"
              onChange={(newValue) =>
                setBody((state) => ({
                  ...state,
                  valid_cnh: formatDatePicker(newValue)
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Validade MOPP</Text>
            <PickerDate
              value={body?.date_valid_mopp}
              size="medium"
              height="2.4em"
              onChange={(newValue) =>
                setBody((state) => ({
                  ...state,
                  date_valid_mopp: formatDatePicker(newValue)
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Validade NR20</Text>
            <PickerDate
              value={body?.date_valid_nr20}
              size="medium"
              height="2.4em"
              onChange={(newValue) =>
                setBody((state) => ({
                  ...state,
                  date_valid_nr20: formatDatePicker(newValue)
                })) 
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Validade NR35</Text>
            <PickerDate
              value={body?.date_valid_nr35}
              size="medium"
              height="2.7em"
              onChange={(newValue) =>
                setBody((state) => ({
                  ...state,
                  date_valid_nr35: formatDatePicker(newValue)
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

export default ModalUpdateDriver;
