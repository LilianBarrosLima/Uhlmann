import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { RouterModule } from '@angular/router';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { InicialComponent } from './components/inicial/inicial.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { ListaFormularioComponent } from './components/lista-formulario/lista-formulario.component';
import { PaginaBloqueadaComponent } from './components/pagina-bloqueada/pagina-bloqueada.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicialComponent,
    CadastroComponent,
    CadastroUsuarioComponent,
    ListaUsuarioComponent,
    ListaFormularioComponent,
    PaginaBloqueadaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PoModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    PoTemplatesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
