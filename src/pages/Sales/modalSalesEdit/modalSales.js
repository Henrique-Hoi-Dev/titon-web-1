import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { 
  UpdateSalesRequest, 
  getByIdSalesRequest,
  resetFormularioSales } from '../../../store/modules/sales/actions';
import { Container } from './styles';

import Modal from '../../../components/modal/modal'
import CloseIcon from '@mui/icons-material/Close';
import InputAutocomplete from '../../../components/select/select';

export default function ModalSales({ showModal, setShowModal, ids }) {
  const dispatch = useDispatch();

  const { formSales } = useSelector((state) => state?.sales);

  const [body, setBody] = useState({})
  
  const arrayStatus = [
    { value: 'open', label: 'Em Aberto' },
    { value: 'closed', label: 'Cancelar' },
    { value: 'sold', label: 'Vendido' },
  ];

  const getArrayStatus = () => arrayStatus.find((item) => item.value === body.status) ?? null

  useEffect(() => {
    if (ids) {
      dispatch(getByIdSalesRequest(ids));
    }
  }, [ids, dispatch]);

  useEffect(() => {
    setBody((state) => ({
      ...state,
      product_id: formSales?.product_id,
      product_quantity: formSales?.product_quantity ?? 0,
      discount: formSales?.discount ?? 0,
      status: formSales?.status,
    }));
  }, [formSales]);
  
  const handleSubmit = async () => {
    dispatch(UpdateSalesRequest(body, formSales.id));
    onCloseSales()
  };

  const handleQuantity = (ev) => {
    ev.persist();
    setBody((state) => ({
      ...state,
      product_quantity: ev.target.value,
    }));
  };

  const handleDiscount = (ev) => {
    ev.persist();
    setBody((state) => ({
      ...state,
      discount: ev.target.value,
    }));
  };

  const onCloseSales = () => {
    setShowModal(false);
    dispatch(resetFormularioSales())
  };

  return (
    <Modal open={showModal} onClose={onCloseSales}>
      <Container>
        <div className="header">
          <CloseIcon
            sx={{
              width: '1.5em',
              height: '1.5em',
              marginTop: '20px',
              cursor: 'pointer',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
            }}
            onClick={onCloseSales}
          />
          <h1>Editar / finalizar Venda</h1>
        </div>

        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={formSales}
        >
          <Form>
            <div className="status">
              <label htmlFor="status">Status de Venda</label>
              <InputAutocomplete
                options={arrayStatus ?? []}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value}
                value={getArrayStatus() ?? null}
                onChange={(event, newValue) => {
                  setBody((state) => ({
                    ...state,
                    status: newValue?.value,
                  }));
                }}
              />
            </div>

            <div className="tipo-venda">
              <label htmlFor="discount">% Desconto</label>
              <Field
                name="discount"
                // type="number"
                value={body?.discount ?? 0}
                onChange={handleDiscount}
              />

              <label htmlFor="product_quantity">Quantidade</label>
              <Field
                name="product_quantity"
                // type="number"
                value={body?.product_quantity ?? 0}
                onChange={handleQuantity}
              />
            </div>

            <div className="but">
              <button type="submit">Confirmar venda</button>
            </div>
          </Form>
        </Formik>
      </Container>
    </Modal>
  );
}
