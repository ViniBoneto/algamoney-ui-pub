import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageModule } from 'primeng/message';

import { MensagensErroComponent } from './mensagens-erro/mensagens-erro.component';


/* 14.9. Criando um Shared Module:
  Shared móds (móds compatilhados), diferentemente de feature móds (móds funcionais), ñ agrupam comps
  em torno de funcs em comum, mas em torno de funcs q são comuns e compartilhadas por d+ elems na app/proj.

  Nesta app, usaremos um mód compartilhado chamado SharedModule.

  O comp de msg de erro (MensagensErroComponent) será transporado do mód raiz (AppModule) p/ o SharedModule
  e exportado por ele. */
@NgModule({
  declarations: [MensagensErroComponent],
  imports: [
    CommonModule,

    MessageModule
  ],
  exports: [MensagensErroComponent]
})
export class SharedModule { }
