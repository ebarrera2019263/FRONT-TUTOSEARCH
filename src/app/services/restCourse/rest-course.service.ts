import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';
import { UserServiceService } from '../../services/restUser/user-service.service';
@Injectable({
  providedIn: 'root'
})
export class RestCourseService {
  public user;
  public uri: string;

  public httOptionsAuth = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.restUser.getToken()
    })
  };
  public token;
  public league;
  private extractData(res: Response){
    let body = res;
    return body || [] || {};
  }
  constructor(private http:HttpClient, private restUser:UserServiceService) {
    this.uri = CONNECTION.URI;
   }

   getToken(){
    let token = localStorage.getItem('token');
    if(token != null || token != undefined){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token;
  }

  getClassesByStudent(idUser){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+ 'listClassByS/'+idUser,{headers: headers})
    .pipe(map(this.extractData))
  }

}
