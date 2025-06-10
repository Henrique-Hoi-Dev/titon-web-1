import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, IconButton } from '@mui/material'
import {
  getCartByIdRequest,
  getCartsRequest,
  resetCartUpdate,
  updateCartRequest,
} from 'store/modules/cart/cartSlice'
import { uploadImage } from '@/services/uploadImage'
import { errorNotification } from '@/utils/notification'

import BaseButton from 'components/atoms/BaseButton/BaseButton'
import BaseModal from 'components/molecules/BaseModal/BaseModal'
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading'
import BaseContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import BaseTitle from 'components/atoms/BaseTitle/BaseTitle'
import BaseInput from 'components/molecules/BaseInput/BaseInput'
import BaseProgress from '@/components/atoms/BaseProgress/BaseProgress'
import BaseAvatar from '../BaseAvatar/BaseAvatar'
import BaseSelect from '../BaseSelect/BaseSelect'
import enums from '@/utils/enums'
import BaseInputMaskMil from '../BaseInputMaskMil/BaseInputMaskMil'

const BaseModalUpdateCart = ({ showModal, setShowModal, data }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    selected: cart,
    loadingUpdate,
    loading,
    successUpdate,
  } = useSelector((state) => state.cart)

  const [body, setBody] = useState({})
  const [imageCart, setImageCart] = useState()

  const [progressPercent, setProgressPercent] = useState(0)

  const onClose = useCallback(() => {
    setShowModal(false)
    setBody({})
  }, [setShowModal])

  const handleSubmit = (ev) => {
    ev.preventDefault()

    let updatedBody = { ...body }

    // Limpar campos não usados
    if (!updatedBody.cart_ton_capacity) delete updatedBody.cart_ton_capacity
    if (!updatedBody.cart_liter_capacity) delete updatedBody.cart_liter_capacity

    // Definir campos conforme o tipo de carroceria
    if (updatedBody.cart_bodyworks === 'TANK') {
      updatedBody.cart_ton_capacity = 0
    } else {
      updatedBody.cart_liter_capacity = 0
    }

    dispatch(updateCartRequest({ id: data.id, data: updatedBody }))
  }

  useEffect(() => {
    if (data.id) {
      dispatch(getCartByIdRequest(data.id))
    }
  }, [dispatch, data.id])

  useEffect(() => {
    if (cart) {
      setBody({
        cart_models: cart.cartModels,
        cart_brand: cart.cartBrand,
        cart_color: cart.cartColor,
        cart_tara: cart.cartTara,
        cart_bodyworks: cart.cartBodyworks,
        cart_year: cart.cartYear,
        cart_liter_capacity: cart.cartLiterCapacity,
        cart_ton_capacity: cart.cartTonCapacity,
      })
    }
  }, [cart])

  async function handleChange(e) {
    const file = e.target.files[0]
    if (!file) return

    try {
      setProgressPercent(10) // opcional

      const image = await uploadImage({
        url: 'manager/cart/upload-image',
        body: { category: 'avatar_cart' },
        file,
        id: data.id,
        onUploadProgress: (event) => {
          const progress = Math.round((event.loaded * 100) / event.total)
          setProgressPercent(progress)
        },
      })

      setImageCart(image.imageCart)
    } catch (error) {
      errorNotification(error)
    }
  }

  useEffect(() => {
    if (successUpdate) {
      onClose()
      dispatch(getCartsRequest({}))
      dispatch(resetCartUpdate())
    }
  }, [successUpdate, onClose, dispatch])

  return (
    <BaseModal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
    >
      <BaseContentHeader>
        <BaseTitle>{t('modal.edit_cart.title')}</BaseTitle>
      </BaseContentHeader>

      {!loadingUpdate && !loading && (
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
                uuid={imageCart?.uuid || cart?.imageCart?.uuid}
                category={imageCart?.category || cart?.imageCart?.category}
                styles={{
                  height: 'auto',
                  width: '200px',
                  borderRadius: '8px',
                }}
              />
            </IconButton>
            {progressPercent > 0 && (
              <BaseProgress
                progressPercent={progressPercent}
                setProgressPercent={setProgressPercent}
              />
            )}
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
            <Grid item xs={6} md={6} lg={6}>
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

            <Grid item xs={6} md={6} lg={6}>
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
              <BaseSelect
                labelText={t('modal.add_cart.type_cart')}
                placeholder={t('modal.add_cart_type_cart_placeholder')}
                options={enums.typeCart || []}
                value={
                  body?.cart_bodyworks
                    ? {
                        value: body.cart_bodyworks,
                        label: enums.typeCart?.find((opt) => opt.value === body.cart_bodyworks)
                          ?.label,
                      }
                    : null
                }
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
              <Grid item xs={6} md={6} lg={6}>
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
                  value={body?.cart_liter_capacity ?? 0}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      cart_liter_capacity: Number(ev.target.value),
                    }))
                  }
                />
              </Grid>
            )}

            {(body?.cart_bodyworks === 'BULKCARRIER' ||
              body?.cart_bodyworks === 'SIDER' ||
              body?.cart_bodyworks === 'CHEST' ||
              body?.cart_bodyworks === 'BUCKET') && (
              <Grid item xs={6} md={6} lg={6}>
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
                  value={body?.cart_ton_capacity ?? 0}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      cart_ton_capacity: Number(ev.target.value),
                    }))
                  }
                />
              </Grid>
            )}

            <Grid item xs={6} md={6} lg={6}>
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

            <Grid item xs={6} md={6} lg={6}>
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

            <Grid item xs={6} md={6} lg={6}>
              <BaseInput
                type="number"
                labelText={t('modal.add_cart.year')}
                label={t('modal.add_cart_year_placeholder')}
                required
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
                  {t('button.update')}
                </BaseButton>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}

      {(loadingUpdate || loading) && <BaseLoading />}
    </BaseModal>
  )
}

export default BaseModalUpdateCart
