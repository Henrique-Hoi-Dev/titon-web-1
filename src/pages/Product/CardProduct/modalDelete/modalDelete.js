import React from 'react';

import { useDispatch } from 'react-redux';
import {
  deleteProductRequest,
  resetFormularioProduct } from '../../../../store/modules/product/actions';

import Modal from '../../../../components/modal/modal';

import { FcFullTrash, FcRedo } from 'react-icons/fc'

import { Container } from './styles';

export default function ModalDelete({ showModal, setShowModal, ids }) {
  const dispatch = useDispatch();

  const handleSubmit = async (id) => {
    dispatch(deleteProductRequest(id));
    setShowModal(false);
  };

  const onCloseProduct = () => {
    setShowModal(false);
    dispatch(resetFormularioProduct())
  };

  return (
    <Modal 
      open={showModal}
      onClose={onCloseProduct}
      maxWidth={"510px"}
    >
      <Container>
      <h1>Deseja excluir produto ?</h1>
        <div className="buttons">
          <button onClick={() => handleSubmit(ids)}>
            Excluir Venda <FcFullTrash />
          </button>
          <button onClick={() => onCloseProduct()}>
            Voltar... <FcRedo />
          </button>  
        </div> 
      </Container>
    </Modal>
  );
}
