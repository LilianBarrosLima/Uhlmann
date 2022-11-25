import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { InicialComponent } from './components/inicial/inicial.component';
import { ListaFormularioComponent } from './components/lista-formulario/lista-formulario.component';
import { ListaUsuarioComponent } from './components/lista-usuario/lista-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { PaginaBloqueadaComponent } from './components/pagina-bloqueada/pagina-bloqueada.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: InicialComponent},
  { path: 'cadastro-formulario', component: CadastroComponent },
  { path: 'cadastro-usuario', component: CadastroUsuarioComponent },
  { path: 'lista-usuario', component: ListaUsuarioComponent },
  { path: 'lista-formulario', component: ListaFormularioComponent },
  { path: 'pagina-bloqueada', component: PaginaBloqueadaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
