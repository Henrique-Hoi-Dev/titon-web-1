const initialState = {
  roomId: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'roomId':
      return { ...state, roomId: action.payload }
    default:
      return state
  }
}
export { initialState, reducer }
