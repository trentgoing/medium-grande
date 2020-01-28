import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NoteComponent } from '../note/note.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ArticleComponent } from '../article/article.component';
import { MarginComponent } from '../margin/margin.component';
import { NoteInputComponent } from '../note-input/note-input.component';
import { User } from '../types/user';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AppRoutingModule,
      FormsModule
    ],
    declarations: [
      NoteComponent,
      HomeComponent,
      LoginComponent,
      SignupComponent,
      ChangePasswordComponent,
      ArticleComponent,
      MarginComponent,
      NoteInputComponent,
    ]
  }));

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should initialize localstorage for user info', () => {
    expect(window.localStorage.getItem('userInfo')).toEqual(null);
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).not.toEqual(null);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
  });

  it('should initialize localstorage for all users', () => {
    expect(window.localStorage.getItem('users')).toEqual(null);
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('users')).not.toEqual(null);
    expect(window.localStorage.getItem('users')).toEqual("[]");
  });

  it('should signup a new user within users on localstorage', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('users')).toEqual("[]");
    service.signup("test", "test", "test");
    expect(JSON.parse(window.localStorage.getItem('users')).length).toEqual(1);
    expect(JSON.parse(window.localStorage.getItem('users'))[0].username).toEqual("test");
  });

  it('should login upon signup', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.signup("test", "test", "test");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("test");
  });

  it('should reject a signup if already used email', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('users')).toEqual("[]");
    service.signup("test", "test", "test");
    service.signup("test", "test", "test");
    expect(JSON.parse(window.localStorage.getItem('users')).length).toEqual(1);
  });

  it('should login a valid user', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.signup("test", "test", "test");
    service.logout();
    service.login("test", "test");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("test");
  });

  it('should reject a bad user', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.signup("test", "test", "test");
    service.logout();
    service.login("test", "wrong");
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
  });

  it('should log out a user on logout', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.signup("test", "test", "test");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("test");
    service.logout();
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
  });

  it('should change a password in valid case', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.signup("test", "test", "test");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("test");
    service.changePassword("test", "newpassword");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("newpassword");
  });

  it('should not change a password if given wrong password', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.signup("test", "test", "test");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("test");
    service.changePassword("WRONG", "newpassword");
    expect(window.localStorage.getItem('userInfo')).not.toEqual("null");
    expect(service.userInfo.password).toEqual("test");
  });

  it('should not change a password if not logged in', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
    service.changePassword("WRONG", "newpassword");
    expect(window.localStorage.getItem('userInfo')).toEqual("null");
    expect(service.userInfo).toEqual(null);
  });

});
