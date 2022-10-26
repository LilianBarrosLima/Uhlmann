import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoNavbarIconAction, PoNavbarItem } from '@po-ui/ng-components';
import { PoSlideModule } from '@po-ui/ng-components'

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {
  
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

  constructor(private router: Router) { }

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

}
