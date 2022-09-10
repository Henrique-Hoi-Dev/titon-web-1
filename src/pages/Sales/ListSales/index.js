import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Container } from './styles'
import { FcEmptyTrash } from 'react-icons/fc'
import { moneyMask } from '../../../util/mask'
import { findAllSalesRequest } from '../../../store/modules/sales/actions'
import { useMediaQuery } from 'react-responsive'

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import MouseOverPopover from '../../../components/MouseOverPopover'
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import ModalSalesEdit from '../modalSalesEdit/modalSales'
import ModalDelete from '../modalDelete/modalDelete'
import img from '../../../assets/empty.png'
import ModalSales from '../modalSales/modalSales'
import CardSales from '../CardSales'

const ListSales = ({ salesList }) => {
  const dispatch = useDispatch()

  const isMobile = useMediaQuery({ maxWidth: "700px" });

  const [showModal, setShowModal] = useState(false)
  const [showModalSales, setShowModalSales] = useState(false)
  const [showModalDelete, setModalShowDelete] = useState(false)

  const [salesId, setSalesId] = useState('')
  const [DeleteId, setDeleteId] = useState('')

  const user = useSelector((state) => state)

  useEffect(() => {
    if (salesId) {
      const inter = setInterval(() => {
        setSalesId('')
      }, 500)

      return () => clearInterval(inter)
    }
  }, [salesId, setSalesId])

  useEffect(() => {
    if (user?.id) {
      dispatch(findAllSalesRequest(user?.id))
    }
  }, [dispatch, user])

  return (
    <Container>
      <div className="header-main">
        <div className="more">
          <MouseOverPopover
            children={
              <AddCircleSharpIcon
                onClick={() => setShowModalSales(!showModalSales)}
                sx={{
                  height: '2em',
                  width: '2em',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
                  borderRadius: '50%',
                }}
              />
            }
            text={'Novo venda'}
          />
        </div>
        <div className="form-table">
          {salesList?.length > 0 && !isMobile && ( 
            <table>
              <thead>
                <tr>
                  <th style={{ width: '7rem' }}>Vendedor</th>
                  <th style={{ width: '7rem' }}>Produto</th>
                  <th
                    style={{
                      maxWidth: '3rem',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'normal',
                    }}
                  >
                    Quantidade
                  </th>
                  <th style={{ width: '7rem' }}>Valor</th>
                  <th
                    style={{
                      maxWidth: '3rem',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'normal',
                    }}
                  >
                    Desconto
                  </th>
                  <th style={{ maxWidth: '3rem' }}>Status</th>
                  <th>Imagem</th>
                  <th style={{ width: '5rem' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {[].concat(salesList).map((sales, i) => (
                  <tr key={i} value={sales?.id}>
                    <td>{sales?.user.name}</td>
                    <td>{sales?.name_product}</td>
                    <td>{sales?.product_quantity}</td>
                    <td>{moneyMask(sales?.price_total || [0])}</td>
                    <td>{sales?.discount}%</td>
                    <td
                      style={{
                        fontWeight: 'bold',
                        color:
                          (sales?.status === 'open' && '#2ecc71') ||
                          (sales?.status === 'closed' && 'red') ||
                          (sales?.status === 'sold' && 'orange'),
                      }}
                    >
                      {sales?.status}
                    </td>
                    <td className="avatar">
                      <img
                        src={
                          sales?.products?.avatar ? sales?.products?.avatar?.url : img
                        }
                        alt="avatar"
                        className="avatar"
                      />
                    </td>
                    <td className="edit">
                      {sales?.status === 'open' && (
                        <MouseOverPopover
                          children={
                            <ProductionQuantityLimitsIcon
                              sx={{ marginRight: '5px' }}
                              onClick={() =>
                                setShowModal(!showModal) || setSalesId(sales.id)
                              }
                            />
                          }
                          text={'Editar / Finalizar Venda'}
                        />
                      )}
                      {(sales?.status === 'open' || sales?.status === 'sold') && (
                        <MouseOverPopover
                          children={
                            <FcEmptyTrash
                              onClick={() =>
                                setModalShowDelete(!showModalDelete) ||
                                setDeleteId(sales?.id)
                              }
                            />
                          }
                          text={'Excluir'}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>            
          )}
          
          {isMobile && [].concat(salesList).map((sales, i) => (
            <CardSales 
              key={i}
              props={sales}
            />
          ))}          

          {salesList?.length === 0 && (
            <div className="error">
              <h3>Nenhuma venda em aberto foi encontrado!</h3>
            </div>
          )}
        </div>
      </div>

      <ModalSales
        showModal={showModalSales}
        setShowModal={setShowModalSales}
        // ids={productId}
      />

      <ModalSalesEdit
        showModal={showModal}
        setShowModal={setShowModal}
        ids={salesId}
      />

      <ModalDelete
        setShowModal={setModalShowDelete}
        showModal={showModalDelete}
        ids={DeleteId}
      />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    salesList: state.sales.salesList ? state.sales.salesList : [],
  }
}

export default connect(mapStateToProps)(ListSales)
