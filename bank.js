var reducer = function(state, action) {
  var defaultState = {
    currentAmount: undefined,
    transactions: []
  };

  state = state || defaultState;

  switch (action.type) {
    case 'CHANGE_AMOUNT':
      state.currentAmount = action.amount;
      break;
    case 'DEPOSIT':
    case 'WITHDRAWAL':
      if (!/^\d+(\.\d\d)?$/.test(state.currentAmount)) {
        break;
      }

      state.transactions.unshift({
        // naive unique key - works because we aren't removing transactions
        id: state.transactions.length,
        type: action.type,
        amount: parseFloat(state.currentAmount, 10)
      });
      break;
  }

  return state;
};

var store = Redux.createStore(reducer);
