import produce from 'immer';

const INITIAL_STATE = {
  productList: [],
  form: {
    product_images: [],
    name: '',
    price: '',
    category: '',
    quantity: '',
    description: ''
  },
};

export default function product(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@product/RESET_FORM': {
        draft.form = {
          product_images: [],
          name: '',
          price: '',
          category: '',
          quantity: '',
          description: ''
        };
        break;
      }
      case '@product/FIND_ALL_PRODUCT_SUCCESS': {
        draft.productList = action.payload.data;
        break;
      }
      case '@product/GET_BYID_PRODUCT_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
