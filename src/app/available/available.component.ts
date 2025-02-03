import { Component } from '@angular/core';
import { Expense } from '../expense';
import { EstimateService } from '../estimate.service';
import { TypeExpense } from '../type-expense';

@Component({
  selector: 'app-available',
  imports: [],
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent {
  expenses!: Expense[];
  title: string = "Ingresos";
  constructor(public estimateService: EstimateService) { }

  ngOnInit() {
    this.expenses = this.estimateService.expensesData(TypeExpense.Deposit);
    this.estimateService.estimateEventDeposit.subscribe((data) =>{
      this.expenses = data;
    })
  }
}
