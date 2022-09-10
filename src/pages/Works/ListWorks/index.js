import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FcEmptyTrash } from 'react-icons/fc';
import { moneyMask } from '../../../util/mask';
import { findAllServiceRequest } from '../../../store/modules/works/actions';
import { Container } from './styles';
import { useMediaQuery } from 'react-responsive';  

import * as moment from 'moment';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ModalWorks from '../ModalWorks/modalWorks';
import ModalDelete from '../modalDelete/modalDelete';
import Header from '../../../components/Header';
import MouseOverPopover from '../../../components/MouseOverPopover';
import Card from './Card';

const ListSales = ({ worksList }) => {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery({ maxWidth: "900px" });

  const [showModal, setShowModal] = useState(false)
  const [showModalDelete, setModalShowDelete] = useState(false)

  const [worksDeleteId, setWorksDeleteId] = useState('')

  const user = useSelector((state) => state.user.profile);

  useEffect(() => {
    function onLoad() {
      dispatch(findAllServiceRequest(user.id));
    }
    onLoad();
  }, [dispatch, user]);

  return (
    <Container>
      <Header title="Serviços" />
      <div className="header-main">
        <div className="more">
          <MouseOverPopover
            children={
              <AddCircleSharpIcon
                onClick={() => setShowModal(!showModal)}
                sx={{
                  height: '2em',
                  width: '2em',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
                  borderRadius: '50%',
                }}
              />
            }
            text={'Novo serviço'}
          />
        </div>
        <form className="form-table">
          {!isMobile && worksList?.length > 0 && (
            <table className="table-list">
              <thead>
                <tr className="table-title">
                  <th>Funcionário</th>
                  <th>Tipo de serviço</th>
                  <th>Valor serviço</th>
                  <th>Data do serviço</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {[].concat(worksList).map((servico, i) => (
                  <tr key={i} value={servico.id}>
                    <td>{user.name}</td>
                    <td>{servico.name}</td>
                    <td>{moneyMask(servico.price)}</td>
                    <td>{moment(servico.date_service).format('DD/MM/YYYY')}</td>
                    <td>
                      <MouseOverPopover
                        children={
                          <FcEmptyTrash
                            onClick={() =>
                              setWorksDeleteId(servico.id) ||
                              setModalShowDelete(true)
                            }
                          />
                        }
                        text={'Excluir'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {worksList?.length === 0 && (
            <div className="error">
              <h3>Nenhum serviço foi encontrado!</h3>
            </div>
          )}

          {isMobile && [].concat(worksList).map((financial, i) => (
            <Card
              key={i}
              props={financial}
            />
          ))}

        </form>
      </div>

      <ModalWorks 
        showModal={showModal} 
        setShowModal={setShowModal} 
      />

      <ModalDelete
        setShowModal={setModalShowDelete}
        showModal={showModalDelete}
        ids={worksDeleteId}
      />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    worksList: state.works.worksList ? state.works.worksList : [],
  };
};

export default connect(mapStateToProps)(ListSales);
