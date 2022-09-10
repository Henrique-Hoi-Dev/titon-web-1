import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  createSalesRequest,
  resetFormulario,
} from '../../../store/modules/sales/actions';
import { findAllOpenRequest } from '../../../store/modules/financialBox/actions';
import { Container } from './styles';
import { moneyMask } from '../../../util/mask';
import {
  findAllProductRequest,
  resetFormularioProduct,
  getByIdProductRequest,
} from '../../../store/modules/product/actions';

import Modal from '../../../components/modal/modal';
import * as moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import InputAutocomplete from '../../../components/select/select';

const ModalSales = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const { form } = useSelector((state) => state.sales);

  const [productId, setProductId] = useState(null);
  const [body, setBody] = useState([]);

  const { financialBoxListOpen } = useSelector((state) => state.financialBox);
  const { profile } = useSelector((state) => state.user);
  const { productList } = useSelector((state) => state.product);
  console.log(productList)

  const product = useSelector((state) => state.product.form);

  useEffect(() => {
    dispatch(findAllProductRequest());
    if (profile?.id) {
      dispatch(findAllOpenRequest(profile?.id));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (productId) {
      dispatch(getByIdProductRequest(productId));
    }
    setProductId(null);
    setBody((state) => ({
      ...state,
      financial_id: financialBoxListOpen?.id,
      name_product: product?.name,
      price_product: product?.price,
      product_quantity: product?.quantity ?? '',
      discount: 0 ?? '',
      status: 'open',
    }));
  }, [productId, financialBoxListOpen, product, dispatch]);

  const handleSubmit = async () => {
    dispatch(createSalesRequest(body, product?.id));
    dispatch(resetFormularioProduct());
    dispatch(resetFormulario());
    setShowModal(false);
  };

  const onCloseSales = () => {
    setShowModal(false);
    dispatch(resetFormularioProduct());
    dispatch(resetFormulario());
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

  return (
    <Modal open={showModal} onClose={onCloseSales} maxWidth={'700px!important'}>
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
          <h1>Nova Venda</h1>
        </div>

        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={form}
        >
          <Form>
            <div className="status">
              <label htmlFor="name_product">Produtos</label>
              <InputAutocomplete
                options={productList?.products ?? []}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setProductId(newValue?.id);
                  }
                  if (newValue === null) {
                    setBody((state) => ({
                      ...state,
                      name_product: '',
                      price_product: '',
                      product_quantity: 0,
                    }));
                  }
                }}
              />
              <label htmlFor="product_quantity">Quantidade</label>
              <Field
                name="product_quantity"
                // type="number"
                value={body?.product_quantity ?? ''}
                onChange={handleQuantity}
              />
            </div>

            <div className="tipo-venda">
              <label htmlFor="financial_id">Caixa</label>
              <Field
                component="select"
                name="financial_id"
                value={body?.financial_id}
              >
                <option value="0">Selecione um caixa</option>
                {[].concat(financialBoxListOpen).map((caixa, i) => (
                  <option key={i} value={caixa?.id}>
                    {moment(caixa?.open_caixa).format('DD/MM/YYYY')} /
                    {caixa?.status === false && 'Aberto'}
                  </option>
                ))}
              </Field>
              <label htmlFor="discount">Desconto %</label>
              <Field
                name="discount"
                // type="number"
                value={body?.discount ?? ''}
                onChange={handleDiscount}
              />
            </div>

            <div className="tipo-venda-1">
              <label htmlFor="price_product">Valor Produto</label>
              <h2>{moneyMask(body?.price_product) || [0]}</h2>
            </div>

            <div className="tipo-venda-2">
              <label htmlFor="status">Status Venda</label>
              <h2>{body?.status}</h2>
            </div>

            <div className="but">
              <button type="submit">Confirmar venda</button>
            </div>
          </Form>
        </Formik>
      </Container>
    </Modal>
  );
};

export default ModalSales;
