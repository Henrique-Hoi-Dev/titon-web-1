import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { findAllProductRequest  } from '../../store/modules/product/actions';
import { Container } from './styles';
import { Typography } from '@material-ui/core';

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import img from '../../assets/empty.png'
import ModalRegistrationProduct from './CardProduct/modalRegistrationProduct/modalRegistrationProduct'
import Header from '../../components/Header';
import CardProduct from './CardProduct';
import MouseOverPopover from '../../components/MouseOverPopover';
import Paginations from 'components/pagination/pagination';

const ProductList = ({ productList }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false)
  const [fetch, setFetch] = useState(false)

  const [page, setPage] = useState(1);

  const INITIAL_STATE_QUERY = {
    limit: 3,
    page: page,
    sort_field: "name",
    sort_order: "ASC",
  };

  useEffect(() => {
    if (fetch) {
      dispatch(findAllProductRequest(INITIAL_STATE_QUERY));
    }
    setFetch(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fetch]);

  useEffect(() => {
    setFetch(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Header title=""/>
      <ModalRegistrationProduct
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="header-main">
        <div className='more'>
          <MouseOverPopover 
            children={
              <AddCircleSharpIcon 
                onClick={() => setShowModal(!showModal) }
                sx={{ 
                  height: "2em", 
                  width: "2em", 
                  cursor: "pointer", 
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)",
                  borderRadius: "50%" 
                }}
              />
            }
            text={"Novo Produto"}
          />
        </div>
        <div className="page">
          <Typography>Page: {page}</Typography>
        </div>
        <form className="form-table">
          {productList?.products?.map((product, i) => (
            <CardProduct 
              key={i}
              id={product?.id} 
              name={product?.name}
              description={product?.description}
              valor={product?.price}
              quantidade={product?.quantity} 
              img={product?.product_images ?? [img]} 
            />
          ))}
        </form>
        <div className="pagination">
          <Paginations 
            page={page}
            setPage={setPage}
            setFetch={setFetch}
            pageQuantity={productList?.totalPages}
          />
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    productList: state?.product?.productList ? state?.product?.productList : [],
  };
};

export default connect(mapStateToProps)(ProductList);
