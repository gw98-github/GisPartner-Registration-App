import { ToastrService } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { Person } from './../Person';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonFirebaseService {

  registeredPeople: Observable<any[]>;
  people: Array<Person>;

  constructor(public db: AngularFireDatabase) { 
    this.registeredPeople = db.list('registered').valueChanges();
    this.db.list('registered').snapshotChanges().pipe(
      map(changes=> changes.map(change=>({
        firstName: change.payload.child("/firstName").val(),
        secondName: change.payload.child("/secondName").val(),
        emailAddress: change.payload.child("/emailAddress").val(),
        login: change.payload.child("/login").val(),
        password: change.payload.child("/password").val(),
      })))).subscribe(prods => this.people = prods);
      
  }
  getPeople()
  {
    return this.db.list('registered');
  }

  getPeopleArray()
  {
    console.log(this.people);
    return this.people;
  }

  loginExists(l){
    if(l.length>0){
      var loginExists = false;
    
      this.people.forEach(element => {
        if(element.login === l) loginExists = true;
      });
      return loginExists;
    }
    return false;
  }

  emailExists(l){
    if(l.length>0){
      var emailExists = false;
  
      this.people.forEach(element => {
        if(element.emailAddress === l) emailExists = true;
      });
      return emailExists;
    }
    return false;
  }

  addPerson(fn, sn, e, l, p){
    var loginExists = false;
  
    this.people.forEach(element => {
      if(element.login === l) loginExists = true;
    });
    if(loginExists == false){
      var per: Person ={
        firstName: fn,
        secondName: sn,
        emailAddress: e,
        login: l,
        password: p
        };
        this.db.list('registered').push(per);
    }else{
    }
  }

  getRegistered(){
    var result: Person[];
    for(let i=0; i<this.people.length; i++){
      result[i] = this.people[i];
    }
    return result;
  }
}
