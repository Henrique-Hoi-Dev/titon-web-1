import React, { useEffect, useState } from 'react';
import { moneyMask } from '../../../../util/mask';
import { Container } from './styles';
import { FcEmptyTrash } from 'react-icons/fc';

import MouseOverPopover from '../../../../components/MouseOverPopover';
import moment from 'moment';
import ModalDelete from 'pages/Sales/modalDelete/modalDelete';

export default function Card({ props }) {
  const [showModal, setModalShow] = useState(false);
  const [worksDeleteId, setWorksDeleteId] = useState('')

  useEffect(() => {
    if (worksDeleteId) {
      const inter = setInterval(() => {
        setWorksDeleteId('');
      }, 500);

      return () => clearInterval(inter);
    }
  }, [worksDeleteId, setWorksDeleteId]);

  return (
    <Container>
      <div className="cards">
        <div className="area-1">
          <h2>Funcionario</h2>
          <strong>{props?.user?.name}</strong>
        </div>

        <div className="area-2">
          <h2>Tipo Serviço</h2>
          <strong>{props.name}</strong>
        </div>
        
        <div className="area-3">
          <hr />
          <h2>Valor serviço</h2>
          <strong>
          {moneyMask(props.price)}
          </strong>
        </div>

        <div className="area-4">
          <hr />
          <h2>Data serviço</h2>
          <strong>{moment(props.date_service).format('DD/MM/YYYY')}</strong>
        </div>
        <div className="area-5">
          <MouseOverPopover
            children={
              <FcEmptyTrash
                onClick={() =>
                  setWorksDeleteId(props.id) ||
                  setModalShow(true)
                }
              />
            }
            text={'Excluir'}
          />
        </div>
      </div>

      <ModalDelete
        showModal={showModal}
        setShowModal={setModalShow}
        id={worksDeleteId}
      />
    </Container>
  );
}
