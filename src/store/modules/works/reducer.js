import produce from 'immer';

const INITIAL_STATE = {
  worksList: [],
  form: {
    financial_id: undefined,
    name: '',
    price: '',
    date_service: ''
  },
};

export default function works(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@service/RESET_FORM': {
        draft.form = {
          financial_id: undefined,
          name: '',
          price: '',
          date_service: ''
        }
        break;
      }
      case '@service/GET_BYID_SERVICE_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@service/FIND_ALL_SERVICE_SUCCESS': {
        draft.worksList = action.payload.data;
        break;
      }
      default:
    }
  });
}
