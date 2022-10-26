import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoMenuItem, PoNavbarIconAction, PoNavbarItem, PoSelectOption } from '@po-ui/ng-components';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PoNotificationService } from '@po-ui/ng-components'

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  //urlApi: string = 'http://localhost:3000/usuarios' 
  urlApi: string = 'http://localhost:8080/usuarios' 
  token: string = sessionStorage.getItem('token') || ''

  readonly icones_actions: Array<PoNavbarIconAction> = [
    { label: 'Logout', icon: 'po-icon-exit', action: this.logout.bind(this), tooltip: 'Sair' },
  ];
  
  readonly items_actions: Array<PoNavbarItem> = [
    { label: 'Inicial', action: this.routeMenu.bind(this) },
    { label: 'Cadastrar usuário',  action: this.routeCadastroUsuario.bind(this) },
    { label: 'Lista de usuários',  action: this.routeListaUsuario.bind(this) },
    { label: 'Cadastro formulário',  action: this.routeCadastroFormulario.bind(this) },
    { label: 'Lista de formulários', action: this.routeListaFormulario.bind(this) }
  ];

  nome_usuario: string = '' 
  login_usuario: string = ''
  senha_usuario: string = ''
  email_usuario: string = ''
  
  constructor(private router: Router, 
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  private routeMenu() {
    this.router.navigate(['/menu'])
  }

  private routeCadastroUsuario() {
    this.router.navigate(['/cadastro-usuario'])
  }

  private routeListaUsuario() {
    this.router.navigate(['/lista-usuario'])
  }

  private routeCadastroFormulario() {
    this.router.navigate(['/cadastro-formulario'])
  }

  private routeListaFormulario() {
    this.router.navigate(['/lista-formulario'])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
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
    headers_send = headers_send.append("Authorization", "Bearer " + this.token) 
    
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
    headers_send = headers_send.append("Authorization", "Bearer " + this.token) 

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
