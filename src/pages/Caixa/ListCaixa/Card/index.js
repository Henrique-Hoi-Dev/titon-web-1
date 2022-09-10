import React, { useEffect, useState } from 'react';
import { moneyMask } from '../../../../util/mask';
import { Container } from './styles';
import { FcInfo } from 'react-icons/fc';

import MouseOverPopover from '../../../../components/MouseOverPopover';
import ModalCaixaInfo from '../../ModalCaixaInfo/modalCaixaInfo';
import moment from 'moment';

export default function Card({ props }) {

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

  return (
    <Container>
      <div className="cards">
        <div className="area-1">
          <hr />
          <h2>Funcionario</h2>
          <strong>{props?.user?.name}</strong>
        </div>

        <div className="area-2">
          <hr />
          <h2>Abertura</h2>
          <strong>{moment(props?.open_caixa).format('DD/MM/YYYY')}</strong>
        </div>
        
        <div className="area-3">
          <hr />
          <h2
            style={{
              maxWidth: '6rem',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'normal',
            }}
          >
            Fechamento
          </h2>
          <strong>
            {props?.close_caixa === null ? 'Em espera...' : moment(props?.close_caixa).format('DD/MM/YYYY')}
          </strong>
        </div>

        <div className="area-4">
          <hr />
          <h2>Valor abertura</h2>
          <strong>{moneyMask(props?.value_open || [0])}</strong>
        </div>

        <div className="area-6">
          <hr />
          <h2>Valor vendas</h2>
          <strong>{moneyMask(props?.value_total_sales || [0])}</strong>
        </div>

        <div className="area-7">
          <hr />
          <h2>Valor serviços</h2>
          <strong>{moneyMask(props?.value_total_service || [0])}</strong>
        </div>

        <div className="area-8">
          <hr />
          <h2>Valor total</h2>
          <strong>{moneyMask(props?.value_total || [0])}</strong>
        </div>
        
        <div className="area-9">
          <hr />
          <h2>Status</h2>
          <strong
            style={{
              color:
                (props?.status === true && 'red') ||
                (props?.status === false && 'green'),
            }}
          >
            {(props?.status === true && 'Fechado') || (props?.status === false && 'Em aberto')}
          </strong>
        </div>
        <div className="area-5">
          <MouseOverPopover
            children={
              <FcInfo
                style={{ cursor: 'pointer', color: "white" }}
                onClick={() =>
                  setModalShow(!showModal) || setCaixaOpenId(props.id)
                }
              />
            }
            text="Editar"
          />
        </div>
      </div>

      <ModalCaixaInfo
        showModal={showModal}
        setShowModal={setModalShow}
        id={caixaOpenId}
      />
    </Container>
  );
}
