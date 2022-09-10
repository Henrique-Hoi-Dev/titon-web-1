import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCardRequest } from "../../../store/modules/financialBox/actions";
import { moneyMask } from "../../../util/mask";
import { Container } from './styles'

import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PaidIcon from '@mui/icons-material/Paid';

export default function Card() {
  const dispatch = useDispatch();

  const { card } = useSelector((state) => state.financialBox);

  useEffect(() => {
      dispatch(getCardRequest())
  }, [dispatch]);

  return (
    <Container>
      <div className="cards">
        <PaidIcon />
        <hr />
        <div className="value">
          <h2>Valor vendas</h2>
          <strong>{moneyMask(card?.totalOrder || [0])}</strong>
        </div>
        <hr />
      </div>
      <div className="cards">
        <AttachMoneyIcon />
        <hr />
        <div className="value">
          <h2>Valor produtos</h2>
          <strong>{moneyMask(card?.totalProduct || [0])}</strong>
        </div>
        <hr />
      </div>
      <div className="cards">
        <InventoryIcon />
        <hr />
        <div className="value">
          <h2>Produtos em estoque</h2>
          <strong>{card?.totalQuantityProduct}</strong>
        </div>
        <hr />
      </div>
      <div className="cards">
        <AttachMoneyIcon />
        <hr />
        <div className="value">
          <h2>Valor serviços</h2>
          <strong>{moneyMask(card?.totalService || [0])}</strong>
        </div>
        <hr />
      </div>
    </Container>
  );
}