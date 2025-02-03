export class ExpensesDataHeader {
  public total: number= 0;
  constructor(
    public totalExpenses :number,
    public totalAvailable : number
  ){
    this.total = this.totalAvailable - this.totalExpenses;
  }

}
