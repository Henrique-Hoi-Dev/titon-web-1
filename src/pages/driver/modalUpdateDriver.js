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
import PickerDate from "components/atoms/pickerDate/pickerDate";
import InputMaskComponent from "components/atoms/inputMask/inputMask";

const ModalUpdateDriver = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    props
  }) => {

  const { t } = useTranslation();

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState([]);

  const {
    data: driver,
    isValidating
  } = useGet(
    `user/driver/${props.id}`, 
    []
  );

  const {
    data: salespointUpdate,
    error: errorSalespointUpdate,
    isFetching
  } = useUpdate(
    `user/driver/${driver.dataResult.id}`, 
    body, 
    "",
    fetch, 
    setFetch
  );
  
  console.log("id", driver)


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
            <Input
              label={"Name"}
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
            <PickerDate
              label={"Data da Admissão"}
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
            <PickerDate
              label={"Data Nascimento"}
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
            <Input
              label={"CNH"}
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
            <InputMaskComponent 
              label={"CPF"}
              mask={"999.999.999-99"}
              styles={{
                "& .css-zn7bzk-MuiFormControl-root-MuiTextField-root": {
                  height: "1.3em",
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
            <PickerDate
              label={"Validade CNH"}
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
            <PickerDate
              label={"Validade MOPP"}
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
            <PickerDate
              label={"Validade NR20"}
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
            <PickerDate
              label={"Validade NR35"}
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

          <Grid 
            container 
            item 
            xs={12} 
            md={12} 
            lg={12} 
            spacing={2} 
            mt={2}
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
                Atualizar
              </Button>
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
