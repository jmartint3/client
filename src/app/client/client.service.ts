import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
import { CLIENT_DATA } from './model/mock-clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<Client[]>('http://localhost:8080/client');
  }

  deleteClient(id: number) {
    return this.http.delete<Client>(`http://localhost:8080/client/${id}`);
  }

  saveClient(client: Client) {
    let url = 'http://localhost:8080/client'
    if (client.id != null) {
      url += '/' + client.id;
    }
    return this.http.put<Client>(url, client);
  }
}
