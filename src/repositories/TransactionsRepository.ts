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
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomes = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const income = incomes.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );
    const outcome = outcomes.reduce(
      (acc, transaction) => acc + transaction.value,
      0,
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, type, value });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
