import React, { useEffect, useState } from 'react';
import { FcEmptyTrash, FcEditImage } from 'react-icons/fc';
import { capitalizeFirst, moneyMask } from '../../../util/mask';
import { Container } from './styles';

import ModalRegistrationProduct from './modalRegistrationProduct/modalRegistrationProduct';
import ModalDelete from './modalDelete/modalDelete';
import MouseOverPopover from '../../../components/MouseOverPopover';
import Carousel from 'components/carousel/carousel';

export default function CardProduct(props) {

  const [showModalProduct, setModalShowProduct] = useState(false);
  const [showModalDelete, setModalShowDelete] = useState(false);

  const [productId, setproductId] = useState('');
  const [productDeleteId, setproductDeleteId] = useState('');

  useEffect(() => {
    if (productId) {
      const inter = setInterval(() => {
        setproductId('');
      }, 500);

      return () => clearInterval(inter);
    }
  }, [productId, setproductId]);

  return (
    <Container>
      <div className="cards">
        <div className="avatar">
          <Carousel 
            images={props?.img?.map((res) => res)}
          />
        </div>
        <hr />
        <div className="area-1">
          <hr />
          <h2>Nome</h2>
          <strong>{props.name}</strong>
        </div>
        <div className="area-2">
          <hr />
          <h2>Descrição</h2>
          <strong>{capitalizeFirst(props.description)}</strong>
        </div>
        <div className="area-3">
          <hr />
          <h2>Valor</h2>
          <strong>{moneyMask(props.valor)}</strong>
          <hr />
        </div>
        <hr />
        <div className="area-4">
          <hr />
          <h2>Quantidade</h2>
          <strong>{props.quantidade}</strong>
          <hr />
        </div>
        <div className="area-5">
          <div className="editProduct">
            <MouseOverPopover
              children={
                <FcEditImage
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setModalShowProduct(!showModalProduct) ||
                    setproductId(props.id)
                  }
                />
              }
              text="Editar"
            />
          </div>

          <div className="delete">
            <MouseOverPopover
              children={
                <FcEmptyTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setModalShowDelete(!showModalDelete) ||
                    setproductDeleteId(props.id)
                  }
                />
              }
              text="Excluir"
            />
          </div>
        </div>
      </div>

      <ModalRegistrationProduct
        setShowModal={setModalShowProduct}
        showModal={showModalProduct}
        ids={productId}
      />

      <ModalDelete
        setShowModal={setModalShowDelete}
        showModal={showModalDelete}
        ids={productDeleteId}
      />
    </Container>
  );
}
