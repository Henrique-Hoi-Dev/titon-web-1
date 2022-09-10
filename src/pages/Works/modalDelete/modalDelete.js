import React from 'react';

import { useDispatch } from 'react-redux';
import {
  deleteServiceRequest,
  resetFormulario } from '../../../store/modules/works/actions';

import Modal from '../../../components/modal/modal';

import { FcFullTrash, FcRedo } from 'react-icons/fc'

import { Container } from './styles';

export default function ModalDelete({ showModal, setShowModal, ids }) {
  const dispatch = useDispatch();

  const handleSubmit = async (id) => {
    dispatch(deleteServiceRequest(id));
    setShowModal(false);
  };

  const onCloseProduct = () => {
    setShowModal(false);
    dispatch(resetFormulario())
  };

  return (
    <Modal 
      open={showModal}
      onClose={onCloseProduct}
      maxWidth={"510px"}
    >
      <Container>
      <h1>Deseja excluir esse serviço ?</h1>
        <div className="buttons">
          <button onClick={() => handleSubmit(ids)}>
            Excluir serviço <FcFullTrash />
          </button>
          <button onClick={() => onCloseProduct()}>
            Voltar... <FcRedo />
          </button>  
        </div> 
      </Container>
    </Modal>
  );
}
