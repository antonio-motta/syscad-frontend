import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { PersonPf }  from '../../models';
import { CpfValidator } from '../../../shared';
import { PersonService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  form: FormGroup;
  personId: string;
  
  datemask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private personService: PersonService) { }

  ngOnInit(): void {
    this.personId  = this.route.snapshot.paramMap.get('id');
    if(this.personId) this.getPersonById();
    this.generateForm();
  }


  generateForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required,Validators.maxLength(80)]],
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
  }

  saveOrUpdate(){
    const person: PersonPf = this.form.value;
    
    delete person.createdAt;
    if(person.id){
      
      this.update(person);
    } else {
      if (this.form.invalid) {
        return;
      }
      this.save(person);
    }
  }

  save(person: PersonPf){
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

  update(person: PersonPf){
    this.personService.update(this.personId, person)
      .subscribe(
        data => {
          const msg: string = "Cadastro atualizado com sucesso!";
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

  getPersonById() {
    this.personService.findById(this.personId)
      .subscribe(
        dados => {
          const data = dados;
          debugger;
          var date = new Date(new Date(data.birthday).getTime())
          this.form.get('id').setValue(data.id);
          this.form.get('name').setValue(data.name);
          this.form.get('cpf').setValue(data.cpf);
          this.form.controls['birthday'].setValue(date);
          this.form.get('email').setValue(data.email);
          const controlPhone = <FormArray>this.form.controls['phones'];
          for (let i = 1; i < data.phones.length; i++) {
            controlPhone.push(this.getPhones());
          }
          this.form.patchValue({phones: data.phones});

          const control = <FormArray>this.form.controls['address'];
          for (let i = 1; i < data.address.length; i++) {
            control.push(this.getAddress());
          }
          this.form.patchValue({address: data.address});
        },
        err => {
          let msg: string = "Erro obtendo lançamento";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      );
  }


 

  private getAddress() {
    const numberPatern = '^[0-9.,]+$';
    return this.fb.group({
      id: [''],
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
    return this.fb.group({
      id: [''],
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
