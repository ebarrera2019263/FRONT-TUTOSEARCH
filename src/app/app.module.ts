import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserComponent } from './components/user/user.component';
import { ListCoursesByStudentComponent } from './components/list-courses-by-student/list-courses-by-student.component';
import { RegisterEstudentComponent } from './components/register-estudent/register-estudent.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    NotFoundComponent,
    UserComponent,
    ListCoursesByStudentComponent,
    RegisterEstudentComponent,
    ListUsersComponent,
    SearchPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
