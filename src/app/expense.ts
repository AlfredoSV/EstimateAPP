import { TypeExpense } from './type-expense';
export class Expense {

  constructor(public description : string,
              public amount : number, public typeExpense: TypeExpense){}



}
