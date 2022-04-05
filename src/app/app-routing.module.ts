import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
// import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
// import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
// import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
// import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

/* 18.13. Refatorando as rotas para usar Routing Module:
  Conforme adicionamos rotas à app (sobretudo em apps grandes), o mód q as contêm vai ficando + cheio e confuso.
  P/ evitar isto, é padrão em apps NG criar um mód próprio p/ abrigar as configs de rotas. Este mód tem, p/ padrão,
  a nomenclatura <nome mód>-rounting.module.ts. Neste caso, como as configs de roteamento estavam no mód app.module.ts,
  vamos criar o mód app.module-rounting.ts e mover as configs p/ este mód. */
const routes: Routes = [
  { path: "", redirectTo: "lancamentos", pathMatch: "full" },
/* 18.14. Criando um Routing Module para o módulo de funcionalidade:
    Retiraremos deste mód tds configs de rotas associadas aos móds de funcionalidades (pessoas, lançs, etc...) e movê-las
    p/ os respectivos móds de rotas associados aos móds das funcionalidades (lancamentos-routing.module.ts, etc...). */
  // { path: "lancamentos", component: LancamentosPesquisaComponent },
  // { path: "lancamentos/novo", component: LancamentosCadastroComponent },
  // { path: "lancamentos/:codigo", component: LancamentosCadastroComponent },
  // { path: "pessoas", component: PessoasPesquisaComponent },
  // { path: "pessoas/nova", component: PessoasCadastroComponent },
  { path: "pagina-nao-encontrada", component: PaginaNaoEncontradaComponent },
  { path: "**", redirectTo: "pagina-nao-encontrada" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
/* 18.13. Refatorando as rotas para usar Routing Module:
    É boa prática exportar o RouterModule, a partir do mód de roteamento, p/ q funcionalidades providas
    p/ ele (como p/ ex a dir RouterLink) possam ser usadas em outras partes da app q referenciem o mod de
    roteamento. */
  exports: [RouterModule]
})
export class AppRoutingModule { }
