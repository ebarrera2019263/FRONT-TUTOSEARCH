import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from '../../services/restUser/user-service.service';
import { Router } from '@angular/router';
import { CONNECTION } from 'src/app/services/global';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public title;
  public user: User;
  public token;
  public message;
  public uri;
  public status: boolean;
  public possiblePass;

  constructor(private restUser: UserServiceService, private router:Router) { 
    this.title = 'Your Account';
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.possiblePass = '';
    this.uri = CONNECTION.URI;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    delete this.user.password;
    delete this.user.role;
    this.restUser.updateUser(this.user).subscribe((res:any)=>{
      if(res.userUpdated){
        this.status = true;
        this.message = res.message;
        delete res.userUpdated.password;
        localStorage.setItem('user', JSON.stringify(res.userUpdated))
      }else{
        this.status = false;
        this.message = res.message;
        this.user = this.restUser.getUser();
      }
    }, error => alert(error.error.message))
  }

  deleteAccount(){
    this.restUser.deleteUser(this.user._id, this.possiblePass).subscribe((res:any)=>{
      if(!res.userRemoved){
        alert(res.message);
      }else{
        alert(res.message);
        localStorage.clear();
        this.router.navigateByUrl('home')
      }
    }, error => alert(error.error.message))
  }

}
