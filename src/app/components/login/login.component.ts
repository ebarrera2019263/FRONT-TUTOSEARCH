import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/restUser/user-service.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: User;
  public token:string;
  public message;

  constructor(private restUser: UserServiceService, private router: Router) { 
    this.user = new User('','','','','','','','')
  }

  ngOnInit(): void {
  }
  onSubmit(){
    this.restUser.login(this.user, 'true').subscribe((res:any)=>{
      this.message = res.message;
      if(!res.token){
        alert(this.message);
      }else{
        delete res.user.password;
        this.token = res.token;
        if(this.token.length <= 0){
          alert('El token no se generó o capturó de manera correcta');
        }else{
          localStorage.setItem('token', this.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('role', JSON.stringify(res.role));    
          console.log(res.user, res.token);
          alert('Usuario logeado exitosamente');
          this.router.navigateByUrl('home')
        }
      }
    },
    error=> this.message = error.error.message
    )     
  }

}
