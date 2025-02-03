import { Component } from '@angular/core';
import { Expense } from '../expense';
import { EstimateService } from '../estimate.service';
import { TypeExpense } from '../type-expense';

@Component({
  selector: 'app-expenses',
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  expenses:Expense[] = [];
  title : string = "Egresos";
  constructor(public estimateService: EstimateService){}

  ngOnInit() {
    this.expenses = this.estimateService.expensesData(TypeExpense.OperatingExpense);
    this.estimateService.estimateEventOperatingExpense.subscribe((data) =>{
      this.expenses = data;
    })
  }
}
