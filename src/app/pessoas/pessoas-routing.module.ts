// 18.15. Desafio: roteamento e edição de pessoas:
//   Repetindo c/ pessoas a criação dum routing module, como feito p/ lançs na aula 18.14.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  { path: "pessoas", component: PessoasPesquisaComponent },
  { path: "pessoas/nova", component: PessoasCadastroComponent },
  { path: "pessoas/:codigo", component: PessoasCadastroComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoasRoutingModule { }
