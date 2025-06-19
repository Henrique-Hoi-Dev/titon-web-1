import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Divider, Grid, IconButton } from '@mui/material';
import { createFreightFileRequest, createFreightRequest } from 'store/modules/freight/freightSlice';
import { unmaskMoney } from '@/utils/unmaskMoney';
import { formatMil, formatMoney, formatMédia } from '@/utils/masks';
import {
  getLocationCityRequest,
  getLocationStateRequest,
} from '@/store/modules/location/locationSlice';

import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import BaseButton from '@/components/atoms/BaseButton/BaseButton';
import BaseModal from '@/components/molecules/BaseModal/BaseModal';
import BaseLoading from '@/components/atoms/BaseLoading/BaseLoading';
import BaseContentHeader from '@/components/molecules/BaseContentHeader/BaseContentHeader';
import BaseTitle from '@/components/atoms/BaseTitle/BaseTitle';
import BaseInput from '@/components/molecules/BaseInput/BaseInput';
import BaseRRadioGroup from '@/components/atoms/BaseRadioGrupe/BaseRadioGrupe';
import BaseSelect from '@/components/molecules/BaseSelect/BaseSelect';
import BaseText from '@/components/atoms/BaseText/BaseText';

const BaseModalAddFreight = ({ showModal, setShowModal, onCreated }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isFirstRender = useRef(true);
  const isStateLoaded = useRef(false);

  const { loadingCreate: loading, successCreate } = useSelector((state) => state.freight);
  const { cities, states } = useSelector((state) => state.location);

  const [stateUFStart, setStateUFStart] = useState('');
  const [stateUFEnd, setStateUFEnd] = useState('');
  const [citysStart, setCitysStart] = useState([]);
  const [citysEnd, setCitysEnd] = useState([]);
  const [typeForm, setTypeForm] = useState('manual');
  const [body, setBody] = useState({
    status: 'APPROVED',
  });

  const onClose = useCallback(() => {
    setShowModal(false);
    setBody({ status: 'APPROVED' });
    setStateUFStart('');
    setStateUFEnd('');
    setCitysStart([]);
    setCitysEnd([]);
    isFirstRender.current = true;
    isStateLoaded.current = false;
  }, [setShowModal]);

  useEffect(() => {
    if (showModal && !isStateLoaded.current) {
      isStateLoaded.current = true;
      dispatch(getLocationStateRequest());
    }
  }, [showModal, dispatch]);

  useEffect(() => {
    if (stateUFStart && !isFirstRender.current) {
      dispatch(getLocationCityRequest({ uf: stateUFStart }));
    }
  }, [stateUFStart, dispatch]);

  useEffect(() => {
    if (stateUFEnd && !isFirstRender.current) {
      dispatch(getLocationCityRequest({ uf: stateUFEnd }));
    }
  }, [stateUFEnd, dispatch]);

  useEffect(() => {
    if (stateUFStart && cities?.length > 0) {
      setCitysStart(cities);
    }
  }, [cities, stateUFStart]);

  useEffect(() => {
    if (stateUFEnd && cities?.length > 0) {
      setCitysEnd(cities);
    }
  }, [cities, stateUFEnd]);

  useEffect(() => {
    if (successCreate) {
      if (typeof onCreated === 'function') {
        onCreated();
      }
      onClose();
    }
  }, [successCreate, onClose, onCreated]);

  const handleSubmit = (ev) => {
    if (typeForm === 'manual') {
      ev.preventDefault();
      isFirstRender.current = false;
      dispatch(createFreightRequest({ data: body, financial_id: id }));
    }

    if (typeForm === 'xml') {
      handleSubmitFile(ev);
    }
  };

  const handleSubmitFile = (ev) => {
    ev.preventDefault();
    isFirstRender.current = false;

    const formData = new FormData();
    if (body.xmlFile) {
      formData.append('file', body.xmlFile);
    }

    dispatch(createFreightFileRequest({ data: formData, financial_id: id }));
  };

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
                setTypeForm(event.target.value);
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
                    setStateUFStart(newValue?.uf);
                    setCitysStart([]);
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
                    }));
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
                    setStateUFEnd(newValue?.uf);
                    setCitysEnd([]);
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
                      end_freight_city: newValue ? `${newValue.name} ${stateUFEnd}` : '',
                    }));
                  }}
                />
              </Grid>

              <Divider
                sx={{
                  my: 1,
                  width: '96%',
                  ml: '19px',
                  mt: 2,
                  borderColor: 'rgba(248, 248, 248, 0.75)',
                }}
              />

              <Grid item lg={12}>
                <BaseInput
                  labelText={t('add_freight.label.contractor_name')}
                  label={t('add_freight.placeholder.contractor_name')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={body?.contractor_name ?? ''}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      contractor_name: ev.target.value,
                    }))
                  }
                />
              </Grid>

              <Divider
                sx={{
                  my: 1,
                  width: '96%',
                  ml: '19px',
                  mt: 2,
                  borderColor: 'rgba(248, 248, 248, 0.75)',
                }}
              />

              <Grid item lg={6}>
                <BaseInput
                  labelText={t('add_freight.label.truck_current_km')}
                  label={t('add_freight.placeholder.truck_current_km')}
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
                  labelText={t('add_freight.label.fuel_average')}
                  label={t('add_freight.placeholder.fuel_average')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={formatMédia(body?.fuel_avg_per_km)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      fuel_avg_per_km: unmaskMoney(ev.target.value),
                    }))
                  }
                />
              </Grid>

              <Grid item lg={6}>
                <BaseInput
                  labelText={t('add_freight.label.liquid_weight')}
                  label={t('add_freight.placeholder.liquid_weight')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={formatMil(body?.estimated_tonnage, true)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      estimated_tonnage: unmaskMoney(ev.target.value),
                    }))
                  }
                />
              </Grid>

              <Grid item lg={6}>
                <BaseInput
                  labelText={t('add_freight.label.value_tonne')}
                  label={t('add_freight.placeholder.value_tonne')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={formatMoney(body?.ton_value)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      ton_value: unmaskMoney(ev.target.value),
                    }))
                  }
                />
              </Grid>

              <Grid item lg={6}>
                <BaseInput
                  labelText={t('add_freight.label.value_diesel')}
                  label={t('add_freight.placeholder.value_diesel')}
                  required
                  styles={{
                    maxWidth: '274px',
                    '& .MuiInputBase-input.MuiOutlinedInput-input': {
                      height: '1.4rem',
                    },
                  }}
                  value={formatMoney(body?.estimated_fuel_cost)}
                  onChange={(ev) =>
                    setBody((state) => ({
                      ...state,
                      estimated_fuel_cost: unmaskMoney(ev.target.value),
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
                      const file = e.target.files[0];
                      if (file && file.type === 'text/xml') {
                        setBody((prev) => ({ ...prev, xmlFile: file }));
                      } else {
                        alert('Por favor, selecione um arquivo XML válido.');
                      }
                    }}
                  />
                  <DriveFileMoveIcon sx={{ width: '56px', height: '56px', color: '#1877F2' }} />
                </IconButton>

                {body?.xmlFile && (
                  <Grid container direction="column" alignItems="center" mt={1}>
                    <IconButton
                      component="label"
                      onClick={(e) => {
                        e.preventDefault();
                        setBody((prev) => ({ ...prev, xmlFile: null }));
                      }}
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

                      <HighlightOffIcon sx={{ width: '24px', height: '24px', cursor: 'pointer' }} />
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
                {t('button.send')}
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
