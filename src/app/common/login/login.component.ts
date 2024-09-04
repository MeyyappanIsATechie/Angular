import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginModel } from '../../model/login.model';
import { CommonModule } from '@angular/common';
import { MasterService } from '../../service/master.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private _loginService: MasterService, private router: Router) {}
  _loginData: LoginModel = {
    username: '',
    password: '',
  };
  ngOnInit(): void {
    localStorage.clear();
  }
  ProceedLogin(form: any) {
    if (form.valid) {
      this._loginService.ProceedLogin(this._loginData).subscribe((item) => {
        let _resp = item;
        if (_resp.length > 0) {
          localStorage.setItem('username', this._loginData.username);
          this.router.navigateByUrl('');
        } else {
          alert('Invalid credentials');
        }
      });
      // console.log(this._loginData);
    } else {
      alert('Form is not valid');
    }
  }
}
