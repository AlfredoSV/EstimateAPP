import { TypeExpense } from './../type-expense';
import { FormsModule } from '@angular/forms';
import { Expense } from '../expense';
import { EstimateService } from './../estimate.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-formdata',
  imports: [FormsModule, CommonModule ],
  templateUrl: './formdata.component.html',
  styleUrl: './formdata.component.css'
})


export class FormdataComponent {

  public description: string = "";
  public amount: number = 0;
  operationType : string = '+';

  constructor(public estimateService: EstimateService) { }
  send($event: Event) {

    $event.preventDefault();

    if (this.description != '' && this.amount > 0) {

      const type : TypeExpense = this.operationType == '+' ? TypeExpense.Deposit : TypeExpense.OperatingExpense;

      this.estimateService.add(new Expense(this.description, this.amount, type));
      this.description = '';
      this.amount = 0;

    } else {

      alert("Review de data.");

    }
  }
}
