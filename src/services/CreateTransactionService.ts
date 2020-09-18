import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transaction: Omit<Transaction, 'id'>): Transaction {
    if (
      transaction.type === 'outcome' &&
      transaction.value > this.transactionsRepository.getBalance().total
    ) {
      throw new Error('invalid value');
    }
    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
