import { Component, inject } from '@angular/core';
import { Year, YearRange, MonthlyBalance, YearlyBalance } from '../balance';
import { Transaction } from '../transaction';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-balance-table',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.css'],
})

export class BalanceTableComponent {
  title : string = 'Account Balance Table';
  months : string[] = Year.months;
  mode : string = "Cumulative";
  balances : YearlyBalance[] = [];

  transactionsService : TransactionsService = inject(TransactionsService);

  constructor() {
    this.transactionsService.getTransactions().then(
    (transactions: Transaction[]) => {
      this.balances = [];

      var yearRange : YearRange = { youngestYear: 1970, oldestYear: 2038 };
      var balanceTable : Map<string, number> = this.processTransactions(transactions, yearRange);

      if (yearRange.youngestYear >= yearRange.oldestYear) {
        this.populateNetBalances(balanceTable, yearRange);
        this.computeCumulativeBalances();
      }
    });
  };

  public onModeToggle(newMode : string) {
    this.mode = newMode;
  };

  private processTransactions(transactions : Transaction[], yearRange : YearRange) {
    var balanceTable : Map<string, number> = new Map<string, number>();
    for (var transaction of transactions) {
      var date = new Date(transaction.timestamp * 1000);
      var key = date.getFullYear() + "/" + date.getMonth();

      if (date.getFullYear() < yearRange.oldestYear) {
        yearRange.oldestYear = date.getFullYear();
      }

      if (date.getFullYear() > yearRange.youngestYear)
      {
        yearRange.youngestYear = date.getFullYear();
      }

      if (balanceTable.has(key)) {
        balanceTable.set(key, balanceTable.get(key)! + transaction.amount);
      } else {
        balanceTable.set(key, transaction.amount);
      }
    }

    return balanceTable;
  };

  private populateNetBalances(balanceTable : Map<string, number>, yearRange : YearRange) {
    var yearlyBalances:YearlyBalance[] = [];
    for (var year = yearRange.youngestYear; year >= yearRange.oldestYear; year--) {
      var monthlyBalances:MonthlyBalance[] = [];

      for (var month in Year.months) {
        var key = year + "/" + month;
        var netBalance = 0.0;

        if (balanceTable.has(key)) {
          netBalance = balanceTable.get(key)!;
        }

        var monthlyBalance:MonthlyBalance = { netBalance: netBalance, cumulativeBalance: 0.0 };
        monthlyBalances.push(monthlyBalance);
      }

      var yearlyBalance:YearlyBalance = { monthlyBalances: monthlyBalances, year: year };
      yearlyBalances.push(yearlyBalance);
    }

    this.balances = yearlyBalances;
  };

  private computeCumulativeBalances() {
    var balance = 0.0;
    for (var yearlyBalanceIndex = this.balances.length - 1; yearlyBalanceIndex >= 0; yearlyBalanceIndex--) {
      for (var monthlyBalanceIndex in this.balances[yearlyBalanceIndex].monthlyBalances) {
        balance += this.balances[yearlyBalanceIndex].monthlyBalances[monthlyBalanceIndex].netBalance;
        this.balances[yearlyBalanceIndex].monthlyBalances[monthlyBalanceIndex].cumulativeBalance = balance;
      }
    }
  }
};
