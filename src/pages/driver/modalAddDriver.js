import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCreate } from "services/requests/useCreate";
import { successNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";

const ModalAddDriver = (
  { 
    showModal, 
    setShowModal, 
    mutate
  }) => {

  const { t } = useTranslation();
  
  const [body, setBody] = useState({});

  const [fetch, setFetch] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const {
    data: newDevice,
    error: errorNewDevice,
    isFetching,
  } = useCreate(
    "driver/register", 
    body, 
    fetch, 
    setFetch
  );

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if(body?.password !== confirmPassword){
        setPasswordError(true)
      return
    }

    setFetch(true);
    setPasswordError(false)
    setConfirmPassword('')
  };

  useEffect(() => {
    if (newDevice || errorNewDevice) {
      mutate();
      onClose();
    }

    if(newDevice){
      successNotification(t("messages.success_msg"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newDevice, errorNewDevice]);

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={"600px"}
      maxHeight={"800px"}
    >
      <ContentHeader mt={2}>
        <Title>Cadastrar Motorista</Title>
      </ContentHeader>

      {!isFetching && (
        <Grid
          container
          item
          spacing={2}
          mt={1}
          sx={{ minHeight: "300px", justifyContent: "flex-start" }}
        > 
          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Nome Completo</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.name}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Nome de usuário</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.name_user}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name_user: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Senha</Text>
            <Input
              required
              type={showPassword ? "text" : "password"}
              onClick={() => setShowPassword(!showPassword)}
              isPassword
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              error={passwordError}
              helperText={passwordError ? "Senhas não conferem" : ""}
              value={body?.password ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Confirmar Senha</Text>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              onChange={(ev) => setConfirmPassword(ev.target.value)}
              isPassword
              value={confirmPassword ?? ""}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              required
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

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddDriver;
