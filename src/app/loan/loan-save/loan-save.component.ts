import { Component } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-loan-save',
  templateUrl: './loan-save.component.html',
  styleUrls: ['./loan-save.component.scss'],
  providers: [{
    provide: MAT_DATE_LOCALE, useValue: 'es-ES'
  }]
})
export class LoanSaveComponent {

  games: Game[];
  clients: Client[];
  loan: Loan;

  constructor(
    public dialogRef: MatDialogRef<LoanSaveComponent>,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    private _snackBar: MatSnackBar) {

    this.loan = new Loan();

    this.gameService.getGames().subscribe(
      games => this.games = games
    );

    this.clientService.getClients().subscribe(
      clients => this.clients = clients
    );
  }

  onSave() {
    this.loanService.saveLoan(this.loan).subscribe(
      result => {
        this.dialogRef.close();
      },
      error => { this._snackBar.open(error.error.message, 'Aceptar') }
    );
  }

  onSaveDateRange() {
    var diff = Math.abs(this.loan.finalDate.getTime() - this.loan.initialDate.getTime());
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    if (this.loan.initialDate > this.loan.finalDate) { return; }
    else if (diffDays > 14) {
      this._snackBar.open('El período máximo es de 14 días.', 'Aceptar');
      this.loan.initialDate = null;
      this.loan.finalDate = null;
      return;
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
