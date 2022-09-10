import React, { useEffect, useState } from 'react';
import { FcEmptyTrash } from 'react-icons/fc';
import { capitalizeFirst, moneyMask } from '../../../util/mask';
import { Container } from './styles';

import MouseOverPopover from '../../../components/MouseOverPopover';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import ModalSales from '../modalSalesEdit/modalSales';
import ModalDelete from '../modalDelete/modalDelete'

export default function CardSales({ props }) {

  const [showModalSales, setShowModalSales] = useState(false)
  const [showModalDelete, setModalShowDelete] = useState(false)

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
          <img src={props?.products?.avatar?.url} alt="img" />
        </div>
        <hr />
        <div className="area-1">
          <hr />
          <h2>Vendedor</h2>
          <strong>{props?.user?.name}</strong>
        </div>
        <div className="area-2">
          <hr />
          <h2>Produto</h2>
          <strong>{capitalizeFirst(props?.name_product)}</strong>
        </div>
        <div className="area-3">
          <hr />
          <h2
            style={{
              maxWidth: '5rem',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'normal',
            }}
          >
            Quantidade
          </h2>
          <strong>{props?.product_quantity || [0]}</strong>
        </div>
        <hr />
        <div className="area-4">
          <hr />
          <h2>Valor</h2>
          <strong>{moneyMask(props?.price_total)}</strong>
        </div>
        <div className="area-6">
          <hr />
          <h2>Desconto</h2>
          <strong>{props?.discount}%</strong>
          <hr />
        </div>
        <div className="area-7">
          <hr />
          <h2>Status</h2>
          <strong
            style={{
              fontWeight: 'bold',
              color:
                (props?.status === 'open' && '#2ecc71') ||
                (props?.status === 'closed' && 'red') ||
                (props?.status === 'sold' && 'orange'),
            }}
          >
            {props?.status}
          </strong>
          <hr />
        </div>
        <div className="area-5">
          <div className="editProduct">
            <MouseOverPopover
              children={
                <ProductionQuantityLimitsIcon
                  style={{ cursor: 'pointer', color: "white" }}
                  onClick={() =>
                    setShowModalSales(!showModalSales) ||
                    setproductId(props?.id)
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
                    setproductDeleteId(props?.id)
                  }
                />
              }
              text="Excluir"
            />
          </div>
        </div>
      </div>

      <ModalSales
        setShowModal={setShowModalSales}
        showModal={showModalSales}
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
