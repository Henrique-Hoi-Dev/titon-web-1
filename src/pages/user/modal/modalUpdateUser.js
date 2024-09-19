import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { errorNotification, successNotification } from 'utils/notification'
import { useGet } from 'services/requests/useGet'
import { useUpdate } from 'services/requests/useUpdate'
import { useSelector } from 'react-redux'

import Button from 'components/atoms/BaseButton/BaseButton'
import Input from 'components/atoms/input/BaseInput'
import Modal from 'components/molecules/BaseModal/BaseModal'
import Loading from 'components/atoms/loading/loading'
import ContentHeader from 'components/molecules/BaseContentHeader/BaseContentHeader'
import Title from 'components/atoms/BaseTitle/BaseTitle'
import Autocomplete from 'components/atoms/BaseAutocomplete/BaseAutocomplete'
import InputMaskComponent from 'components/atoms/inputMask/inputMask'

const ModalUpdateUser = ({ showModal, setShowModal, mutate, props }) => {
  const users = useSelector((state) => state?.user)

  const [fetch, setFetch] = useState(false)
  const [body, setBody] = useState([])

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [passwordError, setPasswordError] = useState(false)

  const typeUser = [
    { value: 'master', name: 'Master' },
    { value: 'director', name: 'Diretor' },
    { value: 'manager', name: 'Gerente' },
    { value: 'collaborator', name: 'Colaborador' }
  ]

  const getTypeUser = () =>
    typeUser.find((item) => item.value === body?.type_position) ?? null

  const { data: user, isValidating } = useGet(`user/${props.id}`, [])

  const {
    data: userUpdate,
    error: errorUserUpadate,
    isFetching
  } = useUpdate(`user/${props.id}`, body, '', fetch, setFetch)

  const handleSubmit = (ev) => {
    ev.preventDefault()

    if (body?.password !== body?.confirmPassword) {
      setPasswordError(true)
      return
    }

    setFetch(true)
    setPasswordError(false)
  }

  const onClose = () => {
    setShowModal(false)
    setBody({})
  }

  useEffect(() => {
    setBody((state) => ({
      ...state,
      name: user?.dataResult?.name,
      email: user?.dataResult?.email,
      cpf: user?.dataResult?.cpf,
      type_position: user?.dataResult?.type_position
    }))
  }, [user])

  useEffect(() => {
    if (userUpdate) {
      mutate()
      onClose()
    }

    if (userUpdate) {
      successNotification()
    }

    if (errorUserUpadate) {
      errorNotification(errorUserUpadate?.response?.data?.msg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUpdate, errorUserUpadate])

  return (
    <Modal
      open={showModal}
      showCloseIcon
      onClose={onClose}
      component="form"
      onSubmit={handleSubmit}
      maxWidth={'600px'}
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
          sx={{ minHeight: '300px', justifyContent: 'flex-start' }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={'Name'}
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
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
            <Input
              label={'Email'}
              required
              styles={{
                maxWidth: '274px',
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              value={body?.email ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  email: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={users?.data?.userProps?.type_role === 'MASTER' ? 6 : 12}
            lg={users?.data?.userProps?.type_role === 'MASTER' ? 6 : 12}
          >
            <InputMaskComponent
              label={'CPF'}
              mask={'999.999.999-99'}
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
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

          {users?.data?.userProps?.type_role === 'MASTER' && (
            <Grid item xs={12} md={6} lg={6}>
              <Autocomplete
                placeholder={'Tipo usuário'}
                sx={{
                  '& .MuiAutocomplete-input': {
                    height: '0.4em!important'
                  }
                }}
                options={typeUser ?? []}
                getOptionLabel={(option) => option.name ?? ''}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                value={getTypeUser()}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setBody((state) => ({
                      ...state,
                      type_position: newValue.value
                    }))
                  }
                  if (newValue === null) {
                    setBody((state) => ({ ...state, type_position: '' }))
                  }
                }}
              />
            </Grid>
          )}

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={'Nova Senha'}
              type={showPassword ? 'text' : 'password'}
              onClick={() => setShowPassword(!showPassword)}
              isPassword
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4rem'
                }
              }}
              error={passwordError}
              helperText={passwordError ? 'Senhas não conferem' : ''}
              value={body?.password ?? ''}
              onChange={(ev) =>
                setBody((state) => ({
                  ...state,
                  password: ev.target.value
                }))
              }
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Input
              label={'Confirmar Senha'}
              type={showConfirmPassword ? 'text' : 'password'}
              styles={{
                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                  height: '1.4em'
                }
              }}
              isPassword
              value={body?.confirmPassword ?? ''}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={(ev) => {
                setBody((state) => ({
                  ...state,
                  confirmPassword: ev.target.value
                }))
              }}
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
                  width: '139px',
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
      {isValidating && <Loading />}
    </Modal>
  )
}

export default ModalUpdateUser
