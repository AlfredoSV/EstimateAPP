import { Component } from '@angular/core';
import { Expense } from '../expense';
import { EstimateService } from '../estimate.service';
import { TypeExpense } from '../type-expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-available',
  imports: [CommonModule],
  templateUrl: './available.component.html',
  styleUrl: './available.component.css'
})
export class AvailableComponent {
  delete(id: string) {
    this.estimateService.deleteExpense(id);
  }
  expenses!: Expense[];
  title: string = "Ingresos";
  constructor(public estimateService: EstimateService) { }

  ngOnInit() {
    this.expenses = this.estimateService.expensesData(TypeExpense.Deposit);
    this.estimateService.estimateEventDeposit.subscribe((data) => {
      this.expenses = data;
    })
  }
}
