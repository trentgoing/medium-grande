import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  username: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submitSignup() {
    this.authService.signup(this.email, this.username, this.password);
  }

}
