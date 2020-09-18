import { Router, Request } from 'express';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface TransactionRequest extends Request {
  body: Omit<Transaction, 'id'>;
}

transactionRouter.get('/', (request, response) => {
  try {
    const balance = transactionsRepository.getBalance();
    const transactions = transactionsRepository.all();

    response.json({
      balance,
      transactions,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request: TransactionRequest, response) => {
  try {
    const { title, value, type } = request.body;
    const createTS = new CreateTransactionService(transactionsRepository);
    const newTransaction = createTS.execute({ title, value, type });

    response.json(newTransaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
