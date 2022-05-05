// import { HttpClient } from '@angular/common/http';
import { NgModule /* , LOCALE_ID */ } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule } from '@angular/forms';
// import { Routes, RouterModule } from '@angular/router';

/* 17.11. Alterando o locale da aplicação para pt-BR:
Configurando locale: Para configurarmos o Locale de nossa aplicação Angular, ficou um pouco diferente,
precisando de algumas configurações extras.

O pacote de locale que é carregado por padrão é apenas o americano (en-US), e para usarmos um locale diferente
desse, precisamos carregá-lo em nossa aplicação. Para isso, precisaremos registrar o locale desejado.

Primeiro, precisamos importar este pacote e também a função que realizará o registro: */
// import { registerLocaleData } from '@angular/common';
// import localePt from '@angular/common/locales/pt';

// Depois de importados, basta registrar este pacote no início da nossa classe:
// 17.12. Criando um serviço de tratamento de erros:
  //   Pode-se comentar a func registerLocaleData() aqui, pois ela tb existe no mód core e ficará só lá.
  // registerLocaleData(localePt);

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

  // import { ToastModule } from 'primeng/toast';
  // import { ConfirmDialogModule } from 'primeng/confirmdialog';
  // import { ConfirmationService, MessageService } from 'primeng/api';
  // import { TranslateHttpLoader } from '@ngx-translate/http-loader';
  // import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
// import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
// import { LancamentosCadastroComponent } from './lancamentos/lancamentos-cadastro/lancamentos-cadastro.component';
import { PessoasModule } from './pessoas/pessoas.module';
// import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
// import { PessoasCadastroComponent } from './pessoas/pessoas-cadastro/pessoas-cadastro.component';
import { CoreModule } from './core/core.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppComponent } from './app.component';
// import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
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

/* 17.11. Alterando o locale da aplicação para pt-BR:
  Traduzindo o calendário do PrimeNG:
    O calendário do PrimeNG é apresentado, por padrão, em inglês. Para alterar esta configuração, na versão 12
    da biblioteca, é necessário trabalhar com o sistema de internacionalização i18n. Para isso é necessário adicionar
    algumas novas dependências, com os comandos:
      npm install @ngx-translate/core --save
      npm install @ngx-translate/http-loader --save

  Criação do arquivo de tradução:
    Deve ser criado um arquivo JSON que conterá as traduções desejadas. O nome dele é livre para escolha, mas é indicado
    utilizar o prefixo do idioma para o qual será realizada a tradução. Como será realizada a tradução para o português
    o arquivo terá o nome pt.json. Este arquivo deve ser colocado na pasta src/assets/i18n.

  Importação do módulo e serviço de tradução:
    É necessário realizar a importação do módulo de tradução (TranslateModule) e a definição do provedor de tradução
    (TranslateService) no AppModule, assim como a definição do HttpLoaderFactory.

  17.12. Criando um serviço de tratamento de erros:
    P/ melhor organizarmos a app, moveremos do AppModule p/ o CoreModule a func fábrica HttpLoaderFactory(). */
// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http);
// }

/* 18.2. Configurando rotas na aplicação:
  Criando um obj Routes, q é um array de rotas da app. Routes contém vários objs Route, sendo cada um uma
  config duma rota usada pelo roteador (Router) da app.

  18.13. Refatorando as rotas para usar Routing Module:
    Conforme adicionamos rotas à app (sobretudo em apps grandes), o mód q as contêm vai ficando + cheio e confuso.
    P/ evitar isto, é padrão em apps NG criar um mód próprio p/ abrigar as configs de rotas. Este mód tem, p/ padrão,
    a nomenclatura <nome mód>-rounting.module.ts. Neste caso, como as configs de roteamento estavam no mód app.module.ts,
    vamos criar o mód app.module-rounting.ts e mover as configs p/ este mód. Dito isto, vamos deixar as rotas origs aqui
    comentadas. */
// const routes: Routes = [
/* 18.10. Fazendo redirecionamento:
    Qdo acessamos o path raiz (s/ nada ou apenas c/ uma "/" após o host. Em ambiente dev é "http://localhost:4200"
    ou "http://localhost:4200/") vamos p/ uma pág em branco, pois ñ é associado a qq comp. Vamos mudar isso criando
    uma rota associada ao path raiz. Esta rota porém ñ irá associá-lo a um comp, mas sim fazer um redirect p/ a view
    de pesquisa de lançs. P/ padrão o pathMatch, q determina o tp de comparação de URLS, é "prefix", q significa q o
    prefixo da URL será comparado à prop path. Aqui vamos mudar p/ "full", q significar q a rota será acionada apenas
    se a URL inteira bater c/ o path. */
  // { path: "", redirectTo: "lancamentos", pathMatch: "full" },

  // {
  //   path: "lancamentos", // Route.path: URL do comp, relativa ao caminho raiz da app
  //   component: LancamentosPesquisaComponent // Route.component: O comp a ser instanciado qdo a URL bater
  // },
  // { path: "lancamentos/novo", component: LancamentosCadastroComponent },

/* 18.5. Recebendo parâmetros da rota:
    P/ edição de lançs existentes, vamos adiconar uma rota c/ um placeholder a ser substituído por um param q
    corresponderá ao cód do lanç a ser alterado. Tudo q vier após os : será interpretado como um token a ser
    substituído por um param. A url "/lancamentos/" seguida de qq outra coisa cairá nesta rota, a exceção de
    "/lancamentos/novo", q cairá na rota de cima.

    Obs: "/lancamentos/novo" e  "lancamentos/:codigo" (:codigo sendo placeholder) caem na msma view (msm comp),
      porém as rotas ativadas são diferentes. */
  // { path: "lancamentos/:codigo", component: LancamentosCadastroComponent },

  // { path: "pessoas", component: PessoasPesquisaComponent },
  // { path: "pessoas/nova", component: PessoasCadastroComponent },

