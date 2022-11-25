import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoNavbarIconAction, PoNavbarItem } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components'

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {
  
token: string = sessionStorage.getItem('token') || ''
login: string = sessionStorage.getItem('usuariologado') || ''

readonly icones_actions: Array<PoNavbarIconAction> = [
  { label: 'Logout', icon: 'po-icon-exit', action: this.logout.bind(this), tooltip: 'Sair' },
];

readonly items_actions: Array<PoNavbarItem> = [
  { label: 'Inicial', action: this.routeMenu.bind(this) },
  { label: 'Cadastrar usuário',  action: this.routeCadastroUsuario.bind(this) },
  { label: 'Lista de usuários',  action: this.routeListaUsuario.bind(this) },
  { label: 'Cadastro formulário',  action: this.routeCadastroFormulario.bind(this) },
  { label: 'Lista de formulários', action: this.routeListaFormulario.bind(this) }
]
  constructor(private router: Router,
    private poNotification: PoNotificationService) { }

  ngOnInit(): void {
    if (this.token === ''){
      this.router.navigate(['/pagina-bloqueada'])
    }
  }

  private routeMenu() {
    this.router.navigate(['/menu'])
  }

  private routeCadastroUsuario() {
    if (this.login === 'Davi'){
      this.router.navigate(['/cadastro-usuario'])
    }else{
      this.poNotification.error('Somente usuário Administrador possui essa permissão');  
    }
  }

  private routeListaUsuario() {
    if (this.login === 'Davi'){
      this.router.navigate(['/lista-usuario'])
    }else{
      this.poNotification.error('Somente usuário Administrador possui essa permissão');  
    }
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

}
