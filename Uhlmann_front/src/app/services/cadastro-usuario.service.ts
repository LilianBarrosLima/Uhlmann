import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  urlApi: string = environment.base_companies

  constructor(private http: HttpClient) { }

  //*****Funções*****
  //Função para cadastrar usuário

  cadastrarUsuario(sucess?: any, error?: any) {
    //Url da api para requisição
    let url = this.urlApi + 'usuarios'

    //Cabeçalho da requisição
    let headers_send = new HttpHeaders()
    headers_send = headers_send.append("Content-Type", "appication/json")

    //Corpo(body) da requisição -> JSON a ser enviado do Angular para a api
    return this.http.post(url, {
      headers: headers_send,
      responseType: 'json',
      withCredentials: true //Necessário ???
    }).subscribe(sucess, error)

  } 
    
}
