import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoSelectOption } from '@po-ui/ng-components';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { PoModalModule } from '@po-ui/ng-components';
import { PoModalAction } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';


@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true })
  poModal!: PoModalComponent;

  /* url = 'http://localhost:3000/usuarios'; */
  url = 'http://localhost:8080/usuariosCadastrados';

  collapsed: boolean = true
  filter: boolean = false
  isHideLoading: boolean = false //retirar

  id_usuario: string = '' 
  nome_usuario: string = '' 
  login_usuario: string = ''
  senha_usuario: string = ''
  email_usuario: string = ''

  menu_panel: string = sessionStorage.getItem('login') || ''

  dados: Array<any> = new Array();
  colunas: Array<any> = [];

  readonly menus: Array<PoMenuItem> = [
    { label: 'Homepage', icon: 'po-icon-home', action: this.voltar.bind(this) },
    { label: 'Cadastrar', icon: 'po-icon-user-add', action: this.routeCadastroUsuario.bind(this) }
  ];

  actions: Array<PoTableAction> = [
    { action: this.alterarUsuario.bind(this), icon: 'po-icon-edit', label: 'Alterar Usuário'},
    { action: this.deletarUsuario.bind(this), icon: 'po-icon-delete', label: 'Excluir Usuário' }
  ];

  fechar: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Fechar',
    danger: true
  };

  alterar: PoModalAction = {
    action: () => {
      this.salvarAlteracao();
    },
    label: 'Confirmar'
  };

  constructor(private http: HttpClient,
    private router: Router,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    this.updateCustomerList();
    this.colunas = this.getColumns();
  }

  private routeCadastroUsuario() {
    this.router.navigate(['/cadastro-usuario'])
  }

  voltar() {
    this.router.navigate(['/menu'])
  }

  updateCustomerList(): void {
    this.getDados().subscribe(response => {
      this.dados = response;
      console.log(response)
    });
  }

  getDados(): Observable<any> {
    return this.http.get(this.url);
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'id', label: 'ID'},
      { property: 'nome', label: 'Nome' },
      { property: 'username', label: 'Usuário' },
      { property: 'password', label: 'Senha' },
      { property: 'email', label: 'E-mail' },
    ];
  }

  deletarUsuario(row: any){
    const usuarioId = row.id;
    this.deletarCustomer(usuarioId)
    .subscribe(() => {
      this.updateCustomerList();
      this.poNotification.success('Usuário Excluido com sucesso');
    }
    , err => this.poNotification.error(err));
  }

  deletarCustomer(usuarioId: string) {
		return this.http.delete(this.url + `/${usuarioId}`);
	}
  
  alterarUsuario(row: any){
    this.id_usuario = row.id;
    this.nome_usuario = row.nome;
    this.login_usuario = row.username;
    this.senha_usuario = row.password;
    this.email_usuario = row.email;

    this.poModal.open();

  }

  closeModal() {
    this.poModal.close();
  }

  salvarAlteracao() {

    let parametros = {
      "nome": this.nome_usuario,
      "username": this.login_usuario,
      "password": this.senha_usuario,
      "email": this.email_usuario
    }

    console.log(parametros)

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "application/json")
    
    return this.http.put(this.url + `/${this.id_usuario}`, parametros, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(() => {
      this.poNotification.success('Usuário alterado com Sucesso');
      this.updateCustomerList();
      this.closeModal();
    }, err => this.poNotification.error(err) );

  }

}
