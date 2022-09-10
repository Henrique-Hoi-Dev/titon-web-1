import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  createProductRequest,
  getByIdProductRequest,
  UpdateProductRequest,
  resetFormularioProduct,
} from '../../../../store/modules/product/actions';
import { Container } from './styles';
import { formatMoney, unmaskMoney } from '../../../../util/mask';

import CloseIcon from '@mui/icons-material/Close';
import AvatarInput from '../Avatarinput';
import Modal from '../../../../components/modal/modal';
import ProgressBar from '../../../../components/progress/progress';
import InputAutocomplete from '../../../../components/select/select';
import ListImg from 'components/listImg/listImg';

export default function ModalRegistrationProduct(
  {
    showModal,
    setShowModal,
    ids,
  }) {

  const dispatch = useDispatch();

  const { form } = useSelector((state) => state.product);

  const [progressPercent, setProgressPercent] = useState(0);
  const [imgProduct, setImgProduct] = useState([])
  const [imagensProduct, setImagensProduct] = useState([])
  const [totalImagensPreview, setTotalImagensPreview] = useState()

  const [deleteId, setDeleteId] = useState(false)

  const [data, setData] = useState({ })

  const descriptionList = [
    { value: 'novo', label: 'Novo' },
    { value: 'seminovo', label: 'Seminovo' },
    { value: 'usado', label: 'Usado' },
  ];

  const categoryList = [
    { value: 'celular', label: 'Celular' },
    { value: 'perfume', label: 'Perfume' },
    { value: 'fone', label: 'Fones de Ouvido' },
    { value: 'carregador', label: 'Carregador' },
    { value: 'relogio', label: 'Relogio' },
  ];

  const getListDescription = () =>
    descriptionList.find((item) => item.value === data?.description) ?? null;

  const getListCategory = () =>
    categoryList.find((item) => item.value === data?.category) ?? null;

  useEffect(() => {
    if (ids) {
      dispatch(getByIdProductRequest(ids));
    }
  }, [ids, dispatch]);
  
  useEffect(() => {
    setData((state) => ({
      ...state,
      price: form?.price,
      category: form?.category,
      description: form?.description,
      name: form?.name,
      quantity: form?.quantity,
      images: form?.product_images?.map(res => res.img)?.concat(...imgProduct?.map(res => res.img)),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, imgProduct]);

  useEffect(() => {
    setImagensProduct(form?.product_images)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  useEffect(() => {
    setTotalImagensPreview(imagensProduct?.concat(...imgProduct))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagensProduct, imgProduct, setTotalImagensPreview]);

  useEffect(() => {
    if (deleteId) {
      setData((state) => ({
        ...state,
        images: totalImagensPreview?.map(res => res.img),
      }));
    }
    setDeleteId(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteId]);

  const handleSubmit = async () => {
    try {
      if (form?.id) {
        dispatch(UpdateProductRequest({ product_id: form.id, values: data }));
        setShowModal(false);
      } else {
        dispatch(createProductRequest({ values: data }));
        onCloseProduct();
      }
    } catch (error) {
      toast.error('Error check data');
    }
  };

  const onCloseProduct = () => {
    setShowModal(false);
    dispatch(resetFormularioProduct());
  };

  return (
    <Modal
      open={showModal}
      onClose={onCloseProduct}
      maxWidth={'900px!important'}
    >
      <Container>
        <div className="header-main">
          <Formik
            onSubmit={handleSubmit}
            enableReinitialize={true}
            initialValues={form}
          >
            {(formProps) => {
              return (
                <Form className="form-input">
                  <CloseIcon
                    sx={{
                      width: '1.5em',
                      height: '1.5em',
                      margin: '20px',
                      cursor: 'pointer',
                      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.5)',
                      borderRadius: '50%',
                    }}
                    onClick={onCloseProduct}
                  />
                  <div id="container-input" className="header-title">
                    <div className="campo2">
                      <label htmlFor="Nome Produto">Nome</label>
                      <Field
                        name="name"
                        value={data?.name}
                        onChange={(ev) => {
                          ev.persist();
                          setData((state) => ({
                            ...state,
                            name: ev.target.value,
                          }));
                        }}
                      />
                      <span>{formProps.errors.name}</span>

                      <label htmlFor="category">Tipo de categoria</label>
                      <InputAutocomplete
                        options={categoryList ?? []}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        value={getListCategory()}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setData((state) => ({
                              ...state,
                              category: newValue.value,
                            }));
                          }
                          if (newValue === null) {
                            setData((state) => ({
                              ...state,
                              category: '',
                            }));
                          }
                        }}
                      />
                    </div>

                    <div className="campo3">
                      <label htmlFor="price">Valor</label>
                      <Field
                        name="price"
                        value={formatMoney(data?.price)}
                        onChange={(ev) => {
                          ev.persist();
                          setData((state) => ({
                            ...state,
                            price: unmaskMoney(ev.target.value),
                          }));
                        }}
                      />
                      <span>{formProps.errors.price}</span>

                      <ul>
                        <AvatarInput 
                          name="avatar_id" 
                          setProgressPercent={setProgressPercent}
                          setImgProduct={setImgProduct}
                        />
                        {progressPercent > 0 && (
                          <ProgressBar
                            progressPercent={progressPercent}
                            setProgressPercent={setProgressPercent}
                          />
                        )}
                      </ul>
                    </div>

                    <div className="campo4">
                      <label htmlFor="quantity">Quantidade</label>
                      <Field
                        name="quantity"
                        value={data?.quantity}
                        onChange={(ev) => {
                          ev.persist();
                          setData((state) => ({
                            ...state,
                            quantity: ev.target.value,
                          }));
                        }}
                      />

                      <label htmlFor="description">Tipo de descrição</label>
                      <InputAutocomplete
                        options={descriptionList ?? []}
                        getOptionLabel={(option) => option.label}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        value={getListDescription()}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            setData((state) => ({
                              ...state,
                              description: newValue.value,
                            }));
                          }
                          if (newValue === null) {
                            setData((state) => ({
                              ...state,
                              description: '',
                            }));
                          }
                        }}
                      />
                      <span>{formProps.errors.description}</span>
                    </div>

                    <footer className="buttons-container">
                      <ListImg 
                        itemData={totalImagensPreview}
                        setDeleteId={setDeleteId}
                        setTotalImagensPreview={setTotalImagensPreview}
                      />
                    </footer>
                    <div className="camp5">
                      <button type="submit">Salvar</button>
                    </div>

                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </Modal>
  );
}
