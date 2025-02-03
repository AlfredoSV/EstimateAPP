import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FormdataComponent } from "./formdata/formdata.component";
import { AvailableComponent } from "./available/available.component";
import { ExpensesComponent } from "./expenses/expenses.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormdataComponent, AvailableComponent, ExpensesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estimate-app';
}
