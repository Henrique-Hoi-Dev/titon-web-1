import React, { useEffect, useState } from 'react'
import { Divider, Grid, IconButton } from '@mui/material'
import { useCreate } from 'services/requests/useCreate'
import { successNotification, errorNotification } from 'utils/notification'
import { formatMil, formatMoney, formatMédia } from 'utils/masks'
import { unmaskMoney } from 'utils/unmaskMoney'

import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined'
import Button from 'components/atoms/BaseButton/BaseButton'
import Input from 'components/atoms/input/BaseInput'
import Modal from 'components/molecules/BaseModal/BaseModal'
import Loading from 'components/atoms/loading/loading'
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import Title from 'components/atoms/BaseTitle/BaseTitle'
import Autocomplete from 'components/atoms/BaseAutocomplete/BaseAutocomplete'
import RRadioGroup from 'components/atoms/radioGrupe/radioGrupe'

export const ModalAddFreight = ({
  showModal,
  setShowModal,
  mutate,
  financialId
}) => {
  const [fetchFreight, setFetchFreight] = useState(false)

  const [body, setBody] = useState({})

  const [localityUf, setLocalityUf] = useState([])

  const [match, setMatch] = useState([])
  const [leavingFor, setLeavingFor] = useState([])
  const [forState, setForState] = useState([])

  const [matchUF, setMatchUF] = useState('')
  const [leavingForUF, setLeavingForUF] = useState('')
  const [forStateUF, setForStateUF] = useState('')

  const {
    data: user,
    error: errorUser,
    isFetching
  } = useCreate('truck', body, fetchFreight, setFetchFreight)

  const onClose = () => {
    setShowModal(false)
    setBody({})
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    setFetchFreight(true)
  }

  function localityUFFetch() {
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
      .then((res) => res.json())
      .then((data) => setLocalityUf(data))
  }

  function localityFetch() {
    if (matchUF) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${matchUF}/distritos`
      )
        .then((res) => res.json())
        .then((data) => setMatch(data))
    } else {
      setMatch([])
    }
    if (leavingForUF) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${leavingForUF}/distritos`
      )
        .then((res) => res.json())
        .then((data) => setLeavingFor(data))
    } else {
      setLeavingFor([])
    }
    if (forStateUF) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${forStateUF}/distritos`
      )
        .then((res) => res.json())
        .then((data) => setForState(data))
    } else {
      setForState([])
    }
  }

  // const matchCitys = [...new Set(match.map((res, i) => res.nome))] ?? [];
  const leavingForCitys = [...new Set(leavingFor.map((res) => res.nome))] ?? []
  const forStateCitys = [...new Set(forState.map((res) => res.nome))] ?? []

  // console.log("localidade ", matchCitys, leavingForCitys, forStateCitys);

  useEffect(() => {
    if (user) {
      mutate()
      onClose()
    }

    if (user) {
      successNotification()
    }

    if (errorUser) {
      errorNotification(errorUser?.response?.data?.msg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, errorUser])

  useEffect(() => {
    localityUFFetch()

    if (matchUF || leavingForUF || forStateUF) {
      localityFetch()
    } else if (!matchUF || !leavingForUF || !forStateUF) {
      localityFetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchUF, leavingForUF, forStateUF])

  useEffect(() => {
    setBody((state) => ({
      ...state,
      financial_statements_id: financialId,
      contractor: 'Empresa do frete',
      truck_current_km: 200000,
      travel_km_total: 467610,
      liter_of_fuel_per_km: 1.5,
      preview_tonne: 49.47,
      preview_value_diesel: 640
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('final', body)

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'800px'}
    >
      <ContentHeader mt={2}>
        <Title>Adicionar Frete</Title>
      </ContentHeader>

      {!isFetching && (
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
            <Autocomplete
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
                setLeavingForUF(newValue?.sigla)
              }}
            />
            <Autocomplete
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
                }))
              }}
            />
          </Grid>

          <Grid container item xs={12} md={6} lg={6}>
            <Autocomplete
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
                setForStateUF(newValue?.sigla)
              }}
            />
            <Autocomplete
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
                }))
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
            <Input
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
              <Button
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
              </Button>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <Button
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
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      {isFetching && <Loading />}
    </Modal>
  )
}
