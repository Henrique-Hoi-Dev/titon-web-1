import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  resetFormulario,
  findAllFinancialBoxSuccess,
  createFinancialBoxRequest 
} from '../../store/modules/financialBox/actions';
import { formatMoney, unmaskMoney } from '../../util/mask';
import { Container } from './styles';

import Header from '../../components/Header';
import ListCaixa from './ListCaixa';
import ListCaixaOpen from './ListCaixaOpen';

const Caixa = ({ financialBoxListOpen }) => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [data, setData] = useState({})

  useEffect(() => {
    if (id) {
      dispatch(findAllFinancialBoxSuccess(id));
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    try {
      dispatch(createFinancialBoxRequest(id, data));
      dispatch(resetFormulario());
    } catch {
      toast.error('Error check data');
    }
  };

  return (
    <>
      <Header title="Caixa" />

      {financialBoxListOpen?.length === 0 && (
        <Container>
          <h2>Abertuta de caixa</h2>
          <Form onSubmit={handleSubmit}>
            <div className="data">
              <label>Data</label>
              <Input
                name="open_caixa"
                type="date"
                value={data?.open_caixa ?? ""}
                onChange={(ev) => {
                  ev.persist();
                  setData((state) => ({
                    ...state,
                    open_caixa: ev.target.value,
                  }));
                }}
              />
            </div>
            <div className="valor-open">
              <label>Valor</label>
              <Input
                name="value_open"
                value={formatMoney(data?.value_open) ?? ''}
                onChange={(ev) => {
                  ev.persist();
                  setData((state) => ({
                    ...state,
                    value_open: unmaskMoney(ev.target.value),
                  }));
                }}
              />
            </div>
            <div className="but">
              <button type="submit">Abrir um novo caixa</button>
            </div>
          </Form>
        </Container>
      )}

      <ListCaixaOpen ids={id} />
      <ListCaixa ids={id} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    financialBoxListOpen: state.financialBox.financialBoxListOpen ? state.financialBox.financialBoxListOpen : [],
  };
};

export default connect(mapStateToProps) (Caixa);

