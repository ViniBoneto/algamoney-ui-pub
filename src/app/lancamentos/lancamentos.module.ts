import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  apenas p/ lancamentos-pesquisa. */
@NgModule({
  declarations: [
    LancamentosPesquisaComponent,
    LancamentosCadastroComponent,
    LancamentosGridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

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
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [
    LancamentosPesquisaComponent,
    LancamentosCadastroComponent
  ]
})
export class LancamentosModule { }