/* 18.11. Tratando rota não encontrada:
    Vamos adicionar uma rota p/ o comp de pág ñ encontrada. */
  // { path: "pagina-nao-encontrada", component: PaginaNaoEncontradaComponent },
/* Além duma rota p/ o comp de pág ñ encontrada, precisamos tb adicionar uma rota em q qq URL q seja inválida (q ñ
    bata c/ alguma das rotas pré-config) seja redirecionada p/ este comp. P/ isto, vamos usar os wildcards "**", q
    significam qq URL q não foi validada p/ uma das outras rotas. É importante que esta rota "coringa" esteja p/ último,
    dps das d+. */
//   { path: "**", redirectTo: "pagina-nao-encontrada" }
// ];

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
/*  18.2. Configurando rotas na aplicação:
      Importa o mod de roteamento e o configura no mod raiz, p/ instanciar o serv de roteamento (Router) e
      cadastrar as rotas (ends urls / comps) a serem mapeadas pela app.

    18.13. Refatorando as rotas para usar Routing Module:
      Conforme adicionamos rotas à app (sobretudo em apps grandes), o mód q as contêm vai ficando + cheio e confuso.
      P/ evitar isto, é padrão em apps NG criar um mód próprio p/ abrigar as configs de rotas. Este mód tem, p/ padrão,
      a nomenclatura <nome mód>-rounting.module.ts. Neste caso, como as configs de roteamento estavam no mód app.module.ts,
      vamos criar o mód app.module-rounting.ts e mover as configs p/ este mód. Dito isto, vamos deixar as rotas origs aqui
      comentadas. */
    // RouterModule.forRoot(routes),

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

/*  17.9. Adicionando mensagem de sucesso com Angular Toasty:
      Incompatibilidade com ng2-toasty: A biblioteca ng2-toasty não é compatível com a versão 12 do Angular.
      Por esta razão, utilizaremos o componente Toast do PrimeNG.

    Para usar o componente Toast devemos importar o ToastModule e prover o MessageService do PrimeNG no nosso AppModule.

    17.12. Criando um serviço de tratamento de erros:
      P/ melhor organizarmos a app, tb moveremos do AppModule p/ o CoreModule os seguintes móds: ToastModule,
        ConfirmDialogModule, TranslateModule. Tb os provedores de serv: MessageService, ConfirmationService, LOCALE_ID
        (na vdd, este já tinha uma cópia no CoreModule, apenas removi do mód raiz) e TranslateService. */
    // ToastModule,

/*  17.10. Adicionando diálogo de confirmação antes da exclusão:
      P/ usar o comp de caixa de confirm do PNG (ConfirmDialog) devemos importar o mód abaixo (o passo a passo é muito
      semelhante ao da inclusão do comp de msg Toast, na aula anterior). */
    // ConfirmDialogModule,

/*  17.11. Alterando o locale da aplicação para pt-BR:
      Importação do módulo e serviço de tradução:
      É necessário realizar a importação do módulo de tradução (TranslateModule) e a definição do provedor de tradução
      (TranslateService) no AppModule, assim como a definição do HttpLoaderFactory. */
/*     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }), */

    LancamentosModule,
    PessoasModule,
    CoreModule,
    // 19.3. Desafio: módulo de segurança e protótipo da tela de login:
    //   Add mód de seg ao mód raiz.
    SegurancaModule,
/*  18.13. Refatorando as rotas para usar Routing Module:
      Como já explicado, cria um mód próprio p/ configs de rotas e move as configs p/ lá. Devemos tb importar este
      mód aqui no mód raiz. */
    AppRoutingModule
  ],
  providers: [
/*  17.9. Adicionando mensagem de sucesso com Angular Toasty:
      Incompatibilidade com ng2-toasty: A biblioteca ng2-toasty não é compatível com a versão 12 do Angular.
      Por esta razão, utilizaremos o componente Toast do PrimeNG.

    Para usar o componente Toast devemos importar o ToastModule e prover o MessageService do PrimeNG no nosso AppModule. */
    // MessageService,

/*  17.10. Adicionando diálogo de confirmação antes da exclusão:
      Para usar o componente ConfirmDialog devemos prover o ConfirmationService do PrimeNG no nosso AppModule (o passo
      a passo é muito semelhante ao da inclusão do comp de msg Toast, na aula anterior). */
    // ConfirmationService,

/*  17.11. Alterando o locale da aplicação para pt-BR:
      Configurando locale: P/ alterarmos o locale padrão na app p/ pt-BR, devemos declarar um provider p/ valor no mód
      raiz (AppModule), cujo token é o ID pré-def LOCALE_ID, q identifica o provedor do locale padrão duma app NG. Já
      o valor do provedor deve ser "pt-BR". */
    // { provide: LOCALE_ID, useValue: "pt-BR" },

/*  17.11. Alterando o locale da aplicação para pt-BR:
      Importação do módulo e serviço de tradução:
      É necessário realizar a importação do módulo de tradução (TranslateModule) e a definição do provedor de tradução
      (TranslateService) no AppModule, assim como a definição do HttpLoaderFactory. */
    // TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
