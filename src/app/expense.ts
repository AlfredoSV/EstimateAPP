import { TypeExpense } from './type-expense';
import { v4 as uuidv4 } from 'uuid';
export class Expense {

  public id! : string;
  public expensePercent! : number;
  constructor(public description : string,
              public amount : number, public typeExpense: TypeExpense){

                this.id = uuidv4();

              }
}
