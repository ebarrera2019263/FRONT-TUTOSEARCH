import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserServiceService } from 'src/app/services/restUser/user-service.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users:[];
  search;
  public userSelected:User;
  public user;


  constructor(private restUser: UserServiceService) { }

  ngOnInit(): void {
    this.userSelected = new User('','','','','','','','')
    this.user = this.restUser.getUser();
    this.listUsers();
      
  
  }

  listUsers(){
    this.restUser.getUsers().subscribe((res:any)=>{
      if(res.users){
        this.users= res.users;
        console.log(this.users)
      }else{
        alert(res.message)
      }
    }, error=> alert(error.error.message));
  }

  getUser4(userT){
    this.userSelected = userT;
   console.log(this.userSelected)
  }

 

}