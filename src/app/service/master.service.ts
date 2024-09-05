import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { User } from '../model/user.model';
import { Customer } from '../model/master.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private http: HttpClient) {}
  ProceedLogin(_data: LoginModel) {
    return this.http.get<User[]>(
      'http://localhost:3000/users?id=' +
        _data.username +
        '&&password=' +
        _data.password
    );
  }
  ProceedRegister(_data: User) {
    return this.http.post('http://localhost:3000/users?', _data);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  getAllCustomers() {
    return this.http.get<Customer[]>('https://dummyjson.com/users');
  }
}
