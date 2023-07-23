import { Injectable } from '@angular/core';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  url : string = 'http://localhost:3000/transactions';

  async getTransactions(): Promise<Transaction[]> {
    const transactions = await fetch(this.url);
    return await transactions.json() ?? [];
  };
}
