import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Role } from '../../model/role.model';
import { MasterService } from '../../service/master.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private services: MasterService,
    private router: Router
  ) {
    this.registerForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      name: this.builder.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this.builder.control('', [Validators.required, Validators.email]),
      password: this.builder.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      confirmPassword: this.builder.control('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ]),
      role: this.builder.control('salesman', Validators.required),
      gender: this.builder.control('m', Validators.required),
      terms: this.builder.control(true),
    });
  }
  roles: Role[] = [
    { value: 'salesman', viewValue: 'Salesman' },
    { value: 'supervisor', viewValue: 'Supervisor' },
    { value: 'manager', viewValue: 'Manager' },
  ];
  // registerForm = new FormGroup({
  //   // username: new FormControl(
  //   //   { value: '', disabled: true },
  //   //   Validators.required
  //   // ),
  //   username: new FormControl('', Validators.required),
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   role: new FormControl('salesman', Validators.required),
  //   gender: new FormControl('m', Validators.required),
  //   terms: new FormControl(true),
  // });
  ProceedRegister() {
    if (this.registerForm.valid) {
      // console.log(this.registerForm.value);
      if (this.registerForm.value.terms) {
        let _data: User = {
          id: this.registerForm.value.username as string,
          name: this.registerForm.value.name as string,
          email: this.registerForm.value.email as string,
          password: this.registerForm.value.password as string,
          confirmPassword: this.registerForm.value.confirmPassword as string,
          role: this.registerForm.value.role as string,
          gender: this.registerForm.value.gender as string,
        };
        this.services.ProceedRegister(_data).subscribe((data) => {
          alert('registered successfully');
          this.router.navigateByUrl('/login');
        });
      } else {
        alert('Please accept terms and conditions');
      }
    }
    // this.registerForm.setValue({username:'admin',name:'admin'})
  }
}
