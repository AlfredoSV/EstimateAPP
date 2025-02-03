import { ExpensesDataHeader } from '../expenses-data-header';
import { TypeExpense } from '../type-expense';
import { EstimateService } from './../estimate.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  title : string = 'Presupuesto Disponible';
  headerData! : ExpensesDataHeader;
  expensesPercen: number = 0;

  constructor(private estimateService: EstimateService){}

  ngOnInit(){

    this.headerData = this.estimateService.totalDataHeader();

    this.estimateService.estimateEventDataHeader.subscribe(data =>{
      this.headerData.totalExpenses = data.totalExpenses;
      this.headerData.totalAvailable = data.totalAvailable;
      this.headerData.total = data.total;
    });

  }
}
