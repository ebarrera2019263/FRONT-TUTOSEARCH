import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { UserServiceService } from '../../services/restUser/user-service.service';
@Component({
  selector: 'app-list-courses-by-student',
  templateUrl: './list-courses-by-student.component.html',
  styleUrls: ['./list-courses-by-student.component.css']
})
export class ListCoursesByStudentComponent implements OnInit {
classes:[];
search;
public message;
public user;
public token;


public classSelected:Class;
  constructor(private restClass: RestCourseService, private restUser: UserServiceService) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.listLeagues();
  }

  listLeagues(){
    console.log(this.user);
    this.restClass.getClassesByStudent(this.user._id).subscribe((res:any)=>{
      console.log(res)
      if(res.ClassF){
        this.classes = res.ClassF;

      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }


}
