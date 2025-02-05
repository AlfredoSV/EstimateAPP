import { EventEmitter, Injectable } from '@angular/core';
import { Expense } from './expense';
import { TypeExpense } from './type-expense';
import { ExpensesDataHeader } from './expenses-data-header';

@Injectable({
  providedIn: 'root'
})

export class EstimateService {

  private expenses: Expense[] = [];

  estimateEventDataHeader = new EventEmitter<ExpensesDataHeader>();
  estimateEventDeposit = new EventEmitter();
  estimateEventOperatingExpense = new EventEmitter();

  add(expense: Expense): void {
    this.expenses.push(expense);
    let data: Expense[] = this.expensesData(expense.typeExpense);
    const dataHeader: ExpensesDataHeader = this.totalDataHeader();

    if (expense.typeExpense == TypeExpense.Deposit) {

      this.estimateEventDeposit.emit(data);

    } else {
      data.forEach(dat => {
        let result: number = parseFloat((Math.round(dat.amount * 100) / (dataHeader.totalExpenses)).toFixed(2));
        dat.expensePercent = result ? result : 0;
      });
      this.estimateEventOperatingExpense.emit(data);
    }
    this.estimateEventDataHeader.emit(dataHeader);
  }

  expensesData(typeExpense: TypeExpense): Expense[] {
    return this.expenses.filter((expense) => expense.typeExpense == typeExpense);
  }

  totalDataHeader(): ExpensesDataHeader {
    return new ExpensesDataHeader(
      this.totalAmmount(TypeExpense.OperatingExpense),
      this.totalAmmount(TypeExpense.Deposit));
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

  public deleteExpense(id: string): void {

    this.expenses = this.expenses.filter((data) => data.id != id);
    this.estimateEventDeposit.emit(this.expensesData(TypeExpense.Deposit));
    let dataHeader: ExpensesDataHeader = this.totalDataHeader();
    this.expenses.forEach(dat => {
      let result: number = parseFloat((Math.round(dat.amount * 100) / (dataHeader.totalExpenses)).toFixed(2));
      dat.expensePercent = result ? result : 0;
    });
    this.estimateEventOperatingExpense.emit(this.expensesData(TypeExpense.OperatingExpense));
    this.estimateEventDataHeader.emit(this.totalDataHeader());
  }

}
