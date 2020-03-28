import { PersonFirebaseService } from './../services/person-firebase.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent{
  correctInput=true;
  constructor(private personService: PersonFirebaseService, private toastr: ToastrService, private router:Router) {

   }

  register(){
    if(this.isFirstNameCorrect() &&
      this.isSecondNameCorrect() &&
      this.isEmailCorrect() &&
      this.isLoginCorrect() &&
      this.isPasswordCorrect()){
    var firstName = <HTMLInputElement>document.getElementById("InputFirstName");
    var secondName = <HTMLInputElement>document.getElementById("InputSecondName");
    var email = <HTMLInputElement>document.getElementById("InputEmail");
    var login = <HTMLInputElement>document.getElementById("InputLogin");  
    var password = <HTMLInputElement>document.getElementById("InputPassword");
    this.personService.addPerson(firstName.value,secondName.value,email.value,login.value,password.value);
    this.toastr.success('Użytkownik został zarejestrowany',"", {positionClass: 'toast-bottom-right'});
    this.router.navigate([`/registered-users-list`]);
    }
    else{
      this.correctInput = false;
      this.toastr.error('Sprawdź ponownie poprawność danych',"", {positionClass: 'toast-bottom-right'});
    }
  }

  showPassword()
  {
    var inputPass = <HTMLInputElement>document.getElementById("InputPassword");
    var buttonPass = <HTMLButtonElement>document.getElementById("ButtonPassword");
    if(inputPass.type === "password"){
      inputPass.type = "text";
      buttonPass.textContent = "Schowaj";
    }else{
      inputPass.type = "password";
      buttonPass.textContent = "Pokaż";
    }
  }

  isFirstNameCorrect()
  {
    var firstName = <HTMLInputElement>document.getElementById("InputFirstName");
    if(firstName.value.length>=3) return true;
    else return false;
  }

  isSecondNameCorrect()
  {
    var secondName = <HTMLInputElement>document.getElementById("InputSecondName");
    if(secondName.value.length>=3) return true;
    else return false;
  }

  emailExists(){
    var email = <HTMLInputElement>document.getElementById("InputEmail");
    return this.personService.emailExists(email.value);
  }

  isEmailCorrect()
  {
    var email = <HTMLInputElement>document.getElementById("InputEmail");
    var emailExists = this.personService.emailExists(email.value);
    var emailLength = email.value.length;
    var at = false;
    var dot = false;
    for(let i=0;i<email.value.length;i++){
      if(email.value[i] == "@"){
        at=true;
      } 
      if(at==true){
        if(email.value[i] == ".") dot=true;
      }
    }
    if(emailExists==false && emailLength>=5 && dot==true) return true;
    else return false;
  }

  loginExists(){
    var login = <HTMLInputElement>document.getElementById("InputLogin");
    return this.personService.loginExists(login.value);
  }

  isLoginCorrect()
  {
    var login = <HTMLInputElement>document.getElementById("InputLogin");
    var loginExists = this.personService.loginExists(login.value);
    var loginLength = login.value.length;
    if(loginExists==false && loginLength>=5) return true;
    else return false;
  }

  isPasswordCorrect()
  {
    var password = <HTMLInputElement>document.getElementById("InputPassword");
    if(password.value.length>=5) return true;
    else return false;
  }
}
