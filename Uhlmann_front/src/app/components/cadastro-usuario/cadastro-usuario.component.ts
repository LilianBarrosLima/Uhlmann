import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoMenuItem, PoSelectOption } from '@po-ui/ng-components';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PoNotificationService } from '@po-ui/ng-components'

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  /* urlApi: string = 'http://localhost:3000/usuarios' */ 
  urlApi: string = 'http://localhost:8080/usuarios'

  collapsed: boolean = true
  filter: boolean = false
  isHideLoading: boolean = false //retirar

  menu_panel: string = sessionStorage.getItem('login') || ''

  nome_usuario: string = '' 
  login_usuario: string = ''
  senha_usuario: string = ''
  email_usuario: string = ''

  readonly menus: Array<PoMenuItem> = [
    { label: 'Homepage', icon: 'po-icon-home', action: this.homePage.bind(this) },
    { label: 'Voltar', icon: 'po-icon-arrow-left', action: this.routeVoltarUsuario.bind(this) }
  ];
  
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private http: HttpClient/*private cadastroUsuarioService: CadastroUsuarioService*/) { }

  ngOnInit(): void {
  }

  homePage() {
    this.router.navigate(['/menu'])
  }

  routeVoltarUsuario() {
    this.router.navigate(['/lista-usuario'])
  }

  limpar(){
    this.nome_usuario = ''
    this.login_usuario = ''
    this.senha_usuario = ''
    this.email_usuario = ''
  }
  
  confirmar(){
    let parametros = {
      "nome": this.nome_usuario,
      "username": this.login_usuario,
      "password": this.senha_usuario,
      "email": this.email_usuario
    }

    console.log(parametros)

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "application/json")
    
    return this.http.post(this.urlApi, parametros, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(() => {
      this.poNotification.success('Usuário inserido com Sucesso');
      this.router.navigate(['/lista-usuario']);
    }, err => this.poNotification.error(err) );
  }

  salvarcontinuar(){
    let parametros = {
      "nome": this.nome_usuario,
      "username": this.login_usuario,
      "password": this.senha_usuario,
      "email": this.email_usuario
    }

    console.log(parametros)

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "application/json")

    return this.http.post(this.urlApi, parametros, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(() => {
      this.poNotification.success('Usuário inserido com Sucesso');
      this.limpar()
    }, err => this.poNotification.error(err) );
  }
    
}
