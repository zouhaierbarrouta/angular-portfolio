import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  hidePassword = true;

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (this.authService.login(this.username, this.password)) {
      this.dialogRef.close(true);
    } else {
      this.error = 'Invalid credentials';
    }
  }

}
