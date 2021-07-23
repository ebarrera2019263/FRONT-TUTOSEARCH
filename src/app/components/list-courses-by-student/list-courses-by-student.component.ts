import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { UserServiceService } from '../../services/restUser/user-service.service';
import { Router } from '@angular/router';

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
  constructor(private restClass: RestCourseService, private restUser: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.listCourses();
  }

  listCourses(){
    console.log(this.user);
    this.restClass.getClassesByStudent(this.user._id).subscribe((res:any)=>{
      console.log(res)
      if(res.classFind){
        //alert(res.message)
        this.classes = res.classFind;
        console.log(this.classes)
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

  deleteInscription(){
    this.restClass.deleteInscription(this.user._id, this.classSelected._id).subscribe((res:any)=>{
      if(!res.classRemoved){
        alert(res.message);
      }else{
        alert(res.message);
        localStorage.clear();
        this.router.navigateByUrl('/allCourses');
      }
    }, error => alert(error.error.message))
  }

}
