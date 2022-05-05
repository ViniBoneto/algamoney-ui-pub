import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [ { path: "login", component: LoginFormComponent } ];

/* 19.3. Desafio: módulo de segurança e protótipo da tela de login:
  Criando mód de seg c/ mód aux de roteamento (ambos seguindo padrão de como já feito na app) e protótipo
  de tela de login. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }
