import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { 
  resetFormularioCaixa,
  getByIdFinancialBoxRequest,
  UpdateFinancialBoxRequest 
} from "../../../store/modules/financialBox/actions";
import { Container } from "./styles";
import { moneyMask } from "../../../util/mask";
import { IconButton } from "@material-ui/core";

import * as moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import Modal from "../../../components/modal/modal";

const ModalCaixaInfo = ({ showModal, setShowModal, id }) => {
  const dispatch = useDispatch(); 

  const { form } = useSelector((state) => state.financialBox);

  useEffect(() => {
    if (id) {
      dispatch(getByIdFinancialBoxRequest(id));
    }
  }, [id, dispatch]);

  const handleSubmit = async (values) => {
    const { close_caixa } = values
    const body = { status: true, close_caixa}

    try {
      dispatch(UpdateFinancialBoxRequest( form.id, body ));
      onCloseSales()
    } catch {
      toast.error('Error check data');
    } 
  };

  const onCloseSales = () => {
    setShowModal(false);
    dispatch(resetFormularioCaixa())
  };

  return (
    <Modal open={showModal} onClose={onCloseSales}>
      <Container>
        <IconButton 
          sx={{  
            width: '3rem!important',
            height: '3rem!important',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => onCloseSales()}
        >
          <CloseIcon
            sx={{
              width: '1.5em',
              height: '1.5em',
              cursor: 'pointer',
              background: "#353535",
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
              borderRadius: '50%',
            }}
          />
        </IconButton>
        <Form onSubmit={handleSubmit} initialData={form}>
          <div className="header-main">
            <div className="form">
              <div className="info1">
                <label htmlFor="open_caixa">Data abertura caixa</label>
                <span>{moment(form.open_caixa).format('DD/MM/YYYY')}</span>

                <label htmlFor="close_caixa">Data fechamento caixa</label>
                {form.status === false && (
                  <Input type={'date'} name="close_caixa" />
                )}
                {form.status === true && (
                  <span>{moment(form.close_caixa).format('DD/MM/YYYY')}</span>
                )}

                <label htmlFor="value_total">Valor total</label>
                <span>{moneyMask(form.value_total || [0])}</span>
              </div>

              <div className="info2">
                <label htmlFor="value_open">Valor abertura</label>
                <span>{moneyMask(form.value_open || [0])}</span>

                <label htmlFor="value_total_sales">Valor total vendas</label>
                <span>{moneyMask(form.value_total_sales || [0])}</span>

                <label htmlFor="value_total_service">
                  Valor total serviços
                </label>
                <span>{moneyMask(form.value_total_service || [0])}</span>
                <div className="check">
                  <Input name="status" type={'checkbox'} />
                </div>
              </div>

              <div className="button">
                {form.status === false && (
                  <button className="button-close" type="submit">Fechar caixa</button>
                )}
              </div>
            </div>
          </div>
        </Form>
      </Container>
    </Modal>
  );
}

export default ModalCaixaInfo;