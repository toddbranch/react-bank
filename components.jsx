var Transaction = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.transaction.type} {this.props.transaction.amount}
      </div>
    );
  }
});

var TransactionList = React.createClass({
  render: function() {
    return (
      <div className="ui list">
        {this.props.transactions.map(function(transaction) {
          return (
            <Transaction transaction={transaction} key={transaction.id} />
          );
        })}
      </div>
    );
  }
});

var TransactionForm = React.createClass({
  render: function() {
    return (
      <div>
        <div className="ui input focus">
          <input
            type="text"
            value={this.props.amount}
            onChange={this.props.changeAmount}
          />
          <button
            className="ui basic button green deposit"
            onClick={this.props.deposit}
          >Deposit</button>
          <button
            className="ui basic button red"
            onClick={this.props.withdraw}
          >Withdraw</button>
        </div>
      </div>
    );
  }
});

var Bank = React.createClass({
  render: function() {
    var balance = this.props.transactions.reduce(function(memo, transaction) {
      switch(transaction.type) {
        case 'DEPOSIT':
          memo += transaction.amount;
          break;
        case 'WITHDRAWAL':
          memo -= transaction.amount;
          break;
      }

      return memo;
    }, 0);

    return (
      <div className="bank">
        <TransactionForm
          amount={this.props.amount}
          changeAmount={this.props.changeAmount}
          deposit={this.props.deposit}
          withdraw={this.props.withdraw}
        />
        <div className="balance">
          Balance: {balance}
        </div>
        <TransactionList
          transactions={this.props.transactions}
        />
      </div>
    );
  }
});

function changeAmount(e) {
  store.dispatch({
    type: 'CHANGE_AMOUNT',
    amount: e.target.value
  });
}

function deposit() {
  store.dispatch({
    type: 'DEPOSIT',
  });
}

function withdraw() {
  store.dispatch({
    type: 'WITHDRAWAL',
  });
}

function render() {
  ReactDOM.render(
    <Bank 
      transactions={store.getState().transactions}
      amount={store.getState().currentAmount}
      changeAmount={changeAmount}
      deposit={deposit}
      withdraw={withdraw}
    />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
