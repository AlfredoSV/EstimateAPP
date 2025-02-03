import { EventEmitter, Injectable } from '@angular/core';
import { Expense } from './expense';
import { TypeExpense } from './type-expense';
import { Observable } from 'rxjs';
import { ExpensesDataHeader } from './expenses-data-header';

@Injectable({
  providedIn: 'root'
})

export class EstimateService {

  private  expenses: Expense[] =
  [
  ];

  estimateEventDataHeader = new EventEmitter<ExpensesDataHeader>();
  estimateEventDeposit =  new EventEmitter();
  estimateEventOperatingExpense =  new EventEmitter();
  constructor() {
  }

  add(expense : Expense) : void{
    this.expenses.push(expense);
    const data : Expense[] = this.expensesData(expense.typeExpense);
    if(expense.typeExpense == TypeExpense.Deposit){
      this.estimateEventDeposit.emit(data);
    }else{
      this.estimateEventOperatingExpense.emit(data);
    }
    this.estimateEventDataHeader.emit(this.totalDataHeader());
  }

  expensesData(typeExpense : TypeExpense): Expense[]{
    return this.expenses.filter((expense) => expense.typeExpense == typeExpense);
  }

  totalDataHeader(): ExpensesDataHeader{
    return new ExpensesDataHeader(
      this.totalAmmount(TypeExpense.OperatingExpense),
      this.totalAmmount(TypeExpense.Deposit));
  }

  private totalAmmount(typeExpense: TypeExpense): number{

    return this.expenses.reduce(

      (total, expense) =>{

        if(expense.typeExpense == typeExpense){
          return (total + expense.amount);
        }

        return total;
      }
    , 0);
  }

}
