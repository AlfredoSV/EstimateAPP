import { FormsModule } from '@angular/forms';
import { Expense } from '../expense';
import { TypeExpense } from '../type-expense';
import { EstimateService } from './../estimate.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-formdata',
  imports: [FormsModule],
  templateUrl: './formdata.component.html',
  styleUrl: './formdata.component.css'
})


export class FormdataComponent {

  public description: string = "";
  public amount: number = 0;
  public typeExpense: TypeExpense = TypeExpense.Deposit;

  constructor(public estimateService: EstimateService) { }
  send($event: Event) {
    $event.preventDefault();

    if (this.description != '' && this.amount > 0) {

      this.estimateService.add(new Expense(this.description, this.amount, this.typeExpense));
      this.description = '';
      this.amount = 0;

    } else {

      alert("Review de data.");

    }
  }
}
