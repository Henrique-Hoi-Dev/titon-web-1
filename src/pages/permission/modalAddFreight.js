import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useCreate } from "services/requests/useCreate";
import { successNotification, errorNotification } from "utils/notification";
import { useGet } from "services/requests/useGet";
import { formatMoney } from "utils/masks";

import Button from "components/atoms/button/button";
import Input from "components/atoms/input/input";
import Modal from "components/molecules/modal/modal";
import Loading from "components/atoms/loading/loading";
import ContentHeader from "components/molecules/contentHeader/contentHeader";
import Title from "components/atoms/title/title";
import Text from "components/atoms/text/text";
import Autocomplete from "components/atoms/autocomplete/autocomplete";

const ModalAddFreight = (
  { 
    showModal, 
    setShowModal, 
    mutate
  }) => {

  const [body, setBody] = useState({});

  const [fetchFreight, setFetchFreight] = useState(false);

  const [paraCity, setParaCity] = useState('');
  const [deCity, setDeCity] = useState('');

  const [deState, setDeState] = useState('');
  const [paraState, setParaState] = useState('');

  const {
    data: user,
    error: errorUser,
    isFetching,
  } = useCreate(
    "truck", 
    body, 
    fetchFreight, 
    setFetchFreight
  );

  const {
    data: financial,
  } = useGet(
    "financialStatements", 
    {}, 
  );

  const onClose = () => {
    setShowModal(false);
    setBody({});
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setFetchFreight(true);
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

  function statesDe() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then((res) => res.json()).then((data) => setDeState(data));
  }

  function statesPara() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    .then((res) => res.json()).then((data) => setParaState(data));
  }

  function citysDe() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${body?.ofStateSigla}/distritos`)
    .then((res) => res.json()).then((data) => setDeCity(data));
  }

  function citysPara() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${body?.stopStateSigla}/distritos`)
    .then((res) => res.json()).then((data) => setParaCity(data));
  }

  console.log("cidade", deCity.map(res => res.id), body)

  useEffect(() => {
    citysDe()
    citysPara()
    statesDe()
    statesPara()

    setBody((state) => ({
      ...state,
      ofStateSigla: null,
      stopStateSigla: null,
      stopCitySigla: null,
      ofCitySigla: null,
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (body?.ofStateSigla) {
      citysDe()
    }
    if (body?.stopStateSigla) {
      citysPara()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

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
        <Title>Novo Frete</Title>
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
            <Text sx={{ ml: 1 }}>Fichas Motoristas</Text>
            <Autocomplete 
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={financial?.dataResult ?? []}
              getOptionLabel={(option) => option.driver_name}
              onChange={(event, newValue) => {
                setBody((state) => ({
                  ...state,
                  financial_statements_id: newValue.id,
                }))
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Contratante</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.contractor ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  contractor: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>De: Estato</Text>
            <Autocomplete 
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={deState ?? []}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option?.sigla === value?.sigla}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBody((state) => ({
                    ...state,
                    ofStateSigla: newValue.sigla,
                  }))                  
                } else {
                  setBody((state) => ({
                    ...state,
                    ofStateSigla: null,
                  }))     
                }
              }}
            />
          </Grid>            

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Para: Estado</Text>
            <Autocomplete 
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={paraState ?? []}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option?.sigla === value?.sigla}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBody((state) => ({
                    ...state,
                    stopStateSigla: newValue.sigla,
                  }))                  
                } else {
                  setBody((state) => ({
                    ...state,
                    stopStateSigla: null,
                  })) 
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>De: Cidade</Text>
            <Autocomplete
              disabled={body.ofStateSigla === null}
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={deCity ?? []}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option.nome === value.nome}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBody((state) => ({
                    ...state,
                    ofCitySigla: newValue.sigla,
                  }))                  
                } else {
                  setBody((state) => ({
                    ...state,
                    ofCitySigla: null,
                  })) 
                }
              }}
            />
          </Grid>            

          <Grid item xs={12} md={6} lg={6}>
            <Text sx={{ ml: 1 }}>Para: Cidade</Text>
            <Autocomplete
              disabled={body.stopStateSigla === null}
              sx={{
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}  
              options={paraCity ?? []}
              getOptionLabel={(option) => option.nome}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              onChange={(event, newValue) => {
                if (newValue) {
                  setBody((state) => ({
                    ...state,
                    stopCitySigla: newValue.sigla,
                  }))                  
                } else {
                  setBody((state) => ({
                    ...state,
                    stopCitySigla: null,
                  })) 
                }
              }}
            />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>Prévia Tonel...</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.truck_km ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_km: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>Prévia Diesel</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={formatMoney(body?.jackpot)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  jackpot: formatMoney(ev.target.value),
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>Prévia Média</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={body?.jackpot}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  jackpot: ev.target.value,
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            <Text sx={{ ml: 1 }}>Valor Tonelada</Text>
            <Input
              required
              styles={{
                maxWidth: "274px",
                "& .MuiInputBase-input.MuiOutlinedInput-input": {
                  height: "1.4rem",
                },
              }}
              value={formatMoney(body?.jackpot)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  jackpot: formatMoney(ev.target.value),
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

      {isFetching && <Loading />}
    </Modal>
  );
};

export default ModalAddFreight;
