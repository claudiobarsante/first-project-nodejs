import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private _transactions: Transaction[];

  constructor() {
    this._transactions = [];
  }

  public all(): Transaction[] {
    return this._transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this._transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulator.income += transaction.value;
            break;
          case 'outcome':
            accumulator.outcome += transaction.value;
            break;

          default:
            break;
        }

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const total = income - outcome;

    return { income, outcome, total };
    // let balance: Balance = {
    //   income:0,
    //   outcome:0,
    //   total:0
    // };

    // this._transactions.forEach((transaction:Transaction) => {
    //   if (transaction.type === 'income') {
    //     balance.income += transaction.value;
    //   } else {
    //     balance.outcome += transaction.value;
    //   }

    //   balance.total = balance.income - balance.outcome;
    // });

    // return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this._transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
