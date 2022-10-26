import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoControlPositionModule, PoDialogService, PoNotificationService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string = ''
  password: string = ''
  token: string = sessionStorage.getItem('token') || ''

  urlApi = 'http://localhost:8080/oauth/token'

  constructor(private router: Router,
    private http: HttpClient,
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
  }

/*   logar(){
    this.router.navigate(['/menu'])
  } */

  logar(): void {
      this.auth().subscribe(response => {
        const token = response.access_token;
        console.log(response.access_token)
        sessionStorage.setItem('token', token)
        this.poNotification.success('Usuário logado com Sucesso'); 
        this.router.navigate(['/menu']); 
     }, err => this.poNotification.error('Usuário e/ou senha inválido. Tente novamente.')); 
  }

  auth(): Observable<any> {
    let grant_type = 'password';
    let username = this.login;
    let password = this.password;
    let body = `grant_type=${grant_type}&username=${username}&password=${password}`;

    console.log(body)

    let headers_send = new HttpHeaders()
     headers_send = headers_send.append("Authorization", "Basic " + btoa("Uhlmann-app:123"))
     headers_send = headers_send.append("Content-Type", "application/x-www-form-urlencoded") 
    console.log(headers_send)

    return this.http.post(this.urlApi, body, {
      headers: headers_send, 
      responseType: 'json',
      withCredentials: true
    })
  } 
  
}
