import produce from 'immer';

const INITIAL_STATE = {
  financialBoxList: [],
  financialBoxListOpen: [],
  card: [],
  form: {
    status: true,
    open_caixa: '',
    close_caixa: '',
    value_open: '',
    value_total: '',
    value_total_sales: '',
    value_total_service: '',
  }
};

export default function financialBox(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@financialBox/RESET_FORM': {
        draft.form = {
          id: null,
          value_open: '',
          open_caixa: '',
        };
        break;
      }
      case '@financialBox/RESET_FORM_MODAL': {
        draft.form = {
          status: '',
          open_caixa: '',
          close_caixa: '',
          value_open: '',
          value_total: '',
          value_total_sales: '',
          value_total_service: '',
        };
        break;
      }
      case '@financialBox/GET_BYID_FINANCIALBOX_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      case '@financialBox/GET_CARD_SUCCESS': {
        draft.card = action.payload.data;
        break;
      }
      case '@financialBox/FIND_ALL_FINANCIALBOX_SUCCESS': {
        draft.financialBoxList = action.payload.data;
        break;
      }
      case '@financialBox/FIND_OPEN_SUCCESS': {
        draft.financialBoxListOpen = action.payload.data;
        break;
      }
      default:
    }
  });
}
