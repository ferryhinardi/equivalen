import update from 'immutability-helper';

const initialState = {
  showModalTryout: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'VISIBLE_MODAL_TRYOUT':
      return update(state, {
        showModalTryout: { $set: action.payload },
      });

    default:
      return state;
  }
};
