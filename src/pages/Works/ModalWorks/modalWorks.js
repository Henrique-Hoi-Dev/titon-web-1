import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FcHighPriority } from 'react-icons/fc';
import { Container } from './styles';
import {
  createServicetRequest,
  findAllServiceRequest,
  resetFormulario } from '../../../store/modules/works/actions';
import { findAllOpenRequest } from '../../../store/modules/financialBox/actions';
import { formatMoney, unmaskMoney } from '../../../util/mask';

import * as moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '../../../components/modal/modal';
  
const ModalWorks = ({ showModal, setShowModal, financialBoxListOpen,  }) => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.works);
  
  const { id } = useSelector((state) => state.user.profile);

  const [data, setData] = useState({})

  useEffect(() => {
    dispatch(findAllOpenRequest(id));
    dispatch(resetFormulario());
  }, [id, dispatch]);

  const handleSubmit = async () => {
    dispatch(createServicetRequest(data, id));
    dispatch(findAllServiceRequest(id))
    setShowModal(false);
    setData({})
  };

  const onClose = () => {    
    setShowModal(false);
    dispatch(resetFormulario())
  };

  return (
    <Modal open={showModal} onClose={onClose} maxWidth={'700px!important'}>
      <Container>
        <CloseIcon
          sx={{
            width: '1.5em',
            height: '1.5em',
            margin: '20px 0 -10px 62px',
            cursor: 'pointer',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
            borderRadius: '50%',
          }}
          onClick={onClose}
        />
        <div className="header-main">
          <Formik
            onSubmit={handleSubmit}
            enableReinitialize={true}
            initialValues={form}
          >
            <Form className="form-input">
              <div id="container-input" className="header-title">
                <div className="campo2">
                  <label htmlFor="name">Nome do Serviço</label>
                  <Field
                    name="name"
                    value={data?.name ?? ''}
                    onChange={(ev) => {
                      ev.persist();
                      setData((state) => ({
                        ...state,
                        name: ev.target.value,
                      }));
                    }}
                  />

                  <label htmlFor="price">Valor</label>
                  <Field
                    name="price"
                    value={formatMoney(data?.price)}
                    onChange={(ev) => {
                      ev.persist();
                      setData((state) => ({
                        ...state,
                        price: unmaskMoney(ev.target.value),
                      }));
                    }}
                  />
                </div>

                <div className="campo">
                  <label htmlFor="financial_id">Caixa</label>
                  <Field
                    component="select"
                    name="financial_id"
                    value={data?.financial_id}
                    onChange={(ev) => {
                      ev.persist();
                      setData((state) => ({
                        ...state,
                        financial_id: ev.target.value,
                      }));
                    }}
                  >
                    <option value="0">Selecione um caixa</option>
                    {[].concat(financialBoxListOpen).map((caixa, i) => (
                      <option key={i} value={caixa.id}>
                        {moment(caixa.open_caixa).format('DD/MM/YYYY')} /
                        {caixa.status === false && 'Aberto'}
                      </option>
                    ))}
                  </Field>

                  <label htmlFor="date_service">Dia do serviço feito</label>
                  <Field
                    name="date_service"
                    type="date"
                    value={data?.date_service}
                    onChange={(ev) => {
                      ev.persist();
                      setData((state) => ({
                        ...state,
                        date_service: ev.target.value,
                      }));
                    }}
                  />
                </div>

                <footer className="buttons-container">
                  <p>
                    <FcHighPriority />
                    Preencha todos os dados!
                  </p>
                  <button type="submit">Salvar</button>
                </footer>
              </div>
            </Form>
          </Formik>
        </div>
      </Container>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxListOpen: state.financialBox.financialBoxListOpen ? state.financialBox.financialBoxListOpen : [],
  };
};

export default connect(mapStateToProps) (ModalWorks)