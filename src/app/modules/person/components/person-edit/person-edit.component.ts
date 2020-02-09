import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { PersonPf }  from '../../models';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  form: FormGroup;
  myFormValueChanges$;
  constructor(
  	private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.generateForm();
  }


  generateForm() {
      this.form = this.fb.group({
        name: ['', [Validators.required,Validators.maxLength(25)]],
        cpf: [''],
        email: [''],
        birthday: [''],
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
    const person : PersonPf = this.form.value;
    alert(JSON.stringify(this.form.value));
  }

  private getAddress() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      street: [''],
      cep: [''],
      neighborhood: [''],
      city: [''],
      uf: ['']
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
    phone: [''],
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
