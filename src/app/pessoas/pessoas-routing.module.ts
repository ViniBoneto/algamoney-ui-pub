// 18.15. Desafio: roteamento e edição de pessoas:
//   Repetindo c/ pessoas a criação dum routing module, como feito p/ lançs na aula 18.14.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../seguranca/auth.guard';
import { PERMISSOES } from '../seguranca/permissoes';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  {
    path: "pessoas",
    component: PessoasPesquisaComponent,
    // 19.13. Protegendo rotas com guarda de rotas (CanActivate):
    //   Repetindo c/ rotas de pessoas o msm q foi feito c/ rotas de lançs.
    canActivate: [AuthGuard],
    data: { roles: [ PERMISSOES[PERMISSOES.ROLE_PESQUISAR_PESSOA] ] }
  },
  {
    path: "pessoas/nova",
    component: PessoasCadastroComponent,
    // 19.13. Protegendo rotas com guarda de rotas (CanActivate):
    //   Repetindo c/ rotas de pessoas o msm q foi feito c/ rotas de lançs.
    canActivate: [AuthGuard],
    data: { roles: [ PERMISSOES[PERMISSOES.ROLE_CADASTRAR_PESSOA] ] }
  },
  {
    path: "pessoas/:codigo",
    component: PessoasCadastroComponent,
    // 19.13. Protegendo rotas com guarda de rotas (CanActivate):
    //   Repetindo c/ rotas de pessoas o msm q foi feito c/ rotas de lançs.
    canActivate: [AuthGuard],
    data: { roles: [ PERMISSOES[PERMISSOES.ROLE_CADASTRAR_PESSOA] ] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
