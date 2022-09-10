import React from 'react';

import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/modal';

import { FcFullTrash, FcRedo } from 'react-icons/fc';

import { Container } from './styles';
import {
  deleteSalesRequest,
  resetFormulario,
} from '../../../store/modules/sales/actions';

export default function ModalDelete({ showModal, setShowModal, ids }) {
  const dispatch = useDispatch();

  const handleSubmit = async (id) => {
    dispatch(deleteSalesRequest(id));
    setShowModal(false);
  };

  const onClose = () => {
    setShowModal(false);
    dispatch(resetFormulario());
  };

  return (
    <Modal open={showModal} onClose={onClose} maxWidth={'510px'}>
      <Container>
        <h1>Deseja excluir venda ?</h1>
        <div className="buttons">
          <button onClick={() => handleSubmit(ids)}>
            Excluir Venda <FcFullTrash />
          </button>
          <button onClick={() => onClose()}>
            Voltar... <FcRedo />
          </button>
        </div>
      </Container>
    </Modal>
  );
}
