import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: User;
  userId: number;

  constructor(public router: Router) {
    let local: string = window.localStorage.getItem('userInfo');
    if (local === null) {
      this.userInfo = null;
      window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    } else {
      this.userInfo = JSON.parse(local);
    }

    let localUsers: string = window.localStorage.getItem('users');
    if (localUsers === null) {
      window.localStorage.setItem('users', JSON.stringify([]));
    }
  }

  signup(email: string, username: string, password: string): string {
    // 1st add the new user to the 'database' of all users
    let users: Array<User> = JSON.parse(window.localStorage.getItem('users'));
    // Check if email already exists
    let conflict: boolean = false;
    users.forEach((user) => {
      if (user.email === email) {
        conflict = true;
      }
    });
    if (conflict === true) {
      return 'That email is already taken';
    }
    users.push(new User((users.length + 1), email, username, password));
    window.localStorage.setItem('users', JSON.stringify(users));
    // 2nd log the user in!
    this.login(username, password);
    return '';
  }

  login(username: string, password: string): string {
    let users: Array<User> = JSON.parse(window.localStorage.getItem('users'));
    // Check if email already exists
    users.forEach((user) => {
      if (user.username === username && user.password === password) {
          this.userInfo = user;
          window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      }
    });
    // redirect to home
    this.router.navigate([""]);
    return '';
  }

  logout(): void {
    window.localStorage.setItem('userInfo', null);
    this.userInfo = null;
    this.router.navigate([""]);
  }

  changePassword(password: string, newpassword: string): string {
    let users: Array<User> = JSON.parse(window.localStorage.getItem('users'));
    // Check if email already exists
    users.forEach((user, index) => {
      if (user.email === this.userInfo.email) {
        if (user.password === password) {
          this.userInfo.password = newpassword;
          users[index] = this.userInfo;
          window.localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          window.localStorage.setItem('users', JSON.stringify(users));
          this.router.navigate([""]);
          return '';
        }
      }
    });
    return "NOOOO";
  }

}
