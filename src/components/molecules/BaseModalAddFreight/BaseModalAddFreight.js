import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Divider, Grid, IconButton } from '@mui/material'
import { createFreightRequest } from 'store/modules/freight/freightSlice'
import { unmaskMoney } from '@/utils/unmaskMoney'
import { formatMil, formatMoney, formatMédia } from '@/utils/masks'
import {
  getLocationCityRequest,
  getLocationStateRequest,
} from '@/store/modules/location/locationSlice'

import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

import BaseButton from '@/components/atoms/BaseButton/BaseButton'
import BaseModal from '@/components/molecules/BaseModal/BaseModal'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseContentHeader from '@/components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from '@/components/atoms/BaseTitle/BaseTitle'
import BaseInput from '@/components/molecules/BaseInput/BaseInput'
import BaseRRadioGroup from '@/components/atoms/BaseRadioGrupe/BaseRadioGrupe'
import BaseSelect from '@/components/molecules/BaseSelect/BaseSelect'
import BaseText from '@/components/atoms/BaseText/BaseText'

const BaseModalAddFreight = ({ showModal, setShowModal }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { loadingCreate: loading } = useSelector((state) => state.freight)
  const { cities, states } = useSelector((state) => state.location)

  const [stateUFStart, setStateUFStart] = useState('')
  const [stateUFEnd, setStateUFEnd] = useState('')

  const [citysStart, setCitysStart] = useState([])
  const [citysEnd, setCitysEnd] = useState([])

  const [typeForm, setTypeForm] = useState('manual')

  const [body, setBody] = useState({})

  const onClose = useCallback(() => {
    setShowModal(false)
    setBody({})
    setStateUFStart('')
    setStateUFEnd('')
    setCitysStart([])
    setCitysEnd([])
  }, [setShowModal])

  useEffect(() => {
    if (showModal) {
      dispatch(getLocationStateRequest())
    }
  }, [showModal, dispatch])

  useEffect(() => {
    if (stateUFStart) {
      dispatch(getLocationCityRequest({ uf: stateUFStart }))
    }
  }, [stateUFStart, dispatch])

  useEffect(() => {
    if (stateUFEnd) {
      dispatch(getLocationCityRequest({ uf: stateUFEnd }))
    }
  }, [stateUFEnd, dispatch])

  useEffect(() => {
    if (stateUFStart && cities.length > 0) {
      setCitysStart(cities)
    }
  }, [cities, stateUFStart])

  useEffect(() => {
    if (stateUFEnd && cities.length > 0) {
      setCitysEnd(cities)
    }
  }, [cities, stateUFEnd])

  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(createFreightRequest(body))
  }

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
        <BaseTitle>{t('add_freight.title')}</BaseTitle>
      </BaseContentHeader>

      {!loading && (
        <Grid container item spacing={2} sx={{ justifyContent: 'flex-start' }}>
          <Grid container item xs={12} md={12} lg={12}>
            <BaseRRadioGroup
              options={[
                { label: 'XML CTE', value: 'xml' },
                { label: 'Manual', value: 'manual' },
              ]}
              defaultValue={'manual'}
              onChange={(event) => {
                setTypeForm(event.target.value)
              }}
            />
          </Grid>

          {typeForm === 'manual' && (
            <>
              <Grid container item xs={12} md={12} lg={12}>
                <BaseText>{t('add_freight.label.start_freight_city')}</BaseText>
              </Grid>

              <Grid container item xs={6} md={6} lg={6}>
                <BaseSelect
                  labelText={t('add_freight.label.state')}
                  placeholder={t('add_freight.placeholder.state')}
                  options={states ?? []}
                  getOptionLabel={(option) => option?.name}
                  isOptionEqualToValue={(option, value) => option?.uf === value?.uf}
                  onChange={(event, newValue) => {
                    setStateUFStart(newValue?.uf)
                    setCitysStart([])
                  }}
                />
              </Grid>

              <Grid container item xs={6} md={6} lg={6}>
                <BaseSelect
                  labelText={t('add_freight.label.city')}
                  placeholder={t('add_freight.placeholder.city')}
                  options={citysStart ?? []}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(event, newValue) => {
                    setBody((state) => ({
                      ...state,
                      start_freight_city: newValue ? `${newValue.name} ${stateUFStart}` : '',
                    }))
                  }}
                />
              </Grid>

              <Grid container item xs={12} md={12} lg={12}>
                <BaseText>{t('add_freight.label.end_freight_city')}</BaseText>
              </Grid>

              <Grid container item xs={6} md={6} lg={6}>
                <BaseSelect
                  labelText={t('add_freight.label.state')}
                  placeholder={t('add_freight.placeholder.state')}
                  options={states ?? []}
                  getOptionLabel={(option) => option?.name}
                  isOptionEqualToValue={(option, value) => option?.uf === value?.uf}
                  onChange={(event, newValue) => {
                    setStateUFEnd(newValue?.uf)
                    setCitysEnd([])
                  }}
                />
              </Grid>

              <Grid container item xs={6} md={6} lg={6}>
                <BaseSelect
                  labelText={t('add_freight.label.city')}
                  placeholder={t('add_freight.placeholder.city')}
                  options={citysEnd ?? []}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(event, newValue) => {
                    setBody((state) => ({
                      ...state,
                      final_freight_city: newValue ? `${newValue.name} ${stateUFEnd}` : '',
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
                  borderColor: 'rgba(0, 0, 0, 0.75)',
                }}
              />

              <Grid item lg={6}>
                <BaseInput
                  label={'Transportadora'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
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
                      height: '1.4rem',
                    },
                  }}
                  value={body?.contractor}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      contractor: ev.target.value,
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
                  borderColor: 'rgba(0, 0, 0, 0.75)',
                }}
              />

              <Grid item lg={6}>
                <BaseInput
                  label={'KM atual caminhão'}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={formatMil(body?.truck_current_km)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_current_km: unmaskMoney(ev.target.value),
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
                      height: '1.4rem',
                    },
                  }}
                  value={formatMédia(body?.liter_of_fuel_per_km)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      liter_of_fuel_per_km: unmaskMoney(ev.target.value),
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
                      height: '1.4rem',
                    },
                  }}
                  value={formatMil(body?.preview_tonne, true)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      preview_tonne: unmaskMoney(ev.target.value),
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
                      height: '1.4rem',
                    },
                  }}
                  value={formatMoney(body?.value_tonne)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      value_tonne: unmaskMoney(ev.target.value),
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
                      height: '1.4rem',
                    },
                  }}
                  value={formatMoney(body?.jackpot)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      jackpot: unmaskMoney(ev.target.value),
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
                  borderColor: 'rgba(0, 0, 0, 0.75)',
                }}
              />

              <Grid item lg={6}>
                <BaseInput
                  label={'Pagamento do Frete'}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={formatMoney(body?.jackpot)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      jackpot: unmaskMoney(ev.target.value),
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
                      height: '1.4rem',
                    },
                  }}
                  value={formatMoney(body?.jackpot)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      jackpot: unmaskMoney(ev.target.value),
                    }))
                  }
                />
              </Grid>
            </>
          )}
          {typeForm === 'xml' && (
            <>
              <Grid
                container
                item
                xs={12}
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <IconButton
                  component="label"
                  sx={{
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="file"
                    hidden
                    accept=".xml"
                    onChange={(e) => {
                      const file = e.target.files[0]
                      if (file && file.type === 'text/xml') {
                        setBody((prev) => ({ ...prev, xmlFile: file }))
                      } else {
                        alert('Por favor, selecione um arquivo XML válido.')
                      }
                    }}
                  />
                  <DriveFileMoveIcon sx={{ width: '56px', height: '56px', color: '#1877F2' }} />
                </IconButton>

                {body?.xmlFile && (
                  <Grid container direction="column" alignItems="center" mt={1}>
                    <IconButton
                      component="label"
                      sx={{
                        background: '#CCD6EB',
                        gap: 2,
                        height: '50px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        '&:hover': {
                          background: '#b0c4e9',
                        },
                      }}
                    >
                      <BaseText
                        color="#000"
                        sx={{
                          fontSize: '13px',
                          textAlign: 'center',
                          wordBreak: 'break-word',
                        }}
                      >
                        {body.xmlFile.name}
                      </BaseText>

                      <HighlightOffIcon
                        sx={{ width: '24px', height: '24px', cursor: 'pointer' }}
                        onClick={() => setBody((prev) => ({ ...prev, xmlFile: null }))}
                      />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </>
          )}

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={1}
            mt={1}
            justifyContent={'flex-end'}
          >
            <Grid item container xs={12} md={12} lg={3}>
              <BaseButton
                onClick={() => onClose()}
                background={''}
                sx={{
                  width: '140px',
                  height: '49px',
                  border: '1px solid #509BFB',
                  color: '#FFF',
                }}
                variant="text"
              >
                {t('button.cancel')}
              </BaseButton>
            </Grid>
            <Grid container item xs={12} md={3} lg={3}>
              <BaseButton
                type="submit"
                color="success"
                background={'linear-gradient(224.78deg, #509BFB 8.12%, #0C59BB 92.21%)'}
                sx={{
                  fontSize: '14px',
                  color: 'white',
                  width: '139px',
                  height: '49px',
                  marginRight: '15px',
                }}
              >
                {t('button.register')}
              </BaseButton>
            </Grid>
          </Grid>
        </Grid>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalAddFreight
