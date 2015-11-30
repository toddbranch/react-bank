describe('Bank App', function() {
  describe('reducer', function() {
    var store;

    beforeEach(function() {
      store = Redux.createStore(reducer);
    });

    it('returns an empty array for the initial state', function() {
      expect(store.getState()).toEqual({
        currentAmount: undefined,
        transactions: []
      });
    });

    it('returns the current state for unsupported actions', function() {
      store.dispatch({type: 'UNSUPPORTED'});

      expect(store.getState()).toEqual({
        currentAmount: undefined,
        transactions: []
      });
    });

    describe('CHANGE_AMOUNT', function() {
      it('changes the current amount', function() {
        store.dispatch({
          type: 'CHANGE_AMOUNT',
          amount: 'some amount'
        });

        expect(store.getState().currentAmount).toBe('some amount');
      });
    });

    describe('DEPOSIT / WITHDRAWAL', function() {
      beforeEach(function() {
        store.dispatch({
          type: 'CHANGE_AMOUNT',
          amount: '100'
        });
      });

      it('adds valid transactions to the array', function() {
        store.dispatch({
          type: 'DEPOSIT'
        });

        expect(store.getState().transactions).toEqual([
          {id: 0, type: 'DEPOSIT', amount: 100}
        ]);
      });

      it('adds subsequent transactions to the front of the array', function() {
        store.dispatch({
          type: 'DEPOSIT'
        });

        store.dispatch({
          type: 'WITHDRAWAL'
        });

        expect(store.getState().transactions).toEqual([
          {id: 1, type: 'WITHDRAWAL', amount: 100},
          {id: 0, type: 'DEPOSIT', amount: 100}
        ]);

      });

      it('ignores unnecessary properties', function() {
        store.dispatch({
          type: 'WITHDRAWAL',
          bank: 'USAA'
        });

        expect(store.getState().transactions).toEqual([
          {id: 0, type: 'WITHDRAWAL', amount: 100}
        ]);
      });

      it('discards non-numeric values', function() {
        store.dispatch({
          type: 'CHANGE_AMOUNT',
          amount: 'non-numeric'
        });

        store.dispatch({
          type: 'DEPOSIT'
        });

        expect(store.getState().transactions).toEqual([]);
      });

      it('discards values with more than two decimal places', function() {
        store.dispatch({
          type: 'CHANGE_AMOUNT',
          amount: '1.2345'
        });

        store.dispatch({
          type: 'DEPOSIT'
        });

        expect(store.getState().transactions).toEqual([]);
      });

      it('discards values with one decimal place', function() {
        store.dispatch({
          type: 'CHANGE_AMOUNT',
          amount: '1.2'
        });

        store.dispatch({
          type: 'DEPOSIT'
        });

        expect(store.getState().transactions).toEqual([]);
      });
    });
  });
});
