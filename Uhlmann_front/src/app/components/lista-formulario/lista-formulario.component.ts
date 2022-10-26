import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem, PoNavbarIconAction, PoNavbarItem, PoSelectOption } from '@po-ui/ng-components';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { PoTableAction, PoTableColumn, PoNotificationService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { PoModalModule } from '@po-ui/ng-components';
import { PoModalAction } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-lista-formulario',
  templateUrl: './lista-formulario.component.html',
  styleUrls: ['./lista-formulario.component.css']
})
export class ListaFormularioComponent implements OnInit {
  @ViewChild(PoModalComponent, { static: true })
  poModal!: PoModalComponent; 

  //url = 'http://localhost:3000/formularios';
  url = 'http://localhost:8080/formularios'; 
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



  ferramental_formacao: number = 0
  fabricante_pvc: string = ''
  quant_blister: number = 0
  velocidade_rpm: number = 0

  superior_inferior1: number = 0
  superior_inferior2: number = 0
  superior_inferior3: number = 0

  pre_aquecimento_placas: number = 0
  retardo_placas: number = 0
  tempo_formacao: number = 0
  offset_formacao: number = 0
  profundidade_bolsa: number = 0

  tempo_transporte: number = 0
  offset_correcao: number = 0

  usuario_formulario: number = 0
  problemas: string = ''


  dados: Array<any> = new Array();
  colunas: Array<any> = [];

  actions: Array<PoTableAction> = [
    { action: this.alterarFormulario.bind(this), icon: 'po-icon-clipboard', label: 'Detalhar/Alterar Formulário'},
    { action: this.deletarFormulario.bind(this), icon: 'po-icon-delete', label: 'Excluir Formulário' }
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

  updateCustomerList(): void {
    this.getDados().subscribe(response => {
      this.dados = response;
      console.log(response)
    });
  }

  getDados(): Observable<any> {
    //return this.http.get(this.url);
    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Authorization", "Bearer " + this.token) 
    return this.http.get(this.url, {
      headers: headers_send}); 
  }

  getColumns(): Array<PoTableColumn> {
    return [
      { property: 'ferramentalDeFormacao', label: 'Ferramental da formação'},
      { property: 'fabricanteDePVC', label: 'Fabricante do PVC' },
      { property: 'quantidadeDoBlister', label: 'Quant. Do blister' },
      { property: 'velocidadeRPM', label: 'Velocidade RPM'},
      { property: 'superiorInferior1', label: '1 Superior/Inferior', visible: false},
      { property: 'superiorInferior2', label: '2 Superior/Inferior', visible: false},
      { property: 'superiorInferior3', label: '3 Superior/Inferior', visible: false},
      { property: 'preAquecimento', label: 'Pré-aquecimento das placas', visible: false},
      { property: 'retardoDeAbertura', label: 'Retardo de abertura das placas', visible: false},
      { property: 'tempoDeFormacao', label: 'Tempo de Formação', visible: false},
      { property: 'offsetDoAr', label: 'Offset do ar de formação', visible: false},
      { property: 'profundidadeDaBolsa', label: 'Profundidade da bolsa', visible: false},
      { property: 'tempoDeTransporte', label: 'Tempo de transporte', visible: false},
      { property: 'offsetDeCorrecao', label: 'Offset de correção', visible: false},
      { property: 'usuario.id', label: 'ID Usuário', visible: false},
      { property: 'problemas', label: 'Problemas Recorrentes', visible: false},
    ];
  }

/*   pesquisar(){ 
  } */

  deletarFormulario(row: any){
    const ferramentalId = row.ferramentalDeFormacao;
    this.deletarCustomer(ferramentalId)
    .subscribe(() => {
      this.updateCustomerList();
      this.poNotification.success('Formulário Excluido com sucesso');
    }
    , err => this.poNotification.error(err));
  }

  deletarCustomer(ferramentalId: string) {
		//return this.http.delete(this.url + `/${ferramentalId}`);
    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Authorization", "Bearer " + this.token) 
    return this.http.delete(this.url + `/${ferramentalId}`, {
      headers: headers_send});
	}

  alterarFormulario(row: any){
    this.ferramental_formacao = row.ferramentalDeFormacao;
    this.fabricante_pvc = row.fabricanteDePVC;
    this.quant_blister = row.quantidadeDoBlister;
    this.velocidade_rpm = row.velocidadeRPM;
    this.superior_inferior1 = row.superiorInferior1;
    this.superior_inferior2 = row.superiorInferior2; 
    this.superior_inferior3 = row.superiorInferior3; 
    this.pre_aquecimento_placas = row.preAquecimento;
    this.retardo_placas = row.retardoDeAbertura;
    this.tempo_formacao = row.tempoDeFormacao;
    this.offset_formacao = row.offsetDoAr;
    this.profundidade_bolsa = row.profundidadeDaBolsa;
    this.tempo_transporte = row.tempoDeTransporte;
    this.offset_correcao = row.offsetDeCorrecao;
    this.usuario_formulario = row.usuario.id;
    this.problemas = row.problemas;

    this.poModal.open();
  }

  closeModal() {
    this.poModal.close();
  }

  salvarAlteracao() {

    let parametros = {
      "ferramentalDeFormacao": this.ferramental_formacao,
      "fabricanteDePVC": this.fabricante_pvc,
      "quantidadeDoBlister": this.quant_blister,
      "velocidadeRPM": this.velocidade_rpm,
      "superiorInferior1": this.superior_inferior1,
      "superiorInferior2": this.superior_inferior2,
      "superiorInferior3": this.superior_inferior3,
      "preAquecimento": this.pre_aquecimento_placas,
      "retardoDeAbertura": this.retardo_placas,
      "tempoDeFormacao": this.tempo_formacao,
      "offsetDoAr": this.offset_formacao,
      "profundidadeDaBolsa": this.profundidade_bolsa,
      "tempoDeTransporte": this.tempo_transporte,
      "offsetDeCorrecao": this.offset_correcao,
      "idUsuario": this.usuario_formulario,
      "problemas": this.problemas,
    }

    console.log(parametros)

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "application/json")
    headers_send = headers_send.append("Authorization", "Bearer " + this.token)
    
    return this.http.put(this.url + `/${this.ferramental_formacao}`, parametros, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(() => {
      this.poNotification.success('Formulário alterado com Sucesso');
      this.updateCustomerList();
      this.closeModal();
    }, err => this.poNotification.error(err) );

  }

}
