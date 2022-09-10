import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FcInfo } from 'react-icons/fc';
import { Container } from './styles';
import { moneyMask } from '../../../util/mask';
import { connect } from 'react-redux';
import { 
  findAllFinancialBoxRequest,
  resetFormularioCaixa 
} from '../../../store/modules/financialBox/actions';
import { useMediaQuery } from 'react-responsive';

import * as moment from 'moment';
import ModalCaixaInfo from '../ModalCaixaInfo/modalCaixaInfo';
import Card from './Card';

const ListCaixa = ({ financialBoxList, ids }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: "900px" });

  const [showModal, setModalShow] = useState(false)
  const [caixaClosedId, setCaixaClosedId] = useState('')

  useEffect(() => {
    if (caixaClosedId) {
      const inter = setInterval(() => {
        setCaixaClosedId('')
      }, 500);

      return () => clearInterval(inter)
    }
  }, [caixaClosedId, setCaixaClosedId]);

  useEffect(() => {
    if (ids) {
      dispatch(findAllFinancialBoxRequest(ids));
      dispatch(resetFormularioCaixa())
    } 
  }, [ids, dispatch]);

  return (
    <>
      <Container>
        <ModalCaixaInfo 
          showModal={showModal}
          setShowModal={setModalShow}
          id={caixaClosedId}
        />   
        <h2>Histórico caixa</h2>

        {!isMobile && (financialBoxList?.length > 0) && (
          <table className="table-list">
            <thead>
              <tr className="table-title">
                <td>Funcionario</td>
                <td>Data abertura</td>
                <td>Data fechamento</td>
                <td>Valor abertuta</td>
                <td>Valor vendas</td>
                <td>Valor serviços</td>
                <td>Valor total</td>
                <td>Status</td>
                <td>Info</td>
              </tr>
            </thead>
            <tbody>
              {[].concat(financialBoxList).map((financial, i) => (
                <tr key={i} value={financial.id} >
                  <td>{financial?.user?.name}</td>
                  <td>{moment(financial?.open_caixa).format('DD/MM/YYYY')}</td>
                  <td>
                    {(financial?.close_caixa === null) ? 'Em espera...' :
                    moment(financial?.close_caixa).format('DD/MM/YYYY')}
                  </td>
                  <td>{moneyMask(financial?.value_open || [0])}</td>
                  <td>{moneyMask(financial?.value_total_sales || [0])}</td>
                  <td>{moneyMask(financial?.value_total_service || [0])}</td>
                  <td>{moneyMask(financial?.value_total || [0])}</td>
                  <td 
                    style={{ color: (financial?.status === true && 'red') || 
                    (financial?.status === false && 'green') }} 
                  >
                    {(financial?.status === true && 'Fechado') || 
                    (financial?.status === false && 'Em aberto')}
                  </td>
                  <td>
                    <FcInfo onClick={() => setModalShow(!showModal)|| setCaixaClosedId(financial?.id)}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {financialBoxList?.length === 0 && (
          <div className="error">
            <h3>Nenhum caixa aberto foi encontrado!</h3>
          </div>
        )}
      </Container>  

      {isMobile && [].concat(financialBoxList).map((financial, i) => (
        <Card
          key={i}
          props={financial}
        />
      ))}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    financialBoxList: state.financialBox.financialBoxList ? state.financialBox.financialBoxList : [],
  };
};

export default connect(mapStateToProps) (ListCaixa);
