/* 18.14. Criando um Routing Module para o módulo de funcionalidade:
  Msm criando um mód separado p/ configs de rotas (app-routing.module.ts), se a app e o nº de rotas crescerem mto,
  este ainda pode ficar mto grd e confuso. P/ melhorar a modelagem da app, vamos criar móds de rotas associados aos
  móds de funcionalidades (p/ pessoas, lançs, etc...), q conterão apenas configs de rotas associadas aos comps de cada
  mód, q serão retiradas do mód de rotas associado ao mód raiz (app-routing.module.ts).

Seguido a nomenclatura padrão do NG, o mód de rotas associado ao mód de lançs (lancamentos.module.ts) dever-se-há chamar
lancamentos-routing.module.ts. */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
  { path: "lancamentos", component: LancamentosPesquisaComponent },
  { path: "lancamentos/novo", component: LancamentosCadastroComponent },
  { path: "lancamentos/:codigo", component: LancamentosCadastroComponent },
];

@NgModule({
/* 18.14. Criando um Routing Module para o módulo de funcionalidade:
    Qdo importamos o mód de roteamento do NG (RouterModule) no mód raiz (app.module.ts) ou no mód de rotas a ele
    associado (app-routing.module.ts), invocamos o método RouterModule.forRoot() p/ configurá-lo, conforme já
    explicado. Qdo estamos num outro mód, como neste caso, usamos RouterModule.forChild(). */
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancamentosRoutingModule { }
