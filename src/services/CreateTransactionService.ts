import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private _transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this._transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const { total } = this._transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type))
      throw new Error('Transaction type is invalid');

    if (type === 'outcome' && value > total)
      throw new Error('You do not have enough balance');

    const transaction = this._transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
