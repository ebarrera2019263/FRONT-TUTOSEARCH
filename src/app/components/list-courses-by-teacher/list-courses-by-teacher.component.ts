import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { UserServiceService } from '../../services/restUser/user-service.service';

@Component({
  selector: 'app-list-courses-by-teacher',
  templateUrl: './list-courses-by-teacher.component.html',
  styleUrls: ['./list-courses-by-teacher.component.css']
})
export class ListCoursesByTeacherComponent implements OnInit {
  classes:[];
  public message;
  public user;
  public token;
  public classSelected;
  
  constructor(private restClass: RestCourseService, private restUser: UserServiceService) { }

  ngOnInit(): void {
    this.classSelected = new Class('','','','','',[])
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.listCourses();
  }

  onSubmit(createCourse){
    this.restClass.saveCourse(this.user._id, this.classSelected).subscribe((res:any)=>{
      if(res.savedC){
        alert(res.message);
        this.classSelected = new Class('','','','','',[]);
        createCourse.reset();
      }else{
        console.log(this.message)
      }
      error =>{
        console.log(error.error.message);
      }
    })
  }

  listCourses(){
    console.log(this.user);
    this.restClass.getClassesByTeacher(this.user._id).subscribe((res:any)=>{
      console.log(res)
      if(res.classF){
        //alert(res.message)
        this.classes = res.classF;
        console.log(this.classes)
      }else{
        alert(res.message)
      }
    },
    error => alert(error.error.message))
  }

}
