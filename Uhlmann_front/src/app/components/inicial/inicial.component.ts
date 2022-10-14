import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { PoSlideModule } from '@po-ui/ng-components'

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  collapsed: boolean = false
  filter: boolean = false

  menu_panel: string = sessionStorage.getItem('login') || ''

  readonly menus: Array<PoMenuItem> = [
    { label: 'Usuários', icon: 'po-icon-user', action: this.routeListaUsuario.bind(this) },
    { label: 'Formulários', icon: 'po-icon-document', action: this.routeCadastroFormulario.bind(this) },
    { label: 'Logout', icon: 'po-icon-exit', action: this.logout.bind(this) }
  ];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  private routeListaUsuario() {
    this.router.navigate(['/lista-usuario'])
  }

  private routeCadastroFormulario() {
    this.router.navigate(['/cadastro-formulario'])
  }

  logout() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

}
