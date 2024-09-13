import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { LoginModel } from '../model/login.model';
import { User } from '../model/user.model';
import { Customer } from '../model/master.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  counterValue = signal<number>(0);
  players = signal([{ id: 1, name: 'ronaldo' }]);
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
  getAllCustomersLocally() {
    let token = ''; //actual token
    let _head = new HttpHeaders().set('Authorization', 'bearer ' + token);
    return this.http.get<Customer[]>('https://dummyjson.com/users', {
      headers: _head,
    });
  }
}
