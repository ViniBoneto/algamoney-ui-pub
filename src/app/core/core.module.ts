import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';


/* 14.11. Desafio: criando o Core Module:
  Um mód core (core module) duma app NG é um mód q ñ é criado nem p/ agrupar comps por funcionalidades
  (feature modules) e nem p/ ser um mód compartilhado p/ outros móds (shared modules). Ele é basicamente
  um mód p/ agrupar funcs centrais da app NG, usadas pelo comp raiz desta (AppModule). C/ isto, limpa-se
  o mód raiz, p/ ficar apenas c/ o comp incial (AppComponent), deixando a app melhor organizada.

  Nesta app criaremos um core module chamado CoreModule, q conterá o comp de barra de menu (NavbarComponent),
  q será retirado do mód raiz. */
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }
