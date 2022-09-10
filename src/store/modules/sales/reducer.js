import produce from 'immer';

const INITIAL_STATE = {
  salesList: [],
  form: {
    financial_id: undefined,
    product_id: undefined,
    name_product: '',
    price_product: '',
    product_quantity: '',
    discount: 0,
    status: 'open',
  },
  formSales: {
    product_id: '',
    product_quantity: '',
    discount: '',
    status: '',
  }
};

export default function sales(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@sales/RESET_FORM': {
        draft.form = {
          financial_id: null,
          product_id: null,
          name_product: '',
          price_product: '',
          product_quantity: '',
          discount: 0,
          status: 'open',
        };
        break;
      }
      case '@sales/RESET_FORM_SALES': {
        draft.formSales = {
          product_id: '',
          product_quantity: '',
          discount: '',
          status: '',
        };
        break;
      }
      case '@sales/FIND_ALL_SALES_SUCCESS': {
        draft.salesList = action.payload.data;
        break;
      }
      case '@sales/GET_BYID_SALES_SUCCESS': {
        draft.formSales = action.payload.data;
        break;
      }
      default:
    }
  });
}
