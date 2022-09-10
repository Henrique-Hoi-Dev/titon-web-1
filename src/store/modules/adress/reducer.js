import produce from 'immer';

const INITIAL_STATE = {
  form: {
    id: undefined,
    cep: '',
    logradouro: '',
    complemento: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  }
};

export default function adress(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@adress/RESET_FORM': {
        draft.form = {
          cep: '',
          logradouro: '',
          complemento: '',
          numero: '',
          bairro: '',
          cidade: '',
          uf: '',
        };
        break;
      }
      case '@adress/GET_BYID_ADRESS_SUCCESS': {
        draft.form = action.payload.data;
        break;
      }
      default:
    }
  });
}
