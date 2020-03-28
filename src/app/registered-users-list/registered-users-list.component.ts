import { PersonFirebaseService } from './../services/person-firebase.service';

import { Component, OnInit } from '@angular/core';
import { Person } from '../Person';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-registered-users-list',
  templateUrl: './registered-users-list.component.html',
  styleUrls: ['./registered-users-list.component.css']
})
export class RegisteredUsersListComponent{
  users: Person[];

  constructor(private personService: PersonFirebaseService) {

    this.personService.getPeople().snapshotChanges().pipe(
      map(changes=> changes.map(change=>({
        firstName: change.payload.child("/firstName").val(),
        secondName: change.payload.child("/secondName").val(),
        emailAddress: change.payload.child("/emailAddress").val(),
        login: change.payload.child("/login").val(),
        password: change.payload.child("/password").val(),
      })))).subscribe(prods => this.users = prods);
    }

    firstNameSort(){
      this.users.sort((one, two) => (one.firstName > two.firstName ? 1 : -1));
    }

    secondNameSort(){
      this.users.sort((one, two) => (one.secondName > two.secondName ? 1 : -1));
    }

    emailSort(){
      this.users.sort((one, two) => (one.emailAddress > two.emailAddress ? 1 : -1));
    }

    loginSort(){
      this.users.sort((one, two) => (one.login > two.login ? 1 : -1));
    }
    
}
