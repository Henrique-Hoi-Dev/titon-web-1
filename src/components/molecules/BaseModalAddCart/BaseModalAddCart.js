import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, IconButton } from '@mui/material'
import { createCartRequest, getCartsRequest, resetCartCreate } from 'store/modules/cart/cartSlice'
import { uploadImage } from '@/services/uploadImage'
import { errorNotification } from '@/utils/notification'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseInput from 'components/molecules/BaseInput/BaseInput'
import BaseSelect from 'components/molecules/BaseSelect/BaseSelect'
import enums from '@/utils/enums'
import BaseAvatar from '../BaseAvatar/BaseAvatar'
import BaseInputMaskMil from '../BaseInputMaskMil/BaseInputMaskMil'

const BaseModalAddCart = ({ showModal, setShowModal }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { loadingGet: loading } = useSelector((state) => state.cart)

  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const [body, setBody] = useState({})

  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const onClose = useCallback(() => {
    if (!isMountedRef.current) return
    setShowModal(false)
    setBody({})
    setPreviewImage(null)
  }, [setShowModal])

  const handleChange = (e) => {
    e.preventDefault()
    const selectedFile = e.target.files[0]
    if (!selectedFile) return
    setFile(selectedFile)
    setPreviewImage(URL.createObjectURL(selectedFile))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(
      createCartRequest({
        ...body,
        onSuccess: async (createdCartId) => {
          if (!isMountedRef.current) return

          try {
            if (file && createdCartId) {
              await uploadImage({
                url: 'manager/cart/upload-image',
                file,
                id: createdCartId,
                body: { category: 'avatar_cart' },
              })
            }

            if (!isMountedRef.current) return

            dispatch(getCartsRequest({}))
            dispatch(resetCartCreate())
            onClose()
          } catch (error) {
            if (isMountedRef.current) errorNotification(error)
          }
        },
      })
    )
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
        <BaseTitle>{t('modal.add_cart.title')}</BaseTitle>
      </BaseContentHeader>

      {!loading && (
        <>
          <Grid
            item
            container
            xs={12}
            md={12}
            lg={12}
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
                src={previewImage}
                styles={{
                  height: 'auto',
                  width: '200px',
                  borderRadius: '8px',
                }}
              />
            </IconButton>
          </Grid>

          <Grid
            container
            item
            spacing={2}
            mt={1}
            sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
          >
            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.brand')}
                label={t('modal.add_cart_brand_placeholder')}
                required
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_brand ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_brand: ev.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.model')}
                label={t('modal.add_cart_model_placeholder')}
                required
                styles={{
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_models ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_models: ev.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.plate')}
                label={t('modal.add_cart_plate_placeholder')}
                required
                maxLength={7}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_board ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_board: ev.target.value.toUpperCase(),
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.color')}
                label={t('modal.add_cart_color_placeholder')}
                required
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_color ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_color: ev.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseSelect
                labelText={t('modal.add_cart.type_cart')}
                placeholder={t('modal.add_cart_type_cart_placeholder')}
                options={enums.typeCart || []}
                getOptionLabel={(option) => option.label ?? ''}
                isOptionEqualToValue={(option, value) => option.value === value?.value}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setBody((state) => ({
                      ...state,
                      cart_bodyworks: newValue.value,
                    }))
                  }
                  if (newValue === null) {
                    setBody((state) => ({ ...state, cart_bodyworks: '' }))
                  }
                }}
              />
            </Grid>

            {body?.cart_bodyworks === 'TANK' && (
              <Grid item xs={12} md={6} lg={6}>
                <BaseInputMaskMil
                  labelText={t('modal.add_cart.liter_capacity')}
                  label={t('modal.add_cart_liter_capacity_placeholder')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.cart_liter_capacity ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      cart_liter_capacity: ev.target.value,
                    }))
                  }
                />
              </Grid>
            )}

            {(body?.cart_bodyworks === 'BULKCARRIER' ||
              body?.cart_bodyworks === 'SIDER' ||
              body?.cart_bodyworks === 'CHEST' ||
              body?.cart_bodyworks === 'BUCKET') && (
              <Grid item xs={12} md={6} lg={6}>
                <BaseInputMaskMil
                  labelText={t('modal.add_cart.ton_capacity')}
                  label={t('modal.add_cart_ton_capacity')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.cart_ton_capacity ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      cart_ton_capacity: ev.target.value,
                    }))
                  }
                />
              </Grid>
            )}

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.tara')}
                label={t('modal.add_cart_tara_placeholder')}
                required
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_tara ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_tara: ev.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.chassis')}
                label={t('modal.add_cart_chassis_placeholder')}
                required
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_chassis ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_chassis: ev.target.value,
                  }))
                }
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <BaseInput
                labelText={t('modal.add_cart.year')}
                label={t('modal.add_cart_year_placeholder')}
                required
                type="number"
                maxLength={4}
                styles={{
                  maxWidth: '274px',
                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                    height: '1.4rem',
                  },
                }}
                value={body?.cart_year ?? ''}
                onChange={(ev) =>
                  setBody((state) => ({
                    ...state,
                    cart_year: ev.target.value,
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
                  {t('button.register')}
                </BaseButton>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}

      {loading && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalAddCart
