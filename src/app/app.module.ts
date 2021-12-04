import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';

// import { TabViewModule } from 'primeng/tabview';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
// import { TableModule } from 'primeng/table';
// import { TooltipModule } from 'primeng/tooltip';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { CalendarModule } from 'primeng/calendar';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { DropdownModule } from 'primeng/dropdown';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { InputMaskModule } from 'primeng/inputmask';
// import { MessageModule } from 'primeng/message';

// import { NgxCurrencyModule, CurrencyMaskInputMode } from 'ngx-currency';

import { AppRoutingModule } from './app-routing.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
// import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
// import { LancamentosCadastroComponent } from './lancamentos-cadastro/lancamentos-cadastro.component';
// import { PessoasCadastroComponent } from './pessoas-cadastro/pessoas-cadastro.component';
// import { MensagensErroComponent } from './mensagens-erro/mensagens-erro.component';
// import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
// import { LancamentosGridComponent } from './lancamentos-grid/lancamentos-grid.component';

/* 13.5. Adicionando máscara de dinheiro com ng2-mask-money:
  P/ alterar o tipo de input do ngx-currency de FINANCIAL (padrão) p/ NATURAL, é preciso fazer uso do
  enum CurrencyMaskInputMode e criar um obj de config customizável p/ ser atribuído ao mód NgxCurrencyModule,
  em sua importação pelo mód da app, conforme indicado na pág do ngx-currency. */
/* export const customCurrencyMaskConfig = {
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
} */

/* 14.6. Criando um Feature Module:
  P/ melhor se organizar a app, cria-se mód de lançamentos, move-se os comps de lançamentos daqui p/ lá
  e se importa o mód de lançamento p/ cá, em vez importar diretamente os comps. Tb se move daqui p/ lá
  os d+ móds usados apenas pelos comps de lançamento.

  14.7. Desafio: criando o feature module de pessoas:
    Repete o que foi feito c/ lançamentos, na aula anteior, c/ pessoas.

  14.9. Criando um Shared Module:
    Shared móds (móds compatilhados), diferentemente de feature móds (móds funcionais), ñ agrupam comps
    em torno de funcs em comum, mas em torno de funcs q são comuns e compartilhadas por d+ elems na app/proj.

    Nesta app, usaremos um mód compartilhado chamado SharedModule.

    O comp de msg de erro (MensagensErroComponent) será transporado do mód raiz (AppModule) p/ o SharedModule
    e exportado por ele.

  14.11. Desafio: criando o Core Module:
    Um mód core (core module) duma app NG é um mód q ñ é criado nem p/ agrupar comps por funcionalidades
    (feature modules) e nem p/ ser um mód compartilhado p/ outros móds (shared modules). Ele é basicamente
    um mód p/ agrupar funcs centrais da app NG, usadas pelo comp raiz desta (AppModule). C/ isto, limpa-se
    o mód raiz, p/ ficar apenas c/ o comp incial (AppComponent), deixando a app melhor organizada.

    Nesta app criaremos um core module chamado CoreModule, q conterá o comp de barra de menu (NavbarComponent),
    q será retirado do mód raiz. */
@NgModule({
  declarations: [
    AppComponent,
    // LancamentosPesquisaComponent,
    // NavbarComponent,
    // PessoasPesquisaComponent,
    // LancamentosCadastroComponent,
    // PessoasCadastroComponent,
    // MensagensErroComponent,
    // PessoasGridComponent,
    // LancamentosGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // FormsModule,

    // TabViewModule
    // InputTextModule,
    // ButtonModule,
    // TableModule,
    // TooltipModule,
    // InputTextareaModule,
    // CalendarModule,
    // SelectButtonModule,
    // DropdownModule,
    /*  13.5. Adicionando máscara de dinheiro com ng2-mask-money:
      Agora já há o comp InputNumber do PNG, que não havia ainda quando o vídeo da aula foi gravado, p/ isso
      o uso da dir currencyMask. Após o uso desta, apenas para efeito de demonstração, subistitui-se pelo comp
      de input numérico InputNumber. */
    // InputNumberModule,
    // InputMaskModule,
    // MessageModule,
    // NgxCurrencyModule
    // NgxCurrencyModule.forRoot(customCurrencyMaskConfig)

    AppRoutingModule,
    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
