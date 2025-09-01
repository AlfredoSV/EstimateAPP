export class ExpensesDataHeader {
  public total: number= 0;
  public percentExpense : number = 0;
  constructor(
    public totalExpenses :number,
    public totalAvailable : number
  ){
    this.total = this.totalAvailable - this.totalExpenses;
    this.percentExpense = parseFloat((Math.round(this.totalExpenses * 100) / (this.totalAvailable) ? Math.ceil(this.totalExpenses * 100) / (this.totalAvailable) : 0).toFixed(2)) ;
  }

}
