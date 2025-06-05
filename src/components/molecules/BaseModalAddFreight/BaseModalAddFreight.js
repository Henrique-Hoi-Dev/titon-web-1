/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, IconButton } from '@mui/material';
import { createFreightRequest } from 'store/modules/freight/freightSlice';
import { unmaskMoney } from '@/utils/unmaskMoney';
import { formatMil, formatMoney, formatMédia } from '@/utils/masks';

import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import BaseButton from '@/components/atoms/BaseButton/BaseButton';
import BaseModal from '@/components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from '@/components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from '@/components/atoms/BaseTitle/BaseTitle';
import BaseInput from '@/components/molecules/BaseInput/BaseInput';
import BaseAutocomplete from '@/components/atoms/BaseAutocomplete/BaseAutocomplete';
import RRadioGroup from '@/components/atoms/radioGrupe/radioGrupe';

const BaseModalAddFreight = ({ showModal, setShowModal, financialId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.freight);

  const [body, setBody] = useState({});

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({});
  }, [setShowModal]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createFreightRequest(body));
  };
  const [localityUf, setLocalityUf] = useState([]);

  const [, setMatch] = useState([]);
  const [leavingFor, setLeavingFor] = useState([]);
  const [forState, setForState] = useState([]);

  const [matchUF] = useState('');
  const [leavingForUF, setLeavingForUF] = useState('');
  const [forStateUF, setForStateUF] = useState('');

  function localityUFFetch() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
      .then((res) => res.json())
      .then((data) => setLocalityUf(data));
  }

  function localityFetch() {
    if (matchUF) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${matchUF}/distritos`
      )
        .then((res) => res.json())
        .then((data) => setMatch(data));
    } else {
      setMatch([]);
    }
    if (leavingForUF) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${leavingForUF}/distritos`
      )
        .then((res) => res.json())
        .then((data) => setLeavingFor(data));
    } else {
      setLeavingFor([]);
    }
    if (forStateUF) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${forStateUF}/distritos`
      )
        .then((res) => res.json())
        .then((data) => setForState(data));
    } else {
      setForState([]);
    }
  }

  // const matchCitys = [...new Set(match.map((res, i) => res.nome))] ?? [];
  const leavingForCitys = [...new Set(leavingFor.map((res) => res.nome))] ?? [];
  const forStateCitys = [...new Set(forState.map((res) => res.nome))] ?? [];

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'800px'}
    >
      <BaseContentHeader mt={2}>
        <BaseTitle>Adicionar Frete</BaseTitle>
      </BaseContentHeader>

      {!loading && (
        <Grid
          container
          item
          spacing={2}
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid container item xs={12} md={12} lg={12}>
            <RRadioGroup
              labelOne={'XML CTE'}
              labelTwo={'Manual'}
              defaultValue={'second'}
            />
          </Grid>
          {/* 
          <Grid container item xs={12} md={6} lg={6}>
            <Autocomplete
              placeholder={"UF"}
              sx={{
                maxWidth: "70px",
                marginRight: "10px",
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}
              options={localityUf ?? []}
              getOptionLabel={(option) => `${option?.sigla}`}
              isOptionEqualToValue={(option, value) =>
                option?.sigla === value?.sigla
              }
              onChange={(event, newValue) => {
                setMatchUF(newValue?.sigla);
              }}
            />
            <Autocomplete
              placeholder={"Partida"}
              sx={{
                width: "191px",
                "& .MuiAutocomplete-input": {
                  height: "0.4em!important",
                },
              }}
              options={matchCitys ?? []}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(event, newValue) => {
                setBody((state) => ({
                  ...state,
                  location_of_the_truck: `${matchUF + "-" + newValue}`,
                }));
              }}
            />
          </Grid> */}

          <Grid container item xs={12} md={6} lg={6}>
            <BaseAutocomplete
              placeholder={'UF'}
              sx={{
                maxWidth: '70px',
                marginRight: '10px',
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              options={localityUf ?? []}
              getOptionLabel={(option) => `${option?.sigla}`}
              isOptionEqualToValue={(option, value) =>
                option?.sigla === value?.sigla
              }
              onChange={(event, newValue) => {
                setLeavingForUF(newValue?.sigla);
              }}
            />
            <BaseAutocomplete
              placeholder={'Saindo De'}
              sx={{
                width: '191px',
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              options={leavingForCitys ?? []}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(event, newValue) => {
                setBody((state) => ({
                  ...state,
                  start_freight_city: `${leavingForUF + '-' + newValue}`
                }));
              }}
            />
          </Grid>

          <Grid container item xs={12} md={6} lg={6}>
            <BaseAutocomplete
              placeholder={'UF'}
              sx={{
                maxWidth: '70px',
                marginRight: '10px',
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              options={localityUf ?? []}
              getOptionLabel={(option) => `${option?.sigla}`}
              isOptionEqualToValue={(option, value) =>
                option?.sigla === value?.sigla
              }
              onChange={(event, newValue) => {
                setForStateUF(newValue?.sigla);
              }}
            />
            <BaseAutocomplete
              placeholder={'Para'}
              sx={{
                width: '191px',
                '& .MuiAutocomplete-input': {
                  height: '0.4em!important'
                }
              }}
              options={forStateCitys ?? []}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(event, newValue) => {
                setBody((state) => ({
                  ...state,
                  final_freight_city: `${forStateUF + '-' + newValue}`
                }));
              }}
            />
          </Grid>

          <Divider
            sx={{
              my: 0.5,
              width: '96%',
              ml: '19px',
              mt: 2,
              borderColor: 'rgba(0, 0, 0, 0.75)'
            }}
          />

          <Grid item lg={6}>
            <BaseInput
              label={'Transportadora'}
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              // value={body?.truck_km ?? ""}
              // onChange={(ev) =>
              //   setBody((state) => ({
              //     ...state,
              //     truck_km: ev.target.value,
              //   }))
              // }
            />
          </Grid>

          <Grid item lg={6}>
            <BaseInput
              label={'Contratante'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.contractor}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  contractor: ev.target.value
                }))
              }
            />
          </Grid>

          <Divider
            sx={{
              my: 0.5,
              width: '96%',
              ml: '19px',
              mt: 2,
              borderColor: 'rgba(0, 0, 0, 0.75)'
            }}
          />

          <Grid item lg={6}>
            <BaseInput
              label={'KM atual caminhão'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMil(body?.truck_current_km)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  truck_current_km: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item lg={6}>
            <BaseInput
              label={'Média combustível'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMédia(body?.liter_of_fuel_per_km)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  liter_of_fuel_per_km: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item lg={6}>
            <BaseInput
              label={'Peso Liquido'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMil(body?.preview_tonne, true)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  preview_tonne: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item lg={6}>
            <BaseInput
              label={'R$/Tonelada'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMoney(body?.value_tonne)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  value_tonne: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item lg={6}>
            <BaseInput
              label={'Valor diesel'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMoney(body?.jackpot)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  jackpot: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Divider
            sx={{
              my: 0.5,
              width: '96%',
              ml: '19px',
              mt: 2,
              borderColor: 'rgba(0, 0, 0, 0.75)'
            }}
          />

          <Grid item lg={6}>
            <BaseInput
              label={'Pagamento do Frete'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMoney(body?.jackpot)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  jackpot: unmaskMoney(ev.target.value)
                }))
              }
            />
          </Grid>

          <Grid item lg={6}>
            <BaseInput
              label={'Frete BRUTO'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={formatMoney(body?.jackpot)}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  jackpot: unmaskMoney(ev.target.value)
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
            justifyContent={'center'}
          >
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                background: '#CCD6EB',
                width: '56px',
                height: '56px',
                borderRadius: '8px'
              }}
            >
              <input hidden accept="image/*" type="file" />
              <AddAPhotoOutlinedIcon />
            </IconButton>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={2}
            mt={2}
            justifyContent={'flex-end'}
          >
            <Grid container item xs={12} md={3} lg={3}>
              <BaseButton
                onClick={() => onClose()}
                background={'#fff'}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#000000'
                }}
                variant="text"
              >
                CANCELAR
              </BaseButton>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <BaseButton
                type="submit"
                color="success"
                background={
                  'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'
                }
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '141px',
                  height: '49px',
                  marginRight: '15px'
                }}
              >
                Atualizar
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  );
};

export default BaseModalAddFreight;
