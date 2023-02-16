import { Component, OnInit } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanSaveComponent } from '../loan-save/loan-save.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'es-ES'
  }]
})
export class LoanListComponent implements OnInit {

  games: Game[];
  clients: Client[];

  filterGameTitle: string;
  filterClientName: string;
  filterLoanDate: Date;

  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'title', 'name', 'initialDate', 'finalDate', 'action'];

  constructor(
    private gameService: GameService,
    private clientService: ClientService,
    private loanService: LoanService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.gameService.getGames().subscribe(
      games => this.games = games
    );

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );

    this.loadPage();
  }

  loadPage(event?: PageEvent) {

    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [{
        property: 'id',
        direction: 'ASC'
      }]
    }

    if (event != null) {
      pageable.pageSize = event.pageSize
      pageable.pageNumber = event.pageIndex;
    }

    let gameName = this.filterGameTitle != null ? this.filterGameTitle : null;
    let clientName = this.filterClientName != null ? this.filterClientName : null;
    let loanDate = this.filterLoanDate != null ? this.filterLoanDate : null;


    this.loanService.getLoans(pageable, gameName, clientName, loanDate).subscribe(data => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;
    });

  }

  onCleanFilter(): void {
    this.filterGameTitle = null;
    this.filterClientName = null;
    this.filterLoanDate = null;

    this.onSearch();
  }

  onSearch(): void {
    this.loadPage();
  }

  createLoan() {
    const dialogRef = this.dialog.open(LoanSaveComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar préstamo", description: "Atención si borra el préstamo se perderán sus datos.<br> ¿Desea eliminar el préstamo?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loanService.deleteAuthor(loan.id).subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }

}
