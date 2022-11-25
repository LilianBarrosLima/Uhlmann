import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNavbarIconAction, PoNavbarItem, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  urlApi: string = 'http://localhost:8080/formularios' 
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

  usuario_formulario: number = 1
  problemas: string = ''

  constructor(private router: Router, 
    private route: ActivatedRoute,
    private poNotification: PoNotificationService,
    private http: HttpClient) { }

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

  limpar(){
    this.ferramental_formacao = 0
    this.fabricante_pvc= ''
    this.quant_blister = 0
    this.velocidade_rpm = 0
  
    this.superior_inferior1 = 0
    this.superior_inferior2 = 0
    this.superior_inferior3 = 0
  
    this.pre_aquecimento_placas = 0
    this.retardo_placas = 0
    this.tempo_formacao = 0
    this.offset_formacao = 0
    this.profundidade_bolsa = 0
  
    this.tempo_transporte = 0
    this.offset_correcao = 0
  
    this.problemas = ''
  }

  confirmar(){
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
      "offsetDeCorrecao": this.offset_correcao ,
      "idUsuario": this.usuario_formulario,
      "problemas": this.problemas
    }

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "application/json")
    headers_send = headers_send.append("Authorization", "Bearer " + this.token) 
    
    return this.http.post(this.urlApi, parametros, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(() => {
      this.poNotification.success('Formulário adicionado com Sucesso');
      this.router.navigate(['/lista-formulario']);
    }, err => this.poNotification.error(err) );
    
  }

  salvarcontinuar(){
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
      "offsetDeCorrecao": this.offset_correcao ,
      "idUsuario": this.usuario_formulario,
      "problemas": this.problemas
    }

    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "application/json")
    headers_send = headers_send.append("Authorization", "Bearer " + this.token) 

    return this.http.post(this.urlApi, parametros, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true
    }).subscribe(() => {
      this.poNotification.success('Formulário adicionado com Sucesso');
      this.limpar()
    }, err => this.poNotification.error(err) );
  }

}
