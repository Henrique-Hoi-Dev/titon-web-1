import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { errorNotification, successNotification } from "utils/notification";
import { useGet } from "services/requests/useGet";
import { useUpdate } from "services/requests/useUpdate";
import { useSelector } from "react-redux";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import Autocomplete from "components/atoms/autocomplete/autocomplete";

const ModalUpdateUser = (
  { 
    showModal, 
    setShowModal, 
    mutate, 
    userId
  }) => {

  const users = useSelector((state) => state?.user);

  const [fetch, setFetch] = useState(false);
  const [body, setBody] = useState([]);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState(false);

  const typeUser = [
    { value: "master", name: "Master" },
    { value: "director", name: "Diretor" },
    { value: "manager", name: "Gerente" },
    { value: "collaborator", name: "Colaborador" }
  ]

  const getTypeUser = () => typeUser.find(item => item.value === body?.type_position ) ?? null

  const {
    data: user,
    isValidating
  } = useGet(
    `user/${userId}`, 
    []
  );

  const {
    data: userUpdate,
    error: errorUserUpadate,
    isFetching
  } = useUpdate(
    `user/${userId}`, 
    body, 
    "",
    fetch, 
    setFetch
  );

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if(body?.password !== body?.confirmPassword){
        setPasswordError(true)
      return
    }

    setFetch(true);
    setPasswordError(false)
  };

  const onClose = () => {
    setShowModal(false);
    setBody({})
  };

  useEffect(() => {
    setBody((state) => ({
      ...state,
      name: user?.dataResult?.name,
      email: user?.dataResult?.email,
      cpf: user?.dataResult?.cpf,
      type_position: user?.dataResult?.type_position,
    }))
  }, [user]);

  useEffect(() => {
    if (userUpdate) {
      mutate();
      onClose();
      successNotification();
    }

    if(errorUserUpadate){
      errorNotification(errorUserUpadate?.response?.data?.msg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUpdate, errorUserUpadate]);

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
        <Title>Editar Usuário</Title>
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

          <Grid 
            item 
            xs={12} 
            md={users?.data?.users?.type_position === "master" ? 6 : 12} 
            lg={users?.data?.users?.type_position === "master" ? 6 : 12}
          >
            <Text sx={{ ml: 1 }}>Email</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.email ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  email: ev.target.value,
                }))
              }
            />
          </Grid>

          {users?.data?.users?.type_position === "master" && (
            <Grid item xs={12} md={6} lg={6}>
              <Text sx={{ ml: 1 }}>Tipo usuário</Text>
              <Autocomplete 
                sx={{
                  "& .MuiAutocomplete-input": {
                    height: "0.4em!important",
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
            <Text sx={{ ml: 1 }}>Nova Senha</Text>
            <Input
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
              styles={{
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              isPassword
              value={body?.confirmPassword ?? ""}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={(ev) => {
                setBody((state) => ({
                  ...state,
                  confirmPassword: ev.target.value,
                }))
              }}
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

export default ModalUpdateUser;
