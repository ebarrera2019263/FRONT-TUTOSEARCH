import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

import { UserServiceService } from '../../services/restUser/user-service.service';

@Component({
  selector: 'app-register-estudent',
  templateUrl: './register-estudent.component.html',
  styleUrls: ['./register-estudent.component.css'],
  
})
export class RegisterEstudentComponent implements OnInit {
  
  public user:User;
  public message;
  public userSaved:string;


  constructor(private userService: UserServiceService) { 
    this.user = new User('', '', '', '', '', '', '','ROLE_ESTUDENT');
  }

  ngOnInit(): void {
  }

  onSubmit(register){
    console.log(this.user);
    this.userService.saveUserbyStudent(this.user).subscribe((res:any)=>{
      this.message = res.message;
      if(res.userSaved){
        alert(this.message)
        this.userSaved = res.userSaved.username;
        register.reset();
        console.log(this.user)
      }else{
        console.log(this.message);
      }
    },
    error=> console.log(<any>error)
    )
  }


}
