import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Loan } from './model/Loan';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA } from './model/mock-loans';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  getLoans( pageable: Pageable, gameName?: string, clientName?: string, loanDate?: Date) : Observable<LoanPage>{
    return this.http.post<LoanPage>(this.composeFindUrl(gameName, clientName, loanDate), {pageable: pageable});
  }

  saveLoan(loan: Loan) : Observable<void>{
    return this.http.put<void>("http://localhost:8080/loan", loan);
  }

  deleteAuthor(id: number) : Observable<void>{
    return this.http.delete<void>('http://localhost:8080/loan/' + id);
  }


  private composeFindUrl(gameName?: string, clientName?: string, loanDate?: Date) : string {
    let params = '';

    if (gameName != null) {
        params += 'gameName='+gameName;
    }

    if (clientName != null) {
        if (params != '') params += "&";
        params += 'clientName='+clientName;
    }

    if (loanDate != null) {
      if (params != '') params += "&";
      //TODO revisar
      loanDate.setDate(loanDate.getDate() + 1)
      params += 'loanDate=' + loanDate.toLocaleDateString();
    }

    let url = 'http://localhost:8080/loan'

    if (params == '') return url;
    else return url + '?'+params;
}
}
