import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';

import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PersonPf } from '../../models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PersonService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  dataSource: MatTableDataSource<PersonPf>;
  displayedColumns: string[] = ['name', 'cpf', 'email', 'data','createdAt','action'];
  personId: string;

  persons: PersonPf[];

  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

 

  constructor( 
    private snackBar: MatSnackBar,
    private router: Router,
    private personService: PersonService,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialog: MatDialog) { }

  removerDialog(personId: string) {  
    const dialog = this.dialog.open(ConfirmarDialog, {});
    dialog.afterClosed().subscribe(remover => {
      if (remover) {
        this.delete(personId);
      }
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.personService.listAll()
    .subscribe(
      data => {
        const persons = data as PersonPf[];
        this.dataSource = new MatTableDataSource<PersonPf>(persons);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      err => {
        let msg: string = "Tente novamente em instantes.";
        let type: string = "Erro";
        if (err.status == 400) {
          msg = err.error.errors.join(' ');
          
        } else    if (err.status == 404) {
          this.dataSource = new MatTableDataSource<PersonPf>();
          msg = "Não existem pessoas cadastradas.";
          type = "Info";
        }
        this.snackBar.open(msg, type, { duration: 5000 });
      }
    );    
  }

  delete(personId: string){
    if (!personId) {
      return;
    }
    debugger;
    this.personService.delete(personId)
      .subscribe(
        data => {
          const msg: string = "Cadastro deletado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.findAll();
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  	return false;
  }

  
  
}


@Component({
  selector: 'confirmar-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o cadastro?</h1>
    <div mat-dialog-actions>
      <button mat-raised-button color="primary" [mat-dialog-close]="true" tabindex="2">
        Sim
      </button>
      <button mat-raised-button color="worn" [mat-dialog-close]="false" tabindex="-1">
        Não
      </button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}



