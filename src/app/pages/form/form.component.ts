import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, of, pipe } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

import { Person } from 'src/app/@core/models/person.model';
import { DbService } from 'src/app/@core/sevices/db.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formPerson: FormGroup;
  public editPerson: Person;
  public propOne: string;
  public isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dbService: DbService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.edit(this.route.snapshot.params);
  }

  edit(params: any) {
    if (Object.keys(params).length) {
      this.isEdit = true;
      this.initForm(params);
    } else {
      this.initForm();
    }
  }

  initForm(params?: Person): void {
    this.formPerson = this.fb.group({
      key: params ? params.key : null,
      zipcode: [params ? params.zipcode : null, Validators.required],
      name: [params ? params.name : null, Validators.required],
      birthday: [params ? params.birthday : null, Validators.required],
      email: [params ? params.email : null, [Validators.required, Validators.email]],
      channel: [params ? params.channel : null, Validators.required],
    }, { updateOn: 'blur' });
  }

  onSubmit(): void {
    const person: Person = this.formPerson.value;

    forkJoin([
      ajax.getJSON(`https://viacep.com.br/ws/${person.zipcode}/json/`)
    ]).subscribe((request) => {
      const zipcodeIsNotValid = request.find((valid: any) => valid.erro);
      this.formPerson.controls.zipcode
        .setErrors(zipcodeIsNotValid ? { ...zipcodeIsNotValid as object } : null);
      this.sendData();
    });
  }

  sendData(): void {
    const person: Person = this.formPerson.value;
    console.log('zipcode::>', this.formPerson.controls.zipcode.errors)
    if (this.formPerson.valid) {
      if (this.isEdit) {
        this.dbService.update(person, person.key)
          .catch((e: any) => this.onError(e));
        this.router.navigate(['']);
      } else {
        delete person.key;
        this.dbService.create(person)
          .catch((e: any) => this.onError(e));
        this.router.navigate(['']);
      }
    }
  }

  onError(e: any) {
    console.log(e);
  }
}
