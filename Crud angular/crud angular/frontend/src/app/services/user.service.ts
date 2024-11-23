import { HttpClient } from '@angular/common/http';
import { inject, Injectable, model } from '@angular/core';
import User from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:3000'; // Removed the trailing slash
  httpClient = inject(HttpClient);

  constructor() {}

  getUsers() {
    return this.httpClient.get<User[]>(`${this.apiUrl}/users`); // No double slashes here
  }
  getUser(id:string) {
    return this.httpClient.get<User>(`${this.apiUrl}/users/`+id); // No double slashes here
  }
  addUser (model:User){
    return this.httpClient.post(`${this.apiUrl}/users`,model);
  }
  updateUser(id: string, model:User){
    return this.httpClient.put(this.apiUrl+ '/users/'+ id, model)

  }
  deleteUser(id:string){
    return this.httpClient.delete(this.apiUrl+ '/users/'+ id)
  }
}
