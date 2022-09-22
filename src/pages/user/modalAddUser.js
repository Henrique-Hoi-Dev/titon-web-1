import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useCreate } from "services/requests/useCreate";
import { successNotification, errorNotification } from "utils/notification";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import Autocomplete from "components/atoms/autocomplete/autocomplete";
import { useSelector } from "react-redux";

const ModalAddUser = (
  { 
    showModal, 
    setShowModal, 
    mutate
  }) => {

  const users = useSelector((state) => state?.user);

  const [body, setBody] = useState({});

  const [fetch, setFetch] = useState(false);
  
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const typeUser = [
    { value: "master", name: "Master" },
    { value: "director", name: "Diretor" },
    { value: "manager", name: "Gerente" },
    { value: "collaborator", name: "Colaborador" }
  ]

  const getTypeUser = () => typeUser.find(item => item.value === body?.type_position ) ?? null
  
  const {
    data: user,
    error: errorUser,
    isFetching,
  } = useCreate(
    "user/register", 
    body, 
    fetch, 
    setFetch
  );

  const onClose = () => {
    setShowModal(false);
    setBody({});
    setConfirmPassword('')
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if(body?.password !== confirmPassword){
        setPasswordError(true)
      return
    }

    if(body?.email !== confirmEmail){
        setEmailError(true)
      return
    }

    setFetch(true);
    setPasswordError(false)
    setEmailError(false)
    setConfirmPassword('')
    setConfirmEmail('')
  };

  useEffect(() => {
    if (user) {
      mutate();
      onClose();
    }

    if(user){
      successNotification();
    }

    if(errorUser){
      errorNotification(errorUser?.response?.data?.msg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, errorUser]);

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
        <Title>Cadastrar Usuário</Title>
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
            <Text sx={{ ml: 1 }}>Email</Text>
            <Input
              required
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              error={emailError}
              helperText={emailError ? "Email não conferem" : ""}
              value={body?.email ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  email: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Confirmar Email</Text>
            <Input
              onChange={(ev) => setConfirmEmail(ev.target.value)}
              value={confirmEmail ?? ""}
              required
            />
          </Grid>

          <Grid 
            item 
            xs={12} 
            md={users?.data?.users?.type_position === "master" ? 6 : 12} 
            lg={users?.data?.users?.type_position === "master" ? 6 : 12}
          >
            <Text sx={{ ml: 1 }}>Nome Completo</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.name ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  name: ev.target.value,
                }))
              }
            />
          </Grid>

          {users?.data?.users?.type_position === "master" && (
            <Grid item xs={12} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>Tipo usuário</Text>
              <Autocomplete 
                sx={{
                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    height: "0.4em"
                  },
                }}  
                options={typeUser ?? []}
                getOptionLabel={(option) => option.name ?? ''}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={getTypeUser()}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setBody((state) => ({ ...state, type_position: newValue.value }));
                  }
                  if (newValue === null) {
                    setBody((state) => ({ ...state, type_position: '' }));
                  }
                }}
              />
            </Grid>            
          )}

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

export default ModalAddUser;
