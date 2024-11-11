import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/@core/models/person.model';
import { Observable } from 'rxjs';
import { DbService } from 'src/app/@core/sevices/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public peaple: Observable <Person[]>;

  constructor(
    private dbService: DbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPeaple();
  }

  onClick(person: Person) {
    this.router.navigate(['new', person]);
  }

  remove($event: any, key: string) {
    $event.stopPropagation();
    this.dbService.delete(key);
  }

  getPeaple(): void {
    this.peaple = this.dbService.getAll();
  }

}
