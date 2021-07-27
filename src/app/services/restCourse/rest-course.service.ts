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

  getClassesByTeacher(idUser){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+ 'listClassByT/'+idUser,{headers: headers})
    .pipe(map(this.extractData))
  }

  allClasses(idUser){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.get(this.uri+ 'allClasses/'+idUser,{headers: headers})
    .pipe(map(this.extractData))
  }

  inscription(idUser, idClass){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.put(this.uri+'inscription/'+idUser+'/'+idClass, {headers:headers})
    .pipe(map(this.extractData))
  }


  deleteInscription(idUser, idClass){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    return this.http.delete(this.uri+'deleteInscription/'+idUser+'/'+idClass, {headers:headers})
    .pipe(map(this.extractData))
  }

  saveCourse(idUser,course){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    let params = JSON.stringify(course);
    return this.http.post(this.uri+'saveClass/'+idUser, params,{headers:headers})
    .pipe(map(this.extractData));
  }

  deleteCourseByTeacher(idUser,idCourse){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
    return this.http.delete(this.uri+'deleteClass/'+idUser+'/'+idCourse, {headers: headers})
    .pipe(map(this.extractData))
  }

  fileRequest(idUser:string, idClass: string,params: Array<string>, files: Array<File>, token:string, name:string){
    return new Promise((resolve, reject)=>{
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      let uri = this.uri+'uploadImageC/'+idUser+'/'+idClass;

      for(var i=0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }
      xhr.onreadystatechange = ()=>{
        if(xhr.readyState == 4){
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          }else{
            reject(xhr.response)
          }
        }
      }
      xhr.open('PUT', uri, true);
      xhr.setRequestHeader('Authorization', token);
      xhr.send(formData);
    })
   }

   
}
