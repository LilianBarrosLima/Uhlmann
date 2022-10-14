import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  collapsed: boolean = true
  filter: boolean = false
  isHideLoading: boolean = false
  
  quant_blister: string = ''
  velocidade_rpm: string = ''
  usuario_formulario: string = ''

  menu_panel: string = sessionStorage.getItem('login') || ''
  ferramental_formacao: number = 0
  fabricante_pvc: number = 0

  readonly menus: Array<PoMenuItem> = [
    { label: 'Homepage', icon: 'po-icon-home', action: this.voltar.bind(this) },
    { label: 'Cadastrar', icon: 'po-icon-edit', action: this.routeCadastro.bind(this) }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carregaUsuario()
  }

  carregaUsuario() {
    if(this.menu_panel !=  '') {
      this.usuario_formulario = this.menu_panel
    }
  }

  private routeCadastro() {
    this.router.navigate(['/cadastro-formulario'])
  }

  voltar() {
    this.router.navigate(['/menu'])
  }

}
