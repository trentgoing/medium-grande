import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  newPassword: string;
  oldPassword: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  submitChange() {
    this.authService.changePassword(this.oldPassword, this.newPassword);
  }

}
