import { EventEmitter, Injectable } from '@angular/core';
import { Expense } from './expense';
import { TypeExpense } from './type-expense';
import { ExpensesDataHeader } from './expenses-data-header';

@Injectable({
  providedIn: 'root'
})

export class EstimateService {

  private expenses: Expense[] = [];

  public estimateEventDataHeader = new EventEmitter<ExpensesDataHeader>();
  public estimateEventDeposit = new EventEmitter<Expense[]>();
  public estimateEventOperatingExpense = new EventEmitter<Expense[]>();

  public add(expense: Expense): void {
    this.expenses.push(expense);
    this.refreshData();
  }

  public deleteExpense(id: string): void {
    this.expenses = this.expenses.filter((data) => data.id != id);
    this.refreshData();
  }

  public expensesData(typeExpense: TypeExpense): Expense[] {
    return this.expenses.filter((expense) => expense.typeExpense == typeExpense);
  }

  public totalDataHeader(): ExpensesDataHeader {
    return new ExpensesDataHeader(
      this.totalAmmount(TypeExpense.OperatingExpense),
      this.totalAmmount(TypeExpense.Deposit));
  }

  private refreshData(): void {
    let dataDeposit: Expense[] = this.expensesData(TypeExpense.Deposit);
    let dataOperatingExpense: Expense[] = this.expensesData(TypeExpense.OperatingExpense);

    dataDeposit.forEach(expense => this.estimateData(expense));
    this.estimateEventDeposit.emit(dataDeposit);
    dataOperatingExpense.forEach(expense => this.estimateData(expense));
    this.estimateEventOperatingExpense.emit(dataOperatingExpense);

    this.estimateEventDataHeader.emit(this.totalDataHeader());
  }

  private totalAmmount(typeExpense: TypeExpense): number {

    return this.expenses.reduce(

      (total, expense) => {

        if (expense.typeExpense == typeExpense) {
          return (total + expense.amount);
        }

        return total;
      }
      , 0);
  }

  private estimateData(expense: Expense) {
    let dataHeader: ExpensesDataHeader = this.totalDataHeader();
    let result: number = parseFloat((Math.round(expense.amount * 100) / (dataHeader.totalAvailable)).toFixed(2));
    expense.expensePercent = result ? result : 0;
  }

}
