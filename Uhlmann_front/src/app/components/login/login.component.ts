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

  /* url = 'http://localhost:3000/usuarios'; */

  url = 'http://localhost:8080/usuarios';

  constructor(private router: Router,
    private http: HttpClient,
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
  }

/*   logarApi(sucess?: any, error?: any): void {
    this.urllogar().subscribe(response=> {
      const chaveok = response[0].chave;
      console.log(response[0].chave)
      
      if(chaveok === "ok") {
        this.router.navigate(['/menu'])
      }

    }, err => this.poNotification.error(err))
  }

  urllogar(): Observable<any> {
    return this.http.get(this.url + `?username=${this.login}&password=${this.password}`);
  }  */

  logar(){
    /* this.logarApi() */
    sessionStorage.setItem('login', this.login)
    this.router.navigate(['/menu'])
  }

}
