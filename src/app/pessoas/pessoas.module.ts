import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';

import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';


/* 14.7. Desafio: criando o feature module de pessoas:
  Cria o mód de pessoas e repete c/ ele exatamente o que foi feito c/ o mód de lançamentos, na aula
  anterior.

14.9. Criando um Shared Module:
  Shared móds (móds compatilhados), diferentemente de feature móds (móds funcionais), ñ agrupam comps
  em torno de funcs em comum, mas em torno de funcs q são comuns e compartilhadas por d+ elems na app/proj.

  Nesta app, usaremos um mód compartilhado chamado SharedModule e o incluíremos neste mód, p/ usar o comp
  de msg de erro (MensagensErroComponent). */
@NgModule({
  declarations: [
    PessoasCadastroComponent,
    PessoasPesquisaComponent,
    PessoasGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputMaskModule,
    InputNumberModule,

    SharedModule,
    // 18.15. Desafio: roteamento e edição de pessoas:
    //   Repetindo c/ pessoas a criação dum routing module, como feito p/ lançs na aula 18.14.
    PessoasRoutingModule
  ],
  exports: [
/*  18.11. Tratando rota não encontrada:
      Qdo estávamos usando os seletores de comps diretamente no comp raiz (app-root), era necessário q os
      móds de pessoas e lançs exportassem os respectivos comps de pequisa e cadastro. A partir de agora, q
      td o acesso a estes será feito através do serviço de roteamento do NG (Router), isso não é mais necessário.
      Estes comps ainda precisam ser declarados pelos móds, mas n + exportados. Logo, comentaremos as exportações
      abaixo. */
    // PessoasCadastroComponent,
    // PessoasPesquisaComponent
  ]
})
export class PessoasModule { }
