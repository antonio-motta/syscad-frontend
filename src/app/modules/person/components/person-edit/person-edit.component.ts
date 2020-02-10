import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { PersonPf }  from '../../models';
import { CpfValidator } from '../../../shared';
import { PersonService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  form: FormGroup;
  
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private personService: PersonService) { }

  ngOnInit(): void {
    this.generateForm();
  }


  generateForm() {
      this.form = this.fb.group({
        name: ['', [Validators.required,Validators.maxLength(25)]],
        cpf: ['', [Validators.required, CpfValidator]],
        email: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        address: this.fb.array([
           this.getAddress()
        ]),
        phones: this.fb.array([
          this.getPhones()
       ])
      });
   
      //this.myFormValueChanges$ = this.form.get('address').valueChanges; 

  }

  save(){
    if (this.form.invalid) {
      return;
    }

    const person: PersonPf = this.form.value;
    this.personService.save(person)
      .subscribe(
        data => {
          const msg: string = "Cadastro realizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/person']);
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

  private getAddress() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      street: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      uf: ['', [Validators.required]]
    });
  }


 addAddress() {
   const control = <FormArray>this.form.get('address');
   control.push(this.getAddress());
 }

 /**
  * Remove unit row from form on click delete button
  */
 removeAddress(i: number) {
   const control = <FormArray>this.form.get('address');
   control.removeAt(i);
 }

clearAllAddress() {
  const control = <FormArray>this.form.get('address');
  while(control.length) {
    control.removeAt(control.length - 1);
  }
  control.clearValidators();
  control.push(this.getAddress());
}


private getPhones() {
  const numberPatern = '^[0-9.,]+$';
  return this.fb.group({
    phone: ['', [Validators.required]],
  });
}


addPhones() {
  const control = <FormArray>this.form.get('phones');
  control.push(this.getPhones());
}

/**
* Remove unit row from form on click delete button
*/
removePhones(i: number) {
  const control = <FormArray>this.form.get('phones');
  control.removeAt(i);
}

clearAllPhones() {
  const control = <FormArray>this.form.get('phones');
  while(control.length) {
    control.removeAt(control.length - 1);
  }
  control.clearValidators();
  control.push(this.getPhones());
}

}
