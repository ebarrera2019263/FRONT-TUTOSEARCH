import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { ListCoursesByStudentComponent } from './components/list-courses-by-student/list-courses-by-student.component';
import { RegisterEstudentComponent } from './components/register-estudent/register-estudent.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
 
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'registerEstudent', component:RegisterEstudentComponent},
  {path: 'user', component:UserComponent},
  {path: 'listCoursesStudents', component:ListCoursesByStudentComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
