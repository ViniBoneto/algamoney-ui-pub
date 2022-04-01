import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';

import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

import { SharedModule } from '../shared/shared.module';
import { LancamentoService } from './lancamento.service';
import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';

/* 13.5. Adicionando máscara de dinheiro com ng2-mask-money:
  P/ alterar o tipo de input do ngx-currency de FINANCIAL (padrão) p/ NATURAL, é preciso fazer uso do
  enum CurrencyMaskInputMode e criar um obj de config customizável p/ ser atribuído ao mód NgxCurrencyModule,
  em sua importação pelo mód da app, conforme indicado na pág do ngx-currency. */
export const customCurrencyMaskConfig = {
  prefix: '',
  thousands: '.',
  decimal: ',',
  allowNegative: false,
  inputMode: CurrencyMaskInputMode.NATURAL,
  //É preciso colocar tds as props obrigatórias do tipo CurrencyMaskConfig
  align: "right",
  allowZero: true,
  nullable: false,
  precision: 2,
  suffix: ""
}

/* 14.6. Criando um Feature Module:
  Criando mód de lançamentos (LancamentosModule) p/ incluir os comps específicos de lançamentos
  (lancamentos-cadastro, lancamentos-pesquisa, lancamentos-grid), movendo-os do mód raiz (AppModule)
  p/ cá. C/ isso, a app ficará melhor organizada.

  Há tb necessidade de se trazer p/ cá, movendo-se do mód raiz, os móds auxiliares usados pelos comps de
  lançamento, como FormsModule, NgxCurrencyModule e móds do PNG (InputTextModule, ButtonModule, TableModule
  e etc).

  O mód de lançamento deverá declarar lancamentos-cadastro, lancamentos-pesquisa e lancamentos-grid e exportar
  lancamentos-cadastro, lancamentos-pesquisa. Ñ há necessidade de se exportar lancamentos-grid, pois ele é usado
  apenas p/ lancamentos-pesquisa.

  14.9. Criando um Shared Module:
    Shared móds (móds compatilhados), diferentemente de feature móds (móds funcionais), ñ agrupam comps
    em torno de funcs em comum, mas em torno de funcs q são comuns e compartilhadas por d+ elems na app/proj.

    Nesta app, usaremos um mód compartilhado chamado SharedModule e o incluíremos neste mód, p/ usar o comp
    de msg de erro (MensagensErroComponent). */
@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentosCadastroComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // 17.2. Criando o serviço de consulta de lançamentos:
    //   Importando o mód http p/ poder se usar os comps HttpClient e HttpHeaders.
    HttpClientModule,
    // 18.3. Navegando com Router Link:
    //   É preciso importar o mód de roteamento p/ a dir routerLink funcionar.
    RouterModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    /*  13.5. Adicionando máscara de dinheiro com ng2-mask-money:
      Agora já há o comp InputNumber do PNG, que não havia ainda quando o vídeo da aula foi gravado, p/ isso
      o uso da dir currencyMask. Após o uso desta, apenas para efeito de demonstração, subistitui-se pelo comp
      de input numérico InputNumber. */
    InputNumberModule,
    MessageModule,

    // NgxCurrencyModule
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),

    SharedModule
  ],
  exports: [
/*  18.11. Tratando rota não encontrada:
      Qdo estávamos usando os seletores de comps diretamente no comp raiz (app-root), era necessário q os
      móds de pessoas e lançs exportassem os respectivos comps de pequisa e cadastro. A partir de agora, q
      td o acesso a estes será feito através do serviço de roteamento do NG (Router), isso não é mais necessário.
      Estes comps ainda precisam ser declarados pelos móds, mas n + exportados. Logo, comentaremos as exportações
      abaixo. */
    // LancamentosPesquisaComponent,
    // LancamentosCadastroComponent
  ],
  providers:[
/* 17.2. Criando o serviço de consulta de lançamentos:
      Lista o serv criado p/ acesso e gerência de lançamentos entre os injetáveis providos pelo mód de
      lançamentos.

    Obs: Na aula, este serv foi provido pelo próprio mód raiz da app (AppModule), mas achei melhor colocá-lo
      aqui. */
    LancamentoService
  ]
})
export class LancamentosModule { }
