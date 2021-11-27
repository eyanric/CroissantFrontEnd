import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StoreSummary } from './store-summary';

@Injectable({
  providedIn: 'root'
})
export class StoreSummaryService {

  getStoreSummary(): Observable<StoreSummary[]> {
    return of([
      { title: "Total Sales", value: "9465", isIncrease: true, color: "black", percentValue: "0.5383", icon: "payments", isCurrency: true },
      { title: "Average Order Value", value: "465", isIncrease: false, color: "black", percentValue: "0.2544", icon: "local_atm", isCurrency: true },
      { title: "Total Orders", value: "243", isIncrease: true, color: "green", percentValue: "0.4565", icon: "shopping_cart", isCurrency: false },
      { title: "Returning Customers", value: "35", isIncrease: false, color: "green", percentValue: "0.8361", icon: "portrait", isCurrency: false }
    ]);
  }

  constructor() { }
}
