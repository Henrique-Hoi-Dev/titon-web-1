import React, { useState, useEffect, useCallback } from 'react'
import { Grid, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  getTruckByIdRequest,
  getTrucksRequest,
  resetTruckUpdate,
  updateTruckRequest,
} from 'store/modules/truck/truckSlice'
import { uploadImage } from '@/services/uploadImage'
import { errorNotification, successNotification } from '@/utils/notification'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseProgress from '@/components/atoms/BaseProgress/BaseProgress'
import BaseInput from 'components/molecules/BaseInput/BaseInput'
import BaseAvatar from '@/components/molecules/BaseAvatar/BaseAvatar'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'

const BaseModalUpdateTruck = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    selected: truck,
    loadingUpdate,
    loadingGetById,
    successUpdate,
  } = useSelector((state) => state.truck)

  const [body, setBody] = useState({})
  const [image, setImage] = useState(null)

  const [progressPercent, setProgressPercent] = useState(0)

  const onClose = useCallback(() => {
    setShowModal(false)
    setBody({})
  }, [setShowModal])

  const handleSubmit = (ev) => {
    ev.preventDefault()

    dispatch(updateTruckRequest({ id: data.id, data: body }))
  }

  useEffect(() => {
    if (data.id) {
      dispatch(getTruckByIdRequest(data.id))
    }
  }, [dispatch, data.id])

  useEffect(() => {
    if (truck) {
      setBody((state) => ({
        ...state,
        truck_models: truck?.truckModels,
        truck_name_brand: truck?.truckNameBrand,
        truck_board: truck?.truckBoard,
        truck_color: truck?.truckColor,
        truck_km: truck?.truckKm,
        truck_chassis: truck?.truckChassis,
        truck_year: truck?.truckYear,
      }))
    }
  }, [truck])

  useEffect(() => {
    if (successUpdate) {
      onClose()
      dispatch(resetTruckUpdate())
      dispatch(getTrucksRequest({}))
    }
  }, [successUpdate, onClose, dispatch])

  async function handleChange(e) {
    const file = e.target.files[0]
    if (!file) return

    try {
      setProgressPercent(10)

      const image = await uploadImage({
        file,
        id: data.id,
        body: {
          category: 'avatar_truck',
        },
        url: 'manager/truck/upload-image',
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total)
          setProgressPercent(progress)
        },
      })

      setImage(image.imageTruck)
      successNotification(t('modal.edit_truck.success'))
    } catch (error) {
      errorNotification(error)
    }
  }

  return (
    <BaseModal
      open={showModal}
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
      maxHeight={'850px'}
    >
      <BaseContentHeader mt={2}>
        <BaseTitle>{t('modal.edit_truck.title')}</BaseTitle>
      </BaseContentHeader>

      {!loadingUpdate && !loadingGetById && (
        <>
          <Grid
            container
            item
            spacing={2}
            alignItems="center"
            flexDirection={'column'}
            flexWrap={'nowrap'}
            mr={3}
            lg={12}
            md={12}
            xs={12}
          >
            <Grid
              item
              container
              xs={6}
              md={6}
              lg={6}
              mb={2}
              mr={2}
              justifyContent={'center'}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <IconButton
                color="info"
                aria-label="upload picture"
                component="label"
                sx={{
                  background: 'transparent',
                  '&:hover': {
                    background: 'transparent',
                  },
                }}
              >
                <input hidden accept="image/*" type="file" onChange={handleChange} />
                <BaseAvatar
                  variant="square"
                  alt="img"
                  styles={{
                    height: 'auto',
                    width: '280px',
                    borderRadius: '8px',
                  }}
                  uuid={image?.uuid || truck?.imageTruck?.uuid}
                  category={image?.category || truck?.imageTruck?.category}
                />
              </IconButton>
              {progressPercent > 0 && (
                <BaseProgress
                  progressPercent={progressPercent}
                  setProgressPercent={setProgressPercent}
                />
              )}
            </Grid>

            <Grid container item xs={12} md={12} lg={12} spacing={1.5} flexWrap={'wrap'}>
              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'Marca'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.truck_name_brand ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_name_brand: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'Modelo'}
                  styles={{
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.truck_models ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_models: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'Placa'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.truck_board ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_board: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'Cor'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.truck_color ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_color: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'KM'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
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

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'Número Chassi'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.truck_chassis ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_chassis: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Grid item xs={6} md={6} lg={6}>
                <BaseInput
                  required
                  label={'Ano Fabricação'}
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.truck_year ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      truck_year: ev.target.value,
                    }))
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            spacing={1}
            mt={0.3}
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
                {t('button.update')}
              </BaseButton>
            </Grid>
          </Grid>
        </>
      )}

      {(loadingUpdate || loadingGetById) && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalUpdateTruck
