import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/models/class.model';
import { RestCommentsService } from 'src/app/services/restComments/rest-comments.service';
import { RestCourseService } from 'src/app/services/restCourse/rest-course.service';
import { UserServiceService } from 'src/app/services/restUser/user-service.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
comments: [];
public message;
public user;
public token;
public course;
public classSelected:Class;
public commentSelected:Comment;

  constructor(private restComment: RestCommentsService, private restUser: UserServiceService, private restClass: RestCourseService) { }

  ngOnInit(): void {
    this.user = this.restUser.getUser();
    this.token = this.restUser.getToken();
    this.course = this.restClass.getClass();
    this.commentSelected = new Comment('','','','','','','','')
    this.comments = this.course.comments;
    console.log(this.user)
    console.log(this.course);
    this.listComments();
  }

  listComments(){
    console.log(this.user);
    this.restComment.getComments(this.user._id, this.course._id).subscribe((res:any)=>{
      console.log(res);
      if(res.commentsFind){
        this.comments = res.commentsFind;
        console.log(this.comments)
      }
    }, error => alert(error.error.message))
  }



  //Aqui debajo trabaja alfaro
  

  //Aqui debajo trabaja pablo
  deleteComment(){
    console.log(this.user._id, this.course._id);
    this.restClass.deleteComment(this.user._id, this.course._id, this.commentSelected).subscribe((res:any)=>{
      if(!res.commentRemoved){
        alert(res.message);
        this.ngOnInit();
      }else{
        alert(res.message);
        console.log('aqui')
        this.ngOnInit();
      }
    },
    error => alert(error.error.message))
  }

  getClass(userT){
    this.classSelected = userT;
   console.log(this.classSelected)
  }

  getComment(comment){
    this.commentSelected = comment;
   console.log(this.commentSelected)
  }

}
