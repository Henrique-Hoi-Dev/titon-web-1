import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FcInfo } from 'react-icons/fc';
import { moneyMask } from '../../../util/mask';
import { Container } from './styles';
import { findAllOpenRequest } from '../../../store/modules/financialBox/actions';
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import * as moment from 'moment';
import ModalCaixaInfo from '../ModalCaixaInfo/modalCaixaInfo';
import Card from './Card';

const ListCaixa = ({ financialBoxListOpen, ids }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: "900px" });

  const [showModal, setModalShow] = useState(false);
  const [caixaOpenId, setCaixaOpenId] = useState('');

  useEffect(() => {
    if (caixaOpenId) {
      const inter = setInterval(() => {
        setCaixaOpenId('');
      }, 500);

      return () => clearInterval(inter);
    }
  }, [caixaOpenId, setCaixaOpenId]);

  useEffect(() => {
    if (ids) {
      dispatch(findAllOpenRequest(ids));
    }
  }, [ids, dispatch]);

  return (
    <>
      <Container>
        <h2>Caixa em aberto</h2>
        {!isMobile && (financialBoxListOpen?.length < 0 ||
          financialBoxListOpen?.status === false) && (
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Funcionario</td>
                <td>Data abertura</td>
                <td>Data fechamento</td>
                <td>Valor abertura</td>
                <td>Valor vendas</td>
                <td>Valor serviços</td>
                <td>Valor total</td>
                <td>Status</td>
                <td>Info</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(financialBoxListOpen).map((financial, i) => (
                <tr key={i} value={financial.id}>
                  <td>{financial?.user?.name}</td>
                  <td>{moment(financial?.open_caixa).format('DD/MM/YYYY')}</td>
                  <td>
                    {financial?.close_caixa === null
                      ? 'Em espera...'
                      : moment(financial?.close_caixa).format('DD/MM/YYYY')}
                  </td>
                  <td>{moneyMask(financial?.value_open || [0])}</td>
                  <td>{moneyMask(financial?.value_total_sales || [0])}</td>
                  <td>{moneyMask(financial?.value_total_service || [0])}</td>
                  <td>{moneyMask(financial?.value_total || [0])}</td>
                  <td
                    style={{
                      color:
                        (financial?.status === true && 'red') ||
                        (financial?.status === false && 'green'),
                    }}
                  >
                    {(financial?.status === true && 'Fechado') ||
                      (financial?.status === false && 'Em aberto')}
                  </td>
                  <td>
                    <FcInfo
                      onClick={() =>
                        setModalShow(!showModal) || setCaixaOpenId(financial.id)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {financialBoxListOpen?.length === 0 && (
          <div className="error">
            <h3>Nenhum caixa aberto foi encontrado!</h3>
          </div>
        )}

        <ModalCaixaInfo
          showModal={showModal}
          setShowModal={setModalShow}
          id={caixaOpenId}
        />
      </Container>

      {isMobile && [].concat(financialBoxListOpen).map((financial, i) => (
        <Card
          key={i}
          props={financial}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    financialBoxListOpen: state.financialBox.financialBoxListOpen
      ? state.financialBox.financialBoxListOpen
      : [],
  };
};

export default connect(mapStateToProps) (ListCaixa);
