import { Component } from '@angular/core';
import { Expense } from '../expense';
import { EstimateService } from '../estimate.service';
import { TypeExpense } from '../type-expense';
import { ExpensesDataHeader } from '../expenses-data-header';

@Component({
  selector: 'app-expenses',
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  delete(id: string) {
    this.estimateService.deleteExpense(id);
  }
  expenses: Expense[] = [];
  title: string = "Egresos";
  expensaeData!: ExpensesDataHeader;
  constructor(public estimateService: EstimateService) {

  }

  ngOnInit() {
    this.expenses = this.estimateService.expensesData(TypeExpense.OperatingExpense);
    this.estimateService.estimateEventOperatingExpense.subscribe((data) => {
      this.expenses = data;
    })

    this.expensaeData = this.estimateService.totalDataHeader();
  }
}
